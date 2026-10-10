// Where a caught error goes. Today: the console. In a real app this is the one place to
// call a reporting service (Sentry, LogRocket, your own endpoint) — "somewhere you will actually read it".
export function logError(error, info, where = "unknown") {
  console.error(`[ErrorBoundary:${where}]`, error, info?.componentStack ?? "");
}
