// 150 dishes for the profiling lab (Exercises 5 and 6)
export const LAB_DISHES = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  name: `Dish ${i + 1}`,
  price: 40 + (i % 12) * 10,
}));
