export const FEATURED_SERVICE_IDS = [
  "web_apps",
  "saas",
  "ui_engineering",
  "ecommerce",
] as const;

export type FeaturedServiceId = (typeof FEATURED_SERVICE_IDS)[number];

export const HIGHLIGHTED_SERVICE_ID: FeaturedServiceId = "web_apps";

export function getServiceAnchor(id: string): string {
  return id.replaceAll("_", "-");
}
