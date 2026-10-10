// [dish, dish, dish] -> [{ dish, qty }]  (one line per dish, with a quantity)
export function groupItems(items) {
  const lines = [];
  for (const dish of items) {
    const line = lines.find((l) => l.dish.id === dish.id);
    if (line) line.qty += 1;
    else lines.push({ dish, qty: 1 });
  }
  return lines;
}
