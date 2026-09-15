import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary from "./ui/ErrorBoundary";
import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./menu/Menu";
import "./css/style.css";

// Code-split routes that aren't needed on first paint. Each becomes its own
// chunk, only downloaded when the user actually navigates there.
const DishDetail = lazy(() => import("./menu/DishDetail"));
const CartPage = lazy(() => import("./cart/CartPage"));
const Checkout = lazy(() => import("./checkout/Checkout"));
const SignIn = lazy(() => import("./auth/SignIn"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<p className="route-loading">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route path="cart" element={<CartPage />} />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  }
                />
                <Route path="signin" element={<SignIn />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
