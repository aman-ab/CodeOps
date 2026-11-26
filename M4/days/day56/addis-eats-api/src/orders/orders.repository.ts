import { Injectable } from '@nestjs/common';
import { Order } from './order.types';
import { ORDER_SEED } from './orders.seed';


export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepository {
  all(): Order[];
  byId(id: number): Order | undefined;
  save(o: Order): Order;
  remove(id: number): boolean; // true if something was deleted
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly rows = new Map<number, Order>(ORDER_SEED.map((o) => [o.id, o]));

  all(): Order[] { return [...this.rows.values()]; }
  byId(id: number): Order | undefined { return this.rows.get(id); }
  save(o: Order): Order { this.rows.set(o.id, o); return o; }
  remove(id: number): boolean { return this.rows.delete(id); }
}
