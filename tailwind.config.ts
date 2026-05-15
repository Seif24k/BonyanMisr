import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#d4af37",
        "primary-dark": "#b8860b",
        "primary-glow": "#f2b90d",
        secondary: "#0a192f",
        "accent-gold": "#C5A059",
        "background-light": "#f6f8f8",
        "background-dark": "#0B0E14",
        "navy-deep": "#0a192f",
        "navy-light": "#112240",
      },
      fontFamily: {
        display: ["Inter", "Cairo", "sans-serif"],
        body: ["Inter", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
