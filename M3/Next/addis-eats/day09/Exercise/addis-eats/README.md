# Addis Eats on Next.js (Days 36–43)

See `STRATEGY.md`, `BOUNDARY.md`, `DATA.md`, `AUTH.md`, `PERF.md` and **`SEO.md`**.

## Setup
```bash
npm install zod swr jose
cp .env.example .env.local        # then set SESSION_SECRET:  openssl rand -base64 32
npm run dev
```

### Fix `.gitignore` (important)
`create-next-app` ignores `.env*`, which also ignores `.env.example` — the file you are supposed to commit.
Replace that line with:
```
.env*.local
```
then check everything with:
```bash
git init   # if you have not already
node scripts/audit-env.mjs
```
It checks: no secret-looking variable has the `NEXT_PUBLIC_` prefix · `.env.example` lists every variable the code reads · `.env.local` is ignored and `.env.example` is not.

## Day 43: measuring
The images in `public/` are **generated placeholders** (about 280 kB each, 1600px wide, bigger than needed on purpose). Replace them with your own photos (about 800px wide, same file names) and check each dish's `alt` in `app/menu/dishes.js` still describes the photo.

```bash
node scripts/stage.mjs 0     # baseline (plain <img>, <link> font, plain <script>)
npm run build && npm run start   # then Lighthouse — see PERF.md
node scripts/stage.mjs 1..4  # one change at a time; 4 = the finished project
```

## Day 44: checking SEO
Set `NEXT_PUBLIC_SITE_URL` in `.env.production` to your real production address first (metadataBase, canonical URLs,
og:image and the sitemap are all built from it), then:
```bash
npm run build && npm run start
node scripts/seo-check.mjs            # reads the real HTML, sitemap, robots.txt and og:image files
```
Then open a dish page, **View Source**, and read the tags yourself: that is the exercise. See `SEO.md`.

## Accounts, API, auth
See the Day 42 notes in `AUTH.md`. Demo accounts: Abebe `0911000001` / `abebe-pass-1`, Almaz `0911000002` / `almaz-pass-2`, Kebede (staff) `0911000003` / `kitchen-pass-3`.

## Build output
```
(paste npm run build output here)
```
