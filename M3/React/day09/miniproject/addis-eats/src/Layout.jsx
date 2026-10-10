import { Suspense } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ErrorBoundary from "./ErrorBoundary";
import CrashIf from "./dev/CrashIf";
import { PageUnavailable } from "./ui/Fallbacks";
import { PageSkeleton } from "./ui/Skeleton";

// dev crash test for the LAST-RESORT boundary: /?crash=app
function LayoutCrashTest() {
  const [params] = useSearchParams();
  return <CrashIf when={params.get("crash") === "app"} label="layout" />;
}

// The shared frame, rendered once. Only the area inside <Outlet /> can fail or load:
//   Suspense       -> a skeleton while a lazy route's chunk downloads (header/nav/footer stay up)
//   ErrorBoundary  -> a failed render OR a failed chunk download shows a fallback in that same area
// resetKeys: going to another page clears a broken one.
function Layout() {
  const location = useLocation();

  return (
    <>
      <LayoutCrashTest />
      <Header />
      <Nav />
      <ErrorBoundary
        name="page"
        resetKeys={[location.pathname]}
        fallback={(props) => <PageUnavailable {...props} />}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
