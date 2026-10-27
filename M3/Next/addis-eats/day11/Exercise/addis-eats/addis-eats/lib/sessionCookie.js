// Plain constants so middleware can import them without pulling in next/headers or jose.
export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours: short, because a signed token cannot be revoked early
