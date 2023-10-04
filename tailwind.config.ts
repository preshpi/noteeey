import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#e8e5fb",
        background: "#0a0815",
        primary: "#4729db",
        secondary: "#070416",
        accent: "#a191ed",
      },
    },
  },
  plugins: [],
};
export default config;
