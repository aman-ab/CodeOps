import { useEffect, useState } from "react";

// Custom hook: fetches `url` and returns { data, loading, error }.
//
// - Cleanup aborts the previous request when `url` changes (or when the
//   component is removed), so an old response can never overwrite a new one.
// - The result is stored together with the url it belongs to. `loading` is
//   then simply "the stored result is for a different url than the one asked
//   for" — derived, so we never call setState synchronously inside the effect.
export function useFetch(url) {
  const [result, setResult] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    const ctrl = new AbortController();

    fetch(url, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => setResult({ url, data, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return; // we cancelled it on purpose
        setResult({ url, data: null, error: err.message });
      });

    return () => ctrl.abort();
  }, [url]);

  const loading = result.url !== url;
  return {
    data: loading ? null : result.data,
    loading,
    error: loading ? null : result.error,
  };
}
