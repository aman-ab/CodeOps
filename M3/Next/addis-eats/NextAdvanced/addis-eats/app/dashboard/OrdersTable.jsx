const etb = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default function OrderTable({ orders }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #ccc",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <caption>Orders, most recent first</caption>

      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th scope="col">Order</th>
          <th scope="col">Dish</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.bookId}</td>
            <td>{order.quantity}</td>
            <td>{etb(order.total)}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
