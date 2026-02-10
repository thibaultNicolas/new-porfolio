import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // On lie le nom "jakarta" à ta variable CSS
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        "off-white": "#fafafa",
        // Optionnel : Ajoute le bleu spécifique pour le réutiliser partout
        "brand-blue": "#2B35AF",
        "brand-navy": "#1A1A40",
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
