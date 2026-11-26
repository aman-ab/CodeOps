export interface SortKey<K extends string> {
  field: K;
  desc: boolean;
}

// ["area", "-totalSantim"] -> [{area, asc}, {totalSantim, desc}]
export function parseSort<K extends string>(tokens: readonly string[]): SortKey<K>[] {
  return tokens.map((t) =>
    t.startsWith('-') ? { field: t.slice(1) as K, desc: true } : { field: t as K, desc: false },
  );
}

// Left to right: the first key wins, later keys only break ties.
// Works on a COPY because Array.sort mutates.
export function sortRows<T, K extends keyof T & string>(
  rows: readonly T[],
  keys: readonly SortKey<K>[],
): T[] {
  return [...rows].sort((a, b) => {
    for (const { field, desc } of keys) {
      const x: unknown = a[field];
      const y: unknown = b[field];
      const c =
        typeof x === 'number' && typeof y === 'number'
          ? x - y
          : String(x).localeCompare(String(y));
      if (c !== 0) return desc ? -c : c;
    }
    return 0;
  });
}
