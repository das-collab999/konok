import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { Header, Footer } from "@/components/Header";

export const metadata: Metadata = {
  title: "Конок — юрты и гостевые дома Кыргызстана",
  description: "Бронирование юртовых лагерей и гостевых домов в сёлах Кыргызстана. Честные фото, живые хозяева, оплата картой.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#3B2A1E" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='56' fill='%238B1E1E'/%3E%3Ccircle cx='60' cy='60' r='30' fill='none' stroke='%23E9B949' stroke-width='8'/%3E%3C/svg%3E" />
      </head>
      <body className="min-h-screen">
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
