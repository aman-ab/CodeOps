import { ChartSkeleton, TableSkeleton } from "../../components/Skeletons";

export default function Loading() {
  return (
    <main className="space-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ChartSkeleton label="Loading revenue chart" />
      <ChartSkeleton label="Loading orders chart" />
      <TableSkeleton rows={5} label="Loading orders" />
    </main>
  );
}
