"use client";

import { useSyncExternalStore } from "react";
import { MAX_QTY_PER_DISH, calcTotals } from "../../lib/pricing";

// ---------------------------------------------------------------------------
// CART STORE
//
// The cart is kept in localStorage so it survives page refreshes and is shared
// between browser tabs. It is exposed to React with useSyncExternalStore, which
// is the correct way to read browser-only data without hydration errors.
//
// Each cart line looks like:
//   { id, name, price, image, category, quantity }
// ---------------------------------------------------------------------------

const STORAGE_KEY = "addis-eats-cart-v1";
const EMPTY = [];

let lines = null; // cached cart; null means "not read from storage yet"
const listeners = new Set();

function clampQuantity(value) {
  return Math.min(MAX_QTY_PER_DISH, Math.max(1, Math.floor(Number(value)) || 1));
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;

    const clean = parsed
      .filter(
        (line) =>
          line &&
          Number.isFinite(Number(line.id)) &&
          typeof line.name === "string" &&
          Number.isFinite(Number(line.price)),
      )
      .map((line) => ({
        id: Number(line.id),
        name: line.name,
        price: Number(line.price),
        image: line.image ?? null,
        category: line.category ?? "",
        quantity: clampQuantity(line.quantity),
      }));

    return clean.length > 0 ? clean : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  if (lines === null) lines = load();
  return lines;
}

function getServerSnapshot() {
  return EMPTY;
}

function commit(next) {
  lines = next.length > 0 ? next : EMPTY;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage full or blocked (private mode). The cart still works in memory.
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  // Another tab changed the cart.
  function onStorage(event) {
    if (event.key === STORAGE_KEY || event.key === null) {
      lines = null;
      listener();
    }
  }

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// ---- actions (plain functions, safe to call from anywhere) ----

export function addToCart(dish, quantity = 1) {
  const current = getSnapshot();
  const existing = current.find((line) => line.id === dish.id);

  if (existing) {
    commit(
      current.map((line) =>
        line.id === dish.id
          ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
          : line,
      ),
    );
    return;
  }

  commit([
    ...current,
    {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image ?? null,
      category: dish.category ?? "",
      quantity: clampQuantity(quantity),
    },
  ]);
}

export function setQuantity(id, quantity) {
  // Going below 1 removes the dish.
  if (quantity < 1) {
    removeFromCart(id);
    return;
  }

  commit(
    getSnapshot().map((line) =>
      line.id === id ? { ...line, quantity: clampQuantity(quantity) } : line,
    ),
  );
}

export function removeFromCart(id) {
  commit(getSnapshot().filter((line) => line.id !== id));
}

export function clearCart() {
  commit(EMPTY);
}

// ---- hook ----

const subscribeNever = () => () => {};

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // false while the server renders and during hydration, true afterwards.
  // Use it to show a skeleton instead of a wrong "empty cart" flash.
  const ready = useSyncExternalStore(subscribeNever, () => true, () => false);

  const count = items.reduce((sum, line) => sum + line.quantity, 0);

  return {
    items,
    ready,
    count,
    ...calcTotals(items),
    getQuantity: (id) => items.find((line) => line.id === id)?.quantity ?? 0,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
  };
}
