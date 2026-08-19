export const FEATURED_SERVICE_IDS = [
  "web_apps",
  "saas",
  "ui_engineering",
  "ecommerce",
] as const;

export type FeaturedServiceId = (typeof FEATURED_SERVICE_IDS)[number];

export const HIGHLIGHTED_SERVICE_ID: FeaturedServiceId = "ui_engineering";

export const SERVICE_ACCENTS: Record<FeaturedServiceId, string> = {
  web_apps: "#ff9a4a",
  saas: "#e56a32",
  ui_engineering: "#c45c38",
  ecommerce: "#ff7a3d",
};
