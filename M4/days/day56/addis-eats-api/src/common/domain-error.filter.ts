import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import { DishNotFoundError, OrderNotFoundError, RestaurantNotFoundError } from './domain-errors';

// Translates "not found" domain errors into 404, in Nest's own error shape.
@Catch(RestaurantNotFoundError, DishNotFoundError, OrderNotFoundError)
export class DomainErrorFilter implements ExceptionFilter<Error> {
  catch(err: Error, host: ArgumentsHost): void {
    host
      .switchToHttp()
      .getResponse<Response>()
      .status(404)
      .json({ statusCode: 404, message: err.message, error: 'Not Found' });
  }
}
