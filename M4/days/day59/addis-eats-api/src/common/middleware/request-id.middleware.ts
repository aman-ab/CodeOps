import { randomUUID } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

// A caller-supplied id ends up in our logs, so it must be short and boring
// (no spaces, no newlines: a newline would let a caller forge log lines).
const SAFE_ID = /^[A-Za-z0-9._:-]{1,64}$/;

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const raw = req.headers['x-request-id'];
    const incoming = Array.isArray(raw) ? raw[0] : raw;

    // honour an id the caller already sent, otherwise make one
    const id = incoming && SAFE_ID.test(incoming) ? incoming : randomUUID();

    req.headers['x-request-id'] = id;  // for the filter and the logger
    res.setHeader('x-request-id', id); // so the client can quote it

    next(); // ALWAYS: forget this and the request hangs with no error and no log line
  }
}
