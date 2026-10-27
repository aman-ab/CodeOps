import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicEnv } from "../lib/publicEnv";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: "Addis Eats",
  description: "Ethiopian food, delivered.",
};

// STAGE 3: font is self-hosted with next/font. The third-party script is still a plain <script> tag.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-amber-50 text-stone-900`}>
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
