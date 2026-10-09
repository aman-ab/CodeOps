import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// The shared frame, rendered ONCE by the parent route. Navigating between
// children swaps only what is inside <Outlet />.
function Layout() {
  return (
    <>
      <Header />
      <Nav />
      <Outlet /> {/* the matched child route renders here */}
      <Footer />
    </>
  );
}

export default Layout;
