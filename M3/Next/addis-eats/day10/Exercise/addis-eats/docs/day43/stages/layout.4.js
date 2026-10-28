import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Analytics from "../components/Analytics";
import { publicEnv } from "../lib/publicEnv";
import { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "../lib/seo";

// Downloaded once at build time and served from OUR origin: no request to Google at runtime, and
// next/font generates a fallback font with matching metrics so the swap barely moves the page.
// Applied on <body>: the scaffold's globals.css sets font-family on body, which would beat a class on <html>.
// (Need an Amharic face Google does not host? Use next/font/local with a file you ship.)
const inter = Inter({ subsets: ["latin"], display: "swap" });

// Defaults for every page. Each page supplies only its own title ("Menu"), and the template appends the site name once.
// metadataBase turns every relative URL in the metadata (og:image, canonical) into an absolute one:
// it must be the PRODUCTION address (NEXT_PUBLIC_SITE_URL in .env.production).
export const metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: { template: `%s · ${SITE_NAME}`, default: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  openGraph: { siteName: SITE_NAME, locale: "en_ET", type: "website" },
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
