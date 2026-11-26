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

export class InvalidTransitionError extends Error {
  constructor(public readonly from: string, public readonly to: string) {
    super(`An order cannot move from ${from} to ${to}`);
    this.name = 'InvalidTransitionError';
  }
}

export class RestaurantClosedError extends Error {
  constructor(public readonly restaurantId: number) {
    super(`Restaurant ${restaurantId} is closed and is not taking orders`);
    this.name = 'RestaurantClosedError';
  }
}

export class DishNotOnMenuError extends Error {
  constructor(public readonly restaurantId: number) {
    super(`Every dish must be on the menu of restaurant ${restaurantId}`);
    this.name = 'DishNotOnMenuError';
  }
}

export class DuplicateNameError extends Error {
  constructor(public readonly name: string) {
    super(`A restaurant named "${name}" already exists`);
    this.name = 'DuplicateNameError';
  }
}

// Defined now so the mapping table is complete; first thrown on Day 61 (TeleBirr).
export class PaymentDeclinedError extends Error {
  constructor(public readonly reason: string) {
    super(`Payment declined: ${reason}`);
    this.name = 'PaymentDeclinedError';
  }
}
