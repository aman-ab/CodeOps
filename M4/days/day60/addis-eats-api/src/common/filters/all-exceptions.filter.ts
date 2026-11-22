import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  DishNotFoundError, DishNotOnMenuError, DuplicateNameError, InvalidTransitionError,
  OrderNotFoundError, PaymentDeclinedError, RestaurantClosedError, RestaurantNotFoundError,
} from '../domain-errors';
import { getRequestId } from '../request-id';

interface Translated {
  status: number;
  message: unknown;
}

@Catch() // no argument = everything, including errors you never wrote a class for
export class AllExceptionsFilter implements ExceptionFilter {
  // Registered with APP_FILTER (not useGlobalFilters(new ...)) so the container can inject this.
  constructor(
    @InjectPinoLogger(AllExceptionsFilter.name) private readonly logger: PinoLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const requestId = getRequestId(req);

    const { status, message } = this.translate(exception);

    // Level = who acts on it. Only 5xx is OURS: error, with the stack, in the log only.
    // 4xx is the caller's mistake: debug (it would drown the real errors at error level).
    if (status >= 500) {
      this.logger.error(
        { err: exception, statusCode: status, method: req.method, url: req.url },
        'request failed',
      );
    } else {
      this.logger.debug({ statusCode: status, method: req.method, url: req.url }, 'request rejected');
    }

    // One shape for every failure: five fields, never a stack trace.
    res.status(status).json({
      statusCode: status,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
      requestId,
    });
  }

  // The error contract, as code. docs/api-standard.md says the same in prose.
  private translate(e: unknown): Translated {
    // 1 - Nest's own exceptions already carry a status (ValidationPipe, ParseIntPipe, 404 route...)
    if (e instanceof HttpException) {
      const status = e.getStatus();
      if (status >= 500) return { status, message: 'Internal server error' };
      const body = e.getResponse();
      const message =
        typeof body === 'object' && body !== null && 'message' in body
          ? (body as { message: unknown }).message
          : e.message;
      return { status, message };
    }

    // 2 - our domain errors
    if (e instanceof OrderNotFoundError) return { status: 404, message: e.message };
    if (e instanceof RestaurantNotFoundError) return { status: 404, message: e.message };
    if (e instanceof DishNotFoundError) return { status: 404, message: e.message };
    if (e instanceof InvalidTransitionError) return { status: 409, message: e.message };
    if (e instanceof RestaurantClosedError) return { status: 409, message: e.message };
    if (e instanceof DuplicateNameError) return { status: 409, message: e.message };
    if (e instanceof DishNotOnMenuError) return { status: 422, message: e.message };
    if (e instanceof PaymentDeclinedError) return { status: 402, message: e.message };

    // 3 - anything else is OUR bug. The client learns nothing (a security control):
    //     an unknown error's message may hold a file path, a query or someone else's data.
    return { status: 500, message: 'Internal server error' };
  }
}
