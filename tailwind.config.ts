import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'kaotika': ['kaotika', 'serif'],
      },
      colors: {
        medieval: {
          'dark': '#1a202c',
          'gold': '#f9d564',
          'green': '#4e6e45',
          'red': '#7e2d2f',
          'blue': '#2d6187',
        },
      },
    },
  },
  plugins: [],
};
export default config;
