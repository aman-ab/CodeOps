import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { assignRequestId } from '../request-id';
import { requestContext } from '../request-context';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const id = assignRequestId(req, res);

    // Everything downstream (guards, pipes, handler, service, filter) runs INSIDE this call,
    // so requestContext.requestId() works anywhere without being passed around.
    requestContext.run(id, () => next()); // ALWAYS call next()
  }
}
