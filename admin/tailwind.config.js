/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0 0% 4.3%)",
        foreground: "hsl(0 0% 90%)",
        primary: "hsl(43 56% 52%)",
        secondary: "hsl(0 0% 12%)",
        muted: "hsl(0 0% 15%)",
        accent: "hsl(142 71% 45%)",
        border: "hsl(0 0% 15%)",
      },
    },
  },
  plugins: [],
}
