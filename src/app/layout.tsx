import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { Header, Footer, TabBar } from "@/components/Header";
import { Offline } from "@/components/Offline";
import { ArtDefs } from "@/components/art";

// Fonts are downloaded at build time and served from our own domain:
// the site needs no outside request and works offline.
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["500", "600"], variable: "--font-playfair", display: "swap" });

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Конок — юрты и гостевые дома Кыргызстана",
  description: "Бронирование юрт на жайлоо и гостевых домов в сёлах Кыргызстана. Честно о быте, живые хозяева, оплата картой.",
  manifest: `${base}/manifest.webmanifest`,
  applicationName: "Конок",
  appleWebApp: { capable: true, title: "Конок", statusBarStyle: "default" },
  openGraph: {
    type: "website",
    siteName: "Конок",
    title: "Конок — юрты и гостевые дома Кыргызстана",
    description: "Ночь в юрте под звёздами Тянь-Шаня. Честно о быте, живые хозяева, оплата картой.",
    locale: "ru_RU",
    images: [{ url: `${base}/icon-512.png`, width: 512, height: 512, alt: "Конок" }],
  },
  twitter: {
    card: "summary",
    title: "Конок — юрты и гостевые дома Кыргызстана",
    description: "Ночь в юрте под звёздами Тянь-Шаня.",
    images: [`${base}/icon-512.png`],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#8e2420" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Анимации включаются только когда скрипт работает: без него текст виден сразу. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('has-js')" }} />
        <link rel="apple-touch-icon" href={`${base}/icon-180.png`} />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%2316130f'/%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.4'%3E%3Ccircle cx='24' cy='24' r='13'/%3E%3Ccircle cx='24' cy='24' r='6.5'/%3E%3Cpath d='M24 11v5M24 32v5M11 24h5M32 24h5'/%3E%3C/g%3E%3C/svg%3E"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <ArtDefs />
        <LangProvider>
          <Offline />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <TabBar />
        </LangProvider>
      </body>
    </html>
  );
}
