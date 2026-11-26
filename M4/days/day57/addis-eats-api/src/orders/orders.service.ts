import { Inject, Injectable } from '@nestjs/common';
import { OrderNotFoundError } from '../common/domain-errors';
import { pickFields } from '../common/fields';
import { Page, paginate } from '../common/page';
import { parseSort, sortRows } from '../common/sort';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery, ORDER_SORT_FIELDS } from './dto/find-orders.query';
import { Order, OrderStatus } from './order.types';
import { ORDER_REPOSITORY, type OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository) {}

  // restaurantId is optional: used by GET /restaurants/:id/orders
  findAll(q: FindOrdersQuery, restaurantId?: number): Page<Partial<Order>> {
    let rows = this.repo.all();

    // 1 - filter
    if (restaurantId !== undefined) rows = rows.filter((o) => o.restaurantId === restaurantId);
    const statuses = q.status;
    if (statuses?.length) rows = rows.filter((o) => statuses.includes(o.status));
    const areas = q.area;
    if (areas?.length) rows = rows.filter((o) => areas.includes(o.area));

    // 2 - sort (leading minus = descending, several keys allowed)
    rows = sortRows(rows, parseSort<(typeof ORDER_SORT_FIELDS)[number]>(q.sort));

    // 3 - page
    const page = paginate(rows, q.limit, q.offset);

    // 4 - shrink each item if ?fields= was given (after paging: only 20 items to trim)
    const fields = q.fields;
    if (!fields?.length) return page;
    return { ...page, items: page.items.map((o) => pickFields(o, fields)) };
  }

  findOne(id: number): Order {
    const hit = this.repo.byId(id);
    if (!hit) throw new OrderNotFoundError(id);
    return hit;
  }

  create(dto: CreateOrderDto): Order {
    const id = Math.max(0, ...this.repo.all().map((o) => o.id)) + 1;
    return this.repo.save({ ...dto, id, status: 'PENDING' });
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.findOne(id);
    return this.repo.save({ ...order, status });
  }

  // Day 57: IDEMPOTENT. Deleting something already gone is a success, because
  // the caller's intent ("this order must not exist") is satisfied.
  cancel(id: number): void {
    this.repo.remove(id);
  }
}
