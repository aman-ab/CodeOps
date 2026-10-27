import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description =
  "Addis Eats delivers fresh Ethiopian food from Bole to your door. Browse the menu, build your cart and order in minutes.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats | Ethiopian food delivered",
  },
  description,
  openGraph: {
    title: "Addis Eats",
    description,
    siteName: "Addis Eats",
    type: "website",
    images: [{ url: "/dishes/firfir.jpg", width: 600, height: 400, alt: "Firfir" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#cf4a07",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
