import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

// A caller-supplied id ends up in our logs, so it must be short and boring
// (no spaces, no newlines: a newline would let a caller forge log lines).
export const SAFE_REQUEST_ID = /^[A-Za-z0-9._:-]{1,64}$/;

// Honour a safe id the caller sent, otherwise make one, and put it on the request and the
// response. IDEMPOTENT: calling it twice on one request returns the same id. That matters now
// because BOTH the pino-http middleware and our RequestIdMiddleware call it, in either order.
export function assignRequestId(req: IncomingMessage, res: ServerResponse): string {
  const raw = req.headers['x-request-id'];
  const incoming = Array.isArray(raw) ? raw[0] : raw;
  const id = incoming && SAFE_REQUEST_ID.test(incoming) ? incoming : randomUUID();

  req.headers['x-request-id'] = id; // for the filter and the body of an error
  if (!res.headersSent) res.setHeader('x-request-id', id); // so the client can quote it
  return id;
}

export function getRequestId(req: Pick<IncomingMessage, 'headers'>): string | null {
  const raw = req.headers['x-request-id'];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value ?? null;
}
