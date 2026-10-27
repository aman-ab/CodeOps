import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import {Inter} from "next/font/google";

export const metadata = {
  title: {
    template: " %s Addis Eats",
    default: "Addis Eats dishes",
  },
  description: "Addis Eats is a food delivery app that allows you to order food from your favorite restaurants and have it delivered to your door.",
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable:"--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
         <Providers> 
          {children}
         </Providers>
        
        <Footer/>
        </body>
    </html> 
  );
}
