import { timingSafeEqual } from 'node:crypto';

// Compare secrets in constant time. Missing/empty configuration NEVER matches,
// otherwise an unset env var would turn "undefined === undefined" into a master key.
export function safeEqual(a: string, b: string | undefined): boolean {
  if (!b) return false;
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
