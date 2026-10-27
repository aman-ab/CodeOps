// Runs once when the Next.js server starts (npm run dev / npm run start). Not during `next build`.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { validateServerEnv } = await import("./lib/env");
    validateServerEnv();
  }
}
