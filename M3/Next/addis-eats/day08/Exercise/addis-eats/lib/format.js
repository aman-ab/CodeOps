// The platform already formats currency: no date/number library needed.
const etb = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" });
export const formatETB = (amount) => etb.format(amount);
