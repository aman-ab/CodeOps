import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  DishNotFoundError, DishNotOnMenuError, InvalidTransitionError,
  OrderNotFoundError, RestaurantClosedError,
} from '../common/domain-errors';
import { pickFields } from '../common/fields';
import { Page, paginate } from '../common/page';
import { parseSort, sortRows } from '../common/sort';
import { Dish } from '../dishes/dish.types';
import { DishesService } from '../dishes/dishes.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery, ORDER_SORT_FIELDS } from './dto/find-orders.query';
import { Area } from '../restaurants/restaurant.types';
import { Order, OrderLine, OrderStatus } from './order.types';
import { ORDER_REPOSITORY, type OrderRepository } from './orders.repository';

// The INVARIANT: which status may follow which. A Record keyed on OrderStatus means a
// sixth status will not compile until someone decides what it may become (Day 52 idea).
const ALLOWED: Record<OrderStatus, readonly OrderStatus[]> = {
  PENDING: ['PREPARING', 'CANCELLED'],
  PREPARING: ['ON_THE_WAY', 'CANCELLED'],
  ON_THE_WAY: ['DELIVERED'],
  DELIVERED: [],   // terminal
  CANCELLED: [],   // terminal
};

export interface OrderScope {
  restaurantId?: number;      // from the path: /restaurants/:id/orders
  areas?: readonly Area[];    // from ?area=, normalised by ParseAreaPipe
}

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository,
    private readonly restaurants: RestaurantsService,
    private readonly dishes: DishesService,
    // requestId appears on every line automatically: the service never sees the request.
    @InjectPinoLogger(OrdersService.name) private readonly logger: PinoLogger,
  ) {}

  findAll(q: FindOrdersQuery, scope: OrderScope = {}): Page<Partial<Order>> {
    let rows = this.repo.all();

    // 1 - filter
    const { restaurantId, areas } = scope;
    if (restaurantId !== undefined) rows = rows.filter((o) => o.restaurantId === restaurantId);
    const statuses = q.status;
    if (statuses?.length) rows = rows.filter((o) => statuses.includes(o.status));
    if (areas?.length) rows = rows.filter((o) => areas.includes(o.area));

    // 2 - sort
    rows = sortRows(rows, parseSort<(typeof ORDER_SORT_FIELDS)[number]>(q.sort));

    // 3 - page
    const page = paginate(rows, q.limit, q.offset);

    // 4 - shrink if ?fields= was given
    const fields = q.fields;
    if (!fields?.length) return page;
    return { ...page, items: page.items.map((o) => pickFields(o, fields)) };
  }

  findOne(id: number): Order {
    const hit = this.repo.byId(id);
    if (!hit) throw new OrderNotFoundError(id);
    return hit;
  }

  // GUARD CLAUSES, in a fixed order: existence, state, relationship, work.
  // Each throws and leaves, so the happy path reads in one flat column.
  create(dto: CreateOrderDto): Order {
    // 1 - existence first: cheapest, and a 404 outranks everything
    const restaurant = this.restaurants.findOne(dto.restaurantId);
    const dishes = this.dishes.findByIds(dto.lines.map((l) => l.dishId));

    // 2 - state of the things we found
    if (!restaurant.isOpen) throw new RestaurantClosedError(restaurant.id);       // 409

    // 3 - relationships between them
    if (dishes.some((d) => d.restaurantId !== restaurant.id)) {
      throw new DishNotOnMenuError(restaurant.id);                                 // 422
    }

    // 4 - only now compute and write. Priced on the server, from the dishes.
    const lines: OrderLine[] = dto.lines.map((l) => ({ dishId: l.dishId, quantity: l.quantity }));
    const totalSantim = this.priceOrder(dishes, lines) + (dto.tipSantim ?? 0);

    const id = Math.max(0, ...this.repo.all().map((o) => o.id)) + 1; // naive: Module 5 fixes
    const order = this.repo.save({
      id,
      customer: dto.customer,
      area: dto.area,
      restaurantId: restaurant.id,
      lines,
      tipSantim: dto.tipSantim,
      phone: dto.phone,
      totalSantim,
      status: 'PENDING',
    });

    // FIELDS you can filter on, not a sentence with values glued in. Ids and amounts only:
    // never the customer's name or phone (personal data), never the whole dto.
    this.logger.info(
      { orderId: order.id, restaurantId: order.restaurantId, area: order.area, totalSantim, lineCount: lines.length },
      'order created',
    );
    return order;
  }

  // Valid request, but the CURRENT STATE refuses it -> 409, not 400.
  updateStatus(id: number, next: OrderStatus): Order {
    const order = this.findOne(id); // 404 first
    if (!ALLOWED[order.status].includes(next)) {
      throw new InvalidTransitionError(order.status, next);
    }
    const saved = this.repo.save({ ...order, status: next });
    this.logger.info({ orderId: id, from: order.status, to: next }, 'order status changed');
    return saved;
  }

  // IDEMPOTENT (Day 57): deleting something already gone is a success.
  cancel(id: number): void {
    const removed = this.repo.remove(id);
    this.logger.info({ orderId: id, removed }, 'order cancelled');
  }

  private priceOrder(dishes: readonly Dish[], lines: readonly OrderLine[]): number {
    const byId = new Map(dishes.map((d) => [d.id, d]));
    let total = 0;
    for (const line of lines) {
      const dish = byId.get(line.dishId);
      if (!dish) throw new DishNotFoundError(line.dishId);
      total += dish.priceSantim * line.quantity;
    }
    return total;
  }
}
