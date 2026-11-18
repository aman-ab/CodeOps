import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { Order } from './order.types';
import type { OrderRepository } from './order.repository';
import { ORDER_REPOSITORY } from './order.repository';
import { FindOrdersQueryDto } from './dto/find-orders-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import type { Page } from '../shared/page.types';
import { InvalidTransitionError } from './errors/invalid-transition.error';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  findAll(query: FindOrdersQueryDto): Page<Order> {
    let rows = this.repo.all();

    if (query.status) rows = rows.filter((o) => o.status === query.status);
    if (query.area) rows = rows.filter((o) => o.area === query.area);

    rows = [...rows].sort((a, b) => {
      const valA = a[query.sort as keyof Order];
      const valB = b[query.sort as keyof Order];
      if (typeof valA === 'string' && typeof valB === 'string')
        return valA.localeCompare(valB);
      if (typeof valA === 'number' && typeof valB === 'number')
        return valA - valB;
      return 0;
    });

    const total = rows.length;
    const items = rows.slice(query.offset, query.offset + query.limit);

    return { items, total, limit: query.limit, offset: query.offset };
  }

  findOne(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  create(dto: CreateOrderDto): Order {
    const nextId = Math.max(0, ...this.repo.all().map((o) => o.id)) + 1;

   
    const newOrder: Order = {
      id: nextId,
      customer: dto.customer,
      area: dto.area,
      phone: dto.phone,
      totalSantim: dto.totalSantim,
      status: 'PENDING',
      dishes: dto.lines.map((l) => ({
        name: `Dish ${l.dishId}`,
        priceSantim: 0,
      })),
    };

    return this.repo.save(newOrder);
  }

  updateStatus(id: number, status: Order['status']): Order {
    const order = this.findOne(id);
    if (order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      throw new InvalidTransitionError(order.status, status);
    }

    order.status = status;
    return this.repo.save(order);
  }

  cancel(id: number): void {
    const order = this.repo.byId(id);
    if (!order) return; 
    this.repo.delete(id);
  }
}
