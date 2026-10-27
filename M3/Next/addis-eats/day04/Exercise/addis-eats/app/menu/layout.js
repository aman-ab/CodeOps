import CategorySidebar from "./CategorySidebar";

// Nested layout: wraps /menu and /menu/[id]. Stays mounted when navigating between them.
export default function MenuLayout({ children }) {
  return (
    <div className="flex gap-6">
      <CategorySidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
