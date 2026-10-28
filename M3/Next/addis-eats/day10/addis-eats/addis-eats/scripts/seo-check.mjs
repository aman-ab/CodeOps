// node scripts/seo-check.mjs [baseUrl]      default: http://localhost:3000
// Run against `npm run build && npm run start` (or a deployed URL). Reads the real HTML a crawler gets.
// It is a first pass, not a replacement for Search Console and a social-preview debugger.
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const PRIVATE = ["/cart", "/checkout", "/orders", "/kitchen", "/dashboard", "/signin", "/api"];

let failures = 0, warnings = 0;
const pass = (m) => console.log(`    ✓ ${m}`);
const fail = (m) => { failures++; console.log(`    ✗ ${m}`); };
const warn = (m) => { warnings++; console.log(`    ! ${m}`); };

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, "\u00a0");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const metas = (html) => [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => attrs(m[0]));
const meta = (html, key, val) => metas(html).filter((a) => a[key] === val).map((a) => a.content);
const isAbs = (u) => /^https?:\/\//.test(u ?? "");
const local = (u) => { try { return new URL(u).hostname === "localhost"; } catch { return false; } };
const toBase = (u) => { const x = new URL(u); return BASE + x.pathname + x.search; }; // fetch from the server we are checking

async function get(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, type: res.headers.get("content-type") ?? "", buf: Buffer.from(await res.arrayBuffer()) };
}

function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += 2 + len;
    }
  }
  return null;
}

const results = { descriptions: new Map() };

async function checkPage(path, { dish = false } = {}) {
  console.log(`\n  ${path}`);
  const r = await get(BASE + path);
  if (r.status !== 200) return fail(`status ${r.status}`);
  const html = r.buf.toString("utf8");

  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  !title ? fail("no <title>") : title.length > 60 ? warn(`title is ${title.length} chars (search results cut at about 60): "${title}"`) : pass(`title: "${title}"`);

  const desc = meta(html, "name", "description")[0];
  if (!desc) fail("no meta description");
  else {
    desc.length < 50 || desc.length > 170 ? warn(`description is ${desc.length} chars (aim for about 150)`) : pass(`description (${desc.length} chars)`);
    const other = results.descriptions.get(desc);
    other && dish ? fail(`same description as ${other}`) : results.descriptions.set(desc, path);
  }

  const canonical = [...html.matchAll(/<link\s[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.rel === "canonical")?.href;
  !canonical ? fail("no canonical link") : !isAbs(canonical) ? fail(`canonical is not absolute: ${canonical}`) : pass(`canonical: ${canonical}`);

  const og = { title: meta(html, "property", "og:title")[0], description: meta(html, "property", "og:description")[0],
    url: meta(html, "property", "og:url")[0], images: meta(html, "property", "og:image") };
  for (const k of ["title", "description", "url"]) !og[k] && fail(`no og:${k}`);
  if (og.url) !isAbs(og.url) && fail(`og:url is not absolute: ${og.url}`);
  if (!og.images.length) fail("no og:image");
  else for (const img of og.images) {
    if (!isAbs(img)) { fail(`og:image is not absolute: ${img}`); continue; }
    if (local(img) && !local(BASE)) fail(`og:image points at localhost but you are checking ${BASE}: fix NEXT_PUBLIC_SITE_URL`);
    const ir = await get(toBase(img));
    const size = ir.status === 200 ? imageSize(ir.buf) : null;
    ir.status !== 200 || !ir.type.startsWith("image/") ? fail(`og:image ${img} -> ${ir.status} ${ir.type}`)
      : size && size.w === 1200 && size.h === 630 ? pass(`og:image 1200×630 (${ir.type}): ${img}`)
      : warn(`og:image is ${size ? `${size.w}×${size.h}` : "unreadable"}, not 1200×630: ${img}`);
  }
  if (canonical && local(canonical) && !local(BASE)) fail("canonical points at localhost");

  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) => decode(m[0].replace(/<[^>]+>/g, "")).trim());
  h1s.length === 1 ? pass(`one h1: "${h1s[0]}"`) : fail(`${h1s.length} h1 elements`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (dish) {
    if (!ld.length) return fail("no JSON-LD");
    let data; try { data = JSON.parse(decode(ld[0][1])); } catch { return fail("JSON-LD is not valid JSON"); }
    data["@type"] === "MenuItem" ? pass("JSON-LD @type MenuItem") : fail(`JSON-LD @type is ${data["@type"]}`);
    const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " "));
    const shown = text.match(/ETB[\s\u00a0]*([\d,]+(?:\.\d+)?)/);
    const ldPrice = Number(data.offers?.price);
    !shown ? fail("no ETB price visible on the page")
      : Number(shown[1].replace(/,/g, "")) === ldPrice && data.offers?.priceCurrency === "ETB" ? pass(`JSON-LD price ${data.offers.price} ETB matches the page`)
      : fail(`JSON-LD says ${data.offers?.price} ${data.offers?.priceCurrency} but the page shows ETB ${shown[1]}`);
    h1s[0] && data.name === h1s[0] ? pass("JSON-LD name matches the h1") : fail(`JSON-LD name "${data.name}" differs from h1 "${h1s[0]}"`);
    data.description && text.includes(data.description) ? pass("JSON-LD description is visible on the page") : fail("JSON-LD description is not on the page");
  }
}

console.log(`Checking ${BASE}`);

console.log("\n  /sitemap.xml");
const sm = await get(BASE + "/sitemap.xml");
let urls = [];
if (sm.status !== 200) fail(`status ${sm.status}`);
else {
  urls = [...sm.buf.toString().matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  pass(`${urls.length} URLs`);
  const leaked = urls.filter((u) => PRIVATE.some((p) => new URL(u).pathname === p || new URL(u).pathname.startsWith(p + "/")));
  leaked.length ? fail(`private routes in the sitemap: ${leaked.join(", ")}`) : pass("no private routes listed");
  urls.some((u) => !isAbs(u)) && fail("sitemap has relative URLs");
  urls.some(local) && !local(BASE) && fail("sitemap points at localhost");
}

console.log("\n  /robots.txt");
const rb = await get(BASE + "/robots.txt");
if (rb.status !== 200) fail(`status ${rb.status}`);
else {
  const txt = rb.buf.toString();
  for (const p of ["/cart", "/checkout"]) new RegExp(`^Disallow:\\s*${p}\\s*$`, "mi").test(txt) ? pass(`Disallow: ${p}`) : fail(`robots.txt does not disallow ${p}`);
  /^Sitemap:\s*https?:\/\/\S+\/sitemap\.xml/mi.test(txt) ? pass("points at the sitemap") : fail("no absolute Sitemap: line");
  /^Disallow:\s*\/\s*$/m.test(txt) && warn("robots.txt blocks the whole site (expected on a preview deployment only)");
}

const paths = [...new Set(urls.map((u) => new URL(u).pathname))];
const pages = paths.length ? paths : ["/", "/menu"];
for (const p of pages) await checkPage(p, { dish: /^\/menu\/[^/]+$/.test(p) });
await checkPage("/browse");
const q = await get(BASE + "/menu/").then((r) => r.status);
console.log(`\n  /menu/ (trailing slash) -> ${q}`);
[301, 307, 308].includes(q) ? pass("redirects to /menu: one URL, not two") : warn(`status ${q}: a second URL for the same page`);

console.log(`\n${failures ? "FAILED" : "Passed"}: ${failures} failure(s), ${warnings} warning(s)`);
process.exit(failures ? 1 : 0);
