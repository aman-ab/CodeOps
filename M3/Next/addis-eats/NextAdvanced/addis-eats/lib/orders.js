import { orders } from "../app/data/orders";

export async function getOrders() {
  // const response = await fetch("https://api.example.com/orders");
  // const data = await response.json();
  // return data;

  // Simulate a delay to mimic fetching data from an API
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return orders;
}

export async function getOrderById(id) {
  // const response = await fetch(`https://api.example.com/books/${id}`);
  // const data = await response.json();
  // return data;

  // Simulate a delay to mimic fetching data from an API
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return orders.find((order) => order.id === id);
}

export async function getOrdersForUser(userId) {
  // const response = await fetch(`https://api.example.com/users/${userId}/orders`);
  // const data = await response.json();
  // return data;

  // Simulate a delay to mimic fetching data from an API
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return orders.filter((order) => order.userId === userId);
}
