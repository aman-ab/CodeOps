import { Injectable } from '@nestjs/common';
import type { Order } from './order.types';
import { SEED_ORDERS } from './order.seed';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepository {
  save(order: Order): Order;
  byId(id: number): Order | undefined;
  all(): Order[];
  delete(id: number): void; 
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>(
    SEED_ORDERS.map((o) => [o.id, o]),
  );

  save(order: Order): Order {
    this.orders.set(order.id, order);
    return order;
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return Array.from(this.orders.values());
  }

  delete(id: number): void {
    this.orders.delete(id);
  }
}
