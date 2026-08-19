import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages =
    locale === "fr"
      ? (await import("../messages/fr.json")).default
      : (await import("../messages/en.json")).default;

  return {
    locale,
    messages,
  };
});
