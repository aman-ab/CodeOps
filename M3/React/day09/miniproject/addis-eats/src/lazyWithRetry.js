import { lazy } from "react";

// lazy() that tries the dynamic import once more before giving up. A dropped connection
// mid-navigation makes the import reject; if it still fails, the rejection is thrown
// during render, which the nearest ErrorBoundary catches (that is why they come as a pair).
export function lazyWithRetry(factory, { retries = 1, delayMs = 500 } = {}) {
  return lazy(async () => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error;
        if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    throw lastError;
  });
}
