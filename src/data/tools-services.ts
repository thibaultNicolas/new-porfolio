import type { TechLogoId } from "@/data/tech-logos";

export const TOOLS_SERVICE_IDS = [
  "web_apps",
  "saas",
  "ecommerce",
  "cms",
  "ui_engineering",
  "performance",
] as const;

export type ToolsServiceId = (typeof TOOLS_SERVICE_IDS)[number];

/** Fixed positions matching the reference layout (outer / inner rings). */
export const ORBIT_TOOLS = [
  { id: "nextjs", ring: "outer", angle: -10 },
  { id: "react", ring: "outer", angle: 84 },
  { id: "typescript", ring: "inner", angle: 198 },
  { id: "nodejs", ring: "inner", angle: 134 },
] as const satisfies readonly {
  id: TechLogoId;
  ring: "outer" | "inner";
  angle: number;
}[];

const RING_RADIUS = {
  outer: "min(40vw, 11.5rem)",
  inner: "min(27vw, 7.8rem)",
} as const;

export function getOrbitRadius(ring: "outer" | "inner"): string {
  return RING_RADIUS[ring];
}
