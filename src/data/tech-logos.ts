/** Official brand marks self-hosted from Simple Icons (https://simpleicons.org). */
export const TECH_LOGOS = [
  { id: "react", name: "React" },
  { id: "nextjs", name: "Next.js" },
  { id: "convex", name: "Convex" },
  { id: "vue", name: "Vue.js" },
  { id: "typescript", name: "TypeScript" },
  { id: "nodejs", name: "Node.js" },
  { id: "tailwind", name: "Tailwind" },
  { id: "shopify", name: "Shopify" },
  { id: "wordpress", name: "WordPress" },
  { id: "gsap", name: "GSAP" },
  { id: "git", name: "Git" },
] as const;

export type TechLogoId = (typeof TECH_LOGOS)[number]["id"];
