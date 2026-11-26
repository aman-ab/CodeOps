import type { Request } from 'express';

// The header can arrive as string, string[] or be absent. One place decides.
export function getRequestId(req: Request): string | null {
  const raw = req.headers['x-request-id'];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value ?? null;
}
