import { ConfigService } from '@nestjs/config';
import type { Params } from 'nestjs-pino';
import { assignRequestId } from '../request-id';
import { requestContext } from '../request-context';

// ONE list, applied to every line from every file. Forty call sites cannot be trusted
// to remember; the one written in a hurry is always the one that forgets.
export const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers["x-api-key"]',
  '*.headers.authorization',
  '*.headers["x-api-key"]',
  'req.body.password',
  '*.body.password',
  'phone',
  '*.phone',
  '*.*.phone',
];

export function buildLoggerParams(config: ConfigService): Params {
  return {
    pinoHttp: {
      // The level is a runtime setting, not a code change: production info, staging debug.
      level: config.get<string>('LOG_LEVEL') ?? 'info',

      // The same id as yesterday's header, whichever middleware runs first.
      genReqId: (req, res) => assignRequestId(req, res),

      // Stamp EVERY line (service, interceptor, filter) with a top-level requestId.
      mixin: () => {
        const requestId = requestContext.requestId();
        return requestId ? { requestId } : {};
      },

      // Our LoggingInterceptor writes the one structured line per request, with the handler name.
      // pino-http's own "request completed" line would be a second, unstructured-by-us duplicate.
      autoLogging: false,
      // The per-request child logger carries only the id, never the whole request (headers!).
      quietReqLogger: true,

      redact: { paths: REDACT_PATHS, censor: '[redacted]' },

      // Pretty on a laptop, JSON everywhere else. The JSON path is the DEFAULT.
      transport:
        config.get<string>('NODE_ENV') === 'development'
          ? { target: 'pino-pretty', options: { singleLine: true } }
          : undefined,
    },
  };
}
