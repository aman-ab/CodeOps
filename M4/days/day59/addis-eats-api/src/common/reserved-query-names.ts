// Structural query keys. NO resource may have a field with one of these names,
// or a filter and a control would collide. Listed in docs/api-standard.md.
export const RESERVED_QUERY_NAMES = ['limit', 'offset', 'after', 'sort', 'fields', 'q'] as const;
export type ReservedQueryName = (typeof RESERVED_QUERY_NAMES)[number];
