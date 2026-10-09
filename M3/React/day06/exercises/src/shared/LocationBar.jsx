import { useLocation } from "react-router-dom";

// A fake "address bar": shows the router's current location for each demo.
function LocationBar() {
  const { pathname, search } = useLocation();
  return (
    <p>
      URL: <code>{pathname + search}</code>
    </p>
  );
}

export default LocationBar;
