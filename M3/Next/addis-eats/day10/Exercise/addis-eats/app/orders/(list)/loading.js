import { TableSkeleton } from "../../../components/Skeletons";

// LOADING: the shape of the table (caption, header, five rows), so the page does not jump when data lands.
// Lives in a route group so it covers the list but NOT /orders/[id].
export default function Loading() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Your orders</h1>
      <TableSkeleton rows={5} label="Loading your orders" />
    </main>
  );
}
