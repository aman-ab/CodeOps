// Moves the project through the optimisation steps so you can measure each one separately.
//   node scripts/stage.mjs 0   baseline: plain <img>, <link> font, plain <script>
//   node scripts/stage.mjs 1   + next/image on every image (hero NOT yet priority)
//   node scripts/stage.mjs 2   + priority on the one hero image
//   node scripts/stage.mjs 3   + next/font
//   node scripts/stage.mjs 4   + next/script lazyOnload  (= the finished project; END HERE)
// It overwrites app/page.js, app/menu/DishCard.jsx and app/layout.js. Commit first.
import { copyFileSync, existsSync } from "node:fs";

const STAGES = {
  0: ["page.0.js", "DishCard.0.jsx", "layout.0.js"],
  1: ["page.1.js", "DishCard.1.jsx", "layout.0.js"],
  2: ["page.2.js", "DishCard.1.jsx", "layout.0.js"],
  3: ["page.2.js", "DishCard.1.jsx", "layout.3.js"],
  4: ["page.2.js", "DishCard.1.jsx", "layout.4.js"],
};
const TARGETS = ["app/page.js", "app/menu/DishCard.jsx", "app/layout.js"];
const NOTES = {
  0: "Baseline.",
  1: "next/image everywhere (exercise 2).",
  2: "priority on the hero (exercise 3).",
  3: "next/font (exercise 4).",
  4: "next/script lazyOnload (exercise 5). This is the finished project.",
};

const stage = process.argv[2];
if (!(stage in STAGES)) {
  console.error("Usage: node scripts/stage.mjs <0|1|2|3|4>");
  process.exit(1);
}
STAGES[stage].forEach((file, i) => {
  const from = `docs/day43/stages/${file}`;
  if (!existsSync(from)) throw new Error(`Missing ${from}`);
  copyFileSync(from, TARGETS[i]);
  console.log(`  ${from}  ->  ${TARGETS[i]}`);
});
console.log(`\nStage ${stage}: ${NOTES[stage]}\nNow: npm run build && npm run start, then run Lighthouse (see PERF.md).`);
