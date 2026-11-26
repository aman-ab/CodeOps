export class RestaurantNotFoundError extends Error {
  constructor(public readonly restaurantId: number) {
    super(`Restaurant ${restaurantId} not found`);
    this.name = 'RestaurantNotFoundError';
  }
}

export class DishNotFoundError extends Error {
  constructor(public readonly dishId: number, public readonly restaurantId?: number) {
    super(
      restaurantId === undefined
        ? `Dish ${dishId} not found`
        : `Dish ${dishId} not found for restaurant ${restaurantId}`,
    );
    this.name = 'DishNotFoundError';
  }
}

export class OrderNotFoundError extends Error {
  constructor(public readonly orderId: number) {
    super(`Order ${orderId} not found`);
    this.name = 'OrderNotFoundError';
  }
}
