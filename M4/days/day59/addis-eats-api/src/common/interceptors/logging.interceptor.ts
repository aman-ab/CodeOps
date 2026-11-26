import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getRequestId } from '../request-id';

// Sees BOTH sides of the handler, so it can say which controller method answered
// and how long it took. A middleware (morgan) cannot.
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = ctx.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const started = Date.now();                                    // ---- BEFORE the handler
    const handler = `${ctx.getClass().name}.${ctx.getHandler().name}`;

    return next.handle().pipe(
      tap({
        // ---- AFTER it returns, with the value in hand
        next: () => this.log(req, handler, `ok ${res.statusCode}`, started),
        // A handler that throws still took time: that is usually the one you care about.
        error: (e: unknown) => this.log(req, handler, e instanceof Error ? e.name : 'Error', started),
      }),
    );
  }

  private log(req: Request, handler: string, outcome: string, started: number): void {
    const ms = Date.now() - started;
    this.logger.log(`${req.method} ${req.url} -> ${handler} ${outcome} ${ms}ms [${getRequestId(req)}]`);
  }
}
