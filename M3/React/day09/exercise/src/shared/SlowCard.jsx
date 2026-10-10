// A deliberately heavy card — it stands in for a card with images, a map pin, formatting, etc.
// The busy-wait is a lab device so there is something to measure; real code would never do this.
function burn(ms) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // spin
  }
}

function SlowCard({ dish, onAdd }) {
  burn(0.25); // ≈ 0.25 ms per card  ->  ~40 ms for 150 cards
  return (
    <li>
      {dish.name} — {dish.price} ETB <button onClick={() => onAdd(dish)}>add</button>
    </li>
  );
}

export default SlowCard;
