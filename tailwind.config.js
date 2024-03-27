/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#ffffff",
        background: "#12072d",
        primary: "#ff8f3f",
        secondary: "#91005a",
        accent: "#6d90d0"
      }
    }
  },
  plugins: []
};
