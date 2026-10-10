import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";
import { lazyWithRetry } from "./lazyWithRetry";
import Layout from "./Layout";
import DishDetail from "./DishDetail";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AppCrashed } from "./ui/Fallbacks";
import "./css/style.css";

// Split at the route: nobody who only wants to browse downloads the checkout form.
// (Home, Menu and the dish page are the screens people arrive on — they stay in the first bundle.)
const Checkout = lazyWithRetry(() => import("./checkout/Checkout"));
const OrderReceipt = lazyWithRetry(() => import("./pages/OrderReceipt"));

// Boundaries at meaningful seams:
//   here        last resort (AppCrashed)
//   Layout      the routed page area: a broken page keeps the header, nav and footer
//   MenuPage    the menu and the cart panel fail independently
function App() {
  return (
    <ErrorBoundary name="app" fallback={<AppCrashed />}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<MenuPage />} />
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
                <Route
                  path="orders/:id"
                  element={
                    <RequireAuth>
                      <OrderReceipt />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
