import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = { title: "Addis Eats", description: "Ethiopian food, delivered." };

// ROOT layout: the only place <html> and <body> exist. It never re-renders on navigation.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-amber-50 text-stone-900">
        <Header />
        <div className="flex-1 p-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
