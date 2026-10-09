import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart/CartProvider";
import { AuthProvider } from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Layout from "./Layout";
import DishDetail from "./DishDetail";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./css/style.css";

// Providers go ABOVE the router: they never unmount, so the cart and the
// session survive every navigation.
function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
