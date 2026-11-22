import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Day 59's sentence, now a record: one JSON object per request, with FIELDS you can filter on.
// requestId is added automatically by the logger's mixin.
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(LoggingInterceptor.name) private readonly logger: PinoLogger,
  ) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = ctx.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const started = Date.now();
    const handler = `${ctx.getClass().name}.${ctx.getHandler().name}`;

    const record = (outcome: string, statusCode?: number): void =>
      this.logger.info(
        { method: req.method, url: req.url, handler, outcome, statusCode, durationMs: Date.now() - started },
        'request handled',
      );

    return next.handle().pipe(
      tap({
        next: () => record('ok', res.statusCode),
        // A handler that throws still took time: that is usually the one you care about.
        // (4xx is the caller's business: info. The FILTER logs 5xx at error.)
        error: (e: unknown) => record(e instanceof Error ? e.name : 'Error'),
      }),
    );
  }
}
