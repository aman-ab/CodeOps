import { dishes } from "../data/dishes";
import { orders } from "../data/orders";
import DownloadCsvButton from "./DownloadCsvButton";
import OrdersChart from "./OrdersChart";
import OrderTable from "./OrdersTable";
import RevenueChart from "./RevenueChart";

export default function DashboardPage() {
  const byCategory = [
    "Main Dish",
    "Side Dish",
    "Beverage",
  ].map((category) => {
    const categoryDishes = dishes.filter((dish) => dish.category === category);

    const dishIds = categoryDishes.map((dish) => dish.id);

    const revenue = orders
      .filter((order) => dishIds.includes(order.dishId))
      .reduce((sum, order) => sum + order.total, 0);

    return {
      category,
      revenue,
    };
  });

  const byDate = Object.values(
    orders.reduce((result, order) => {
      if (!result[order.date]) {
        result[order.date] = {
          date: order.date,
          orders: 0,
        };
      }

      result[order.date].orders += 1;

      return result;
    }, {}),
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard! Here you can view Graphs and Tables.</p>
      {/* <pre>{JSON.stringify(byCategory, null, 2)}</pre> */}

      <RevenueChart data={byCategory} />

      {/* <pre>{JSON.stringify(byDate, null, 2)}</pre> */}

      <OrdersChart data={byDate} />

      <OrderTable orders={orders} />

      <DownloadCsvButton orders={orders} />
    </div>
  );
}
