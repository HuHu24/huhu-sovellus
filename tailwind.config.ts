import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      soul: "#b265e6",
      buenos_aires: "#7ec2f2",
      tokio: "#fd93ac",
      barcelona: "#ffe369",
      oslo: "#253764",
      helsinki: "#0d0019",
      ateena: "#ffffff",
    },
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        opensauce: ["var(--font-opensauce)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
