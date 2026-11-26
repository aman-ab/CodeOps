import {
  CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export const TIMEOUT_MS = 5000;

// 408 is an honest answer: better than a client waiting ninety seconds for ITS timeout.
// A timeout stops the WAITING, not the WORK: the handler keeps running after we give up.
// Safe on reads; think hard about it on writes (that is one reason idempotency keys exist).
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(TIMEOUT_MS),
      catchError((err: unknown) =>
        err instanceof TimeoutError
          ? throwError(() => new RequestTimeoutException())
          : throwError(() => err),
      ),
    );
  }
}
