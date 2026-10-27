import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicEnv } from "../lib/publicEnv";

export const metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: "Addis Eats",
  description: "Ethiopian food, delivered.",
};

// STAGE 0 (baseline): the font comes from Google over the network (<link>), and the third-party
// script is a plain <script> tag. Set NEXT_PUBLIC_ANALYTICS_SRC to a real tag to see its cost.
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
