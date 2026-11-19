import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { Header, Footer } from "@/components/Header";

// Fonts are downloaded at build time and served from our own domain:
// the site needs no outside request and works offline.
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Конок — юрты и гостевые дома Кыргызстана",
  description: "Бронирование юртовых лагерей и гостевых домов в сёлах Кыргызстана. Честно о быте, живые хозяева, оплата картой.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%238b1e1e'/%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.4'%3E%3Ccircle cx='24' cy='24' r='13'/%3E%3Ccircle cx='24' cy='24' r='6.5'/%3E%3Cpath d='M24 11v5M24 32v5M11 24h5M32 24h5'/%3E%3C/g%3E%3C/svg%3E"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <LangProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
