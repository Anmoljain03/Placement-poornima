/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6B7280",
        accent: "#F59E0B",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
        strong: "0 6px 10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
