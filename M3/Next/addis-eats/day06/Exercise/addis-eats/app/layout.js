import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = { title: "Addis Eats", description: "Ethiopian food, delivered." };

// Still a SERVER component: it imports Providers (a client boundary) but passes
// server-rendered Header / children / Footer through it as children.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-amber-50 text-stone-900">
        <Providers>
          <Header />
          <div className="flex-1 p-6">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
