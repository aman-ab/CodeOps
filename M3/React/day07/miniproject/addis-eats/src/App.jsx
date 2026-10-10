import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
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

// No <CartProvider> any more: the cart lives in cartStore.js, outside the tree.
// Auth and theme are separate providers — one concern, one value, one provider each.
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
