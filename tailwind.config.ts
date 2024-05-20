import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#F5F5F5",
      separator: "#E0E0E0",
      primaryText: "#212121",
      secondaryText: "#424242",
      blueHighlight: "#1E88E5",
      greenSuccess: "#43A047",
      redError: "#D32F2F",
      yellowWarning: "#FFA000",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
