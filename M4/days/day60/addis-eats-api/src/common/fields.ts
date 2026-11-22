// ?fields=id,status -> a sparse object with only those keys
export function pickFields<T extends object>(row: T, fields: readonly (keyof T)[]): Partial<T> {
  const out: Partial<T> = {};
  for (const f of fields) out[f] = row[f];
  return out;
}
