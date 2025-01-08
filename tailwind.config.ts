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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'github-blue': "#4078c0",
        'brand-white': "#ededed",
        'brand-black': "#0a0a0a",
      },
      spacing: {
        '30': "7.5rem",
        '33': "8.25rem",
      }
    },
  },
  plugins: [],
};
export default config;
