// The platform already formats currency: no date/number library needed.
const etb = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" });
export const formatETB = (amount) => etb.format(amount);

// Chart axes and labels: "ETB 14,200", no decimals. One formatter, reused by the axis, the labels and the tooltip.
const etbWhole = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 });
export const formatETBWhole = (amount) => etbWhole.format(amount);
