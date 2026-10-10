import { Link } from "react-router-dom";

// Used twice: by the "*" route (nobody claimed the path) and by DishDetail
// (the path matched, but the dish doesn't exist) — hence the `message` prop.
function NotFound({ message = "That page does not exist." }) {
  return (
    <div className="main-c">
      <h2>404</h2>
      <p>{message}</p>
      <Link to="/menu">Back to the menu</Link>
    </div>
  );
}

export default NotFound;
