import { CartProvider } from "./cart/CartProvider";
import Header from "./components/Header";
import Menu from "./Menu";
import CheckoutPanel from "./components/CheckoutPanel";
import Footer from "./components/Footer";
import "./css/style.css";

// CartProvider wraps everything, so the header badge, the menu and the
// checkout panel can all reach the cart — no prop drilling.
function App() {
  return (
    <CartProvider>
      <Header />
      <Menu />
      <div className="main-c">
        <CheckoutPanel />
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;
