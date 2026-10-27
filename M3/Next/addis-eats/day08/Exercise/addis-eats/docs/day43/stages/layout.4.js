import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Analytics from "../components/Analytics";
import { publicEnv } from "../lib/publicEnv";

// Downloaded once at build time and served from OUR origin: no request to Google at runtime, and
// next/font generates a fallback font with matching metrics so the swap barely moves the page.
// Applied on <body>: the scaffold's globals.css sets font-family on body, which would beat a class on <html>.
// (Need an Amharic face Google does not host? Use next/font/local with a file you ship.)
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: "Addis Eats",
  description: "Ethiopian food, delivered.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-amber-50 text-stone-900`}>
        <Providers>
          <Header />
          <div className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</div>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
