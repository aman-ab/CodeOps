import { useEffect, useState } from "react";
import { fetchMenu } from "../api/menuApi";

/**
 * Fetched menu data is not application state -- it doesn't belong in the
 * cart store or a context. It's kept as ordinary component state behind a
 * small reusable hook, and re-fetched wherever it's needed (Menu and
 * DishDetail both call this).
 */
export function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchMenu()
      .then((items) => {
        if (!cancelled) setMenu(items);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { menu, loading, error };
}
