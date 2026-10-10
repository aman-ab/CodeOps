import { Suspense, lazy, useState } from "react";
import ErrorBoundary from "../shared/ErrorBoundary";
import { PageSkeleton } from "../shared/Skeleton";

// Exercise 4 — lazy-load the checkout and receipt routes behind a Suspense skeleton.
// lazy(() => import(...)) puts each screen in its OWN file; React fetches it the first time it renders.
// (Here an artificial delay makes the skeleton visible, and a switch simulates a dropped connection.)
// Run `npm run build` and look in dist/assets: Checkout-*.js and Receipt-*.js are separate files.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function download(importer, shouldFail) {
  await delay(1500); // a slow connection
  if (shouldFail) throw new Error("Failed to fetch dynamically imported module"); // what a dropped connection looks like
  return importer();
}

export default function Exercise4_LazyRoutes() {
  const [Screen, setScreen] = useState(null);
  const [failDownload, setFailDownload] = useState(false);

  // a fresh lazy() per click = a fresh download attempt (a rejected lazy stays rejected)
  const open = (importer) => setScreen(() => lazy(() => download(importer, failDownload)));

  return (
    <div>
      <h2>Exercise 4 · lazy routes + Suspense skeleton</h2>
      <p>
        <button onClick={() => open(() => import("../lazy/Checkout"))}>Go to /checkout</button>{" "}
        <button onClick={() => open(() => import("../lazy/Receipt"))}>Go to /orders/…</button>{" "}
        <label>
          <input type="checkbox" checked={failDownload} onChange={(e) => setFailDownload(e.target.checked)} /> simulate a
          failed download
        </label>
      </p>

      {/* the pair you usually write: the boundary catches a failed download, Suspense covers the wait */}
      <ErrorBoundary
        name="route"
        resetKeys={[Screen]}
        fallback={<p role="alert">⚠ That page couldn&apos;t be downloaded. Check your connection and try again.</p>}
      >
        <Suspense fallback={<PageSkeleton />}>{Screen ? <Screen /> : <p>Pick a screen.</p>}</Suspense>
      </ErrorBoundary>
    </div>
  );
}
