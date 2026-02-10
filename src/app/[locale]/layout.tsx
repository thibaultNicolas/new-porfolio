// Refined by Gemini for nicolasthibault@hotmail.ca
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header, Footer } from "@/components/layout"; // Importation des composants globaux
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${plusJakarta.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScrollProvider>
            {/* Le Header doit être AU-DESSUS du contenu pour être visible partout */}
            <Header />

            <main>{children}</main>

            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
