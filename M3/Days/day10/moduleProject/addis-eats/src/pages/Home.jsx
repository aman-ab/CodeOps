import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page home-page">
      <h2>Welcome to Addis Eats</h2>
      <p>
        Authentic Ethiopian dishes, delivered around Addis Ababa. Browse
        today&apos;s menu, pick out your favourites, and check out in a
        couple of minutes.
      </p>
      <Link to="/menu" className="button-link">
        Browse the menu
      </Link>
    </div>
  );
}

export default Home;
