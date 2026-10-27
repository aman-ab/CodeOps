import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicEnv } from "../lib/publicEnv";
import { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "../lib/seo";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{ fontFamily: "Inter, Arial, sans-serif" }}
        className="flex min-h-screen flex-col bg-amber-50 text-stone-900"
      >
        <Providers>
          <Header />
          <div className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</div>
          <Footer />
        </Providers>
        {publicEnv.analyticsSrc && <script async src={publicEnv.analyticsSrc} />}
      </body>
    </html>
  );
}
