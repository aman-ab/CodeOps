import ErrorBoundary from "../ErrorBoundary";
import Menu from "./Menu";
import CartPanel from "../components/CartPanel";
import { CartUnavailable, MenuUnavailable } from "../ui/Fallbacks";

// /menu — two independent regions, each with its own boundary.
// Ask: what should survive if this part breaks? If the menu fails, the cart panel and the
// header keep working; if the cart panel fails, the menu keeps working.
function MenuPage() {
  return (
    <>
      <ErrorBoundary name="menu" fallback={(props) => <MenuUnavailable {...props} />}>
        <Menu />
      </ErrorBoundary>
      <ErrorBoundary name="cart" fallback={(props) => <CartUnavailable {...props} />}>
        <CartPanel />
      </ErrorBoundary>
    </>
  );
}

export default MenuPage;
