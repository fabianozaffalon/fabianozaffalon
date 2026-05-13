import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A4FA0",
          "blue-dark": "#0D3275",
          "blue-light": "#2E6FD4",
          orange: "#F47920",
          gray: "#F5F7FA",
          "gray-dark": "#4A4A4A",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
        screens: { xl: "1280px" },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Lista triplicada → desloca 1/3 para loop imperceptível
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        marquee: "marquee 30s linear infinite", // velocidade original
        "marquee-fast": "marquee 10s linear infinite", // mais rápido — usado no Brands
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;
