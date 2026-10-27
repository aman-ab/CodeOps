export function toCsv(rows) {
  if (rows.length === 0) {
    return "";
  }

  const cell = (value) => {
    const text = String(value ?? "");

    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  return [Object.keys(rows[0]), ...rows.map(Object.values)]
    .map((row) => row.map(cell).join(","))
    .join("\n");
}
