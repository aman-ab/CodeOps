export interface Page<T> {
  items: T[];
  total: number; // how many matched BEFORE slicing
  limit: number;
  offset: number;
}

// Call this AFTER filtering and sorting, never before.
export function paginate<T>(rows: readonly T[], limit: number, offset: number): Page<T> {
  return { items: rows.slice(offset, offset + limit), total: rows.length, limit, offset };
}
