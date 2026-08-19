// Refined by Gemini for nicolasthibault@hotmail.ca
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Archivo, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header, Footer } from "@/components/layout";
import { SiteDarkContinuum } from "@/components/layout/SiteDarkContinuum";
import { ContactCta } from "@/components/sections";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { themeInitScript } from "@/lib/theme/script";
import "../globals.css";
import type { Metadata } from "next";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const siteUrl = "https://www.nicolas-thibault.ca";
const ogImage = "/images/og.jpeg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t("seo.siteTitle");
  const description = t("seo.siteDescription");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    icons: {
      icon: "/images/projects/nt-favicon.png",
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      title,
      description,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isSupportedLocale = (routing.locales as readonly string[]).includes(
    locale,
  );

  if (!isSupportedLocale) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <SmoothScrollProvider>
              <ScrollProgress />
              <Header />

              <main>{children}</main>

              <SiteDarkContinuum>
                <ContactCta />
                <Footer />
              </SiteDarkContinuum>
            </SmoothScrollProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
