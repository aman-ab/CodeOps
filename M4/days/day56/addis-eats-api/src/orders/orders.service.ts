import { Inject, Injectable } from '@nestjs/common';
import { OrderNotFoundError } from '../common/domain-errors';
import { Page, paginate } from '../common/page';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders.query';
import { Order, OrderStatus } from './order.types';
import { ORDER_REPOSITORY, type OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository) {}

  // restaurantId is optional: used by GET /restaurants/:id/orders
  findAll(q: FindOrdersQuery, restaurantId?: number): Page<Order> {
    let rows = this.repo.all();

    // 1 - filter
    if (restaurantId !== undefined) rows = rows.filter((o) => o.restaurantId === restaurantId);
    if (q.status) rows = rows.filter((o) => o.status === q.status);
    if (q.area) rows = rows.filter((o) => o.area === q.area);

    // 2 - sort (on a copy)
    rows = [...rows].sort((a, b) => {
      const x = a[q.sort];
      const y = b[q.sort];
      return typeof x === 'number' && typeof y === 'number'
        ? x - y
        : String(x).localeCompare(String(y));
    });

    // 3 - page, last
    return paginate(rows, q.limit, q.offset);
  }

  // GET /orders/pending: same engine, status forced to PENDING
  findPending(q: FindOrdersQuery): Page<Order> {
    return this.findAll({ ...q, status: 'PENDING' });
  }

  findOne(id: number): Order {
    const hit = this.repo.byId(id);
    if (!hit) throw new OrderNotFoundError(id);
    return hit;
  }

  create(dto: CreateOrderDto): Order {
    const id = Math.max(0, ...this.repo.all().map((o) => o.id)) + 1; // naive, Module 5 fixes
    return this.repo.save({ ...dto, id, status: 'PENDING' });
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.findOne(id); // 404 if absent
    return this.repo.save({ ...order, status });
  }

  cancel(id: number): void {
    if (!this.repo.remove(id)) throw new OrderNotFoundError(id);
  }
}
