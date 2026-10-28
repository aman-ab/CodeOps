// ONE fetcher for every SWR query. fetch() only rejects on network failure — a 404 or 500
// "succeeds" — so we throw for non-OK responses, otherwise SWR would cache an error body as data.
export class FetchError extends Error {
  constructor(message, status, info) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.info = info; // the parsed { error, fieldErrors } body, if there was one
  }
}

export async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    let info = null;
    try {
      info = await res.json();
    } catch {}
    throw new FetchError(info?.error ?? `Request failed (${res.status})`, res.status, info);
  }
  return res.json();
}
