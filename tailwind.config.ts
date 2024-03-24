import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#D0FF6C',
        secondary:'#F9FAF4',
        backgroundColor:'#F9FAF4',
        mutedBackground:'#F0F3E9',
        mutedColor:'#8D8C8C',
        textColor:'#262820',
        lineColor:'#DEDEDE'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
