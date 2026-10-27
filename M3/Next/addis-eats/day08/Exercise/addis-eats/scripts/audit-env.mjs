// node scripts/audit-env.mjs  — checks the environment hygiene rules from Day 43.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

let failed = false;
const ok = (m) => console.log(`  ✓ ${m}`);
const bad = (m) => { failed = true; console.log(`  ✗ ${m}`); };
const warn = (m) => console.log(`  ! ${m}`);

const parseKeys = (file) =>
  readFileSync(file, "utf8").split("\n").map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=/)?.[1]).filter(Boolean);

// 1. No secret-looking variable may carry the NEXT_PUBLIC prefix
console.log("1. No secret prefixed NEXT_PUBLIC");
const envFiles = readdirSync(".").filter((f) => /^\.env/.test(f));
const SECRETISH = /(SECRET|PASSWORD|PRIVATE|TOKEN)/i;
let sawPublicSecret = false;
for (const f of envFiles)
  for (const k of parseKeys(f))
    if (k.startsWith("NEXT_PUBLIC_") && SECRETISH.test(k)) { bad(`${f}: ${k} looks like a secret but is public`); sawPublicSecret = true; }
if (!sawPublicSecret) ok(`checked ${envFiles.join(", ") || "(no env files)"}`);

// 2. .env.example lists every variable the code reads
console.log("2. .env.example covers every variable the code reads");
const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  if (["node_modules", ".next", ".git", "docs"].includes(n)) return [];
  return statSync(p).isDirectory() ? walk(p) : /\.(m?js|jsx|ts|tsx)$/.test(n) ? [p] : [];
});
const used = new Set();
for (const f of [...walk("app"), ...walk("lib"), ...walk("components"), "instrumentation.js", "middleware.js", "next.config.mjs"].filter(existsSync))
  for (const m of readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").matchAll(/process\.env\.([A-Z0-9_]+)/g)) used.add(m[1]);
["NODE_ENV", "NEXT_RUNTIME", "ANALYZE"].forEach((k) => used.delete(k));
if (!existsSync(".env.example")) bad(".env.example is missing");
else {
  const listed = new Set(parseKeys(".env.example"));
  const missing = [...used].filter((k) => !listed.has(k));
  missing.length ? bad(`not in .env.example: ${missing.join(", ")}`) : ok(`all ${used.size} variables documented: ${[...used].join(", ")}`);
}

// 3. .env*.local ignored by git, .env.example NOT ignored
console.log("3. git ignores .env.local but not .env.example");
const ignored = (file) => {
  try { execFileSync("git", ["check-ignore", "-q", file], { stdio: "ignore" }); return true; }
  catch (e) { if (e.status === 1) return false; throw e; }
};
try {
  execFileSync("git", ["rev-parse", "--is-inside-work-tree"], { stdio: "ignore" });
  ignored(".env.local") ? ok(".env.local is ignored") : bad(".env.local is NOT ignored: add `.env*.local` to .gitignore");
  ignored(".env.example")
    ? bad(".env.example is ignored (create-next-app's `.env*` rule does this): replace `.env*` with `.env*.local` in .gitignore")
    : ok(".env.example can be committed");
} catch {
  warn("not a git repository (or git not installed): skipped. Run `git init` first, then re-run.");
}

console.log(failed ? "\nFAILED" : "\nAll checks passed");
process.exit(failed ? 1 : 0);
