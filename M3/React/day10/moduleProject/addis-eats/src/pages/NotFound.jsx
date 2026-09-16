import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <h2>Page not found</h2>
      <Link to="/menu">Back to the menu</Link>
    </div>
  );
}

export default NotFound;
