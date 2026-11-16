export interface RestaurantRepository {
  all(): Restaurant[];
  byId(id: number): Restaurant | undefined;
  save(r: Restaurant): Restaurant;
}
 
@Injectable()
export class InMemoryRestaurantRepository
  implements RestaurantRepository {
 
  private readonly rows = new Map<number, Restaurant>(
    SEED.map((r) => [r.id, r]),
  );
 
  all() { return [...this.rows.values()]; }
  byId(id: number) { return this.rows.get(id); }
  save(r: Restaurant) { this.rows.set(r.id, r); return r; }
}
