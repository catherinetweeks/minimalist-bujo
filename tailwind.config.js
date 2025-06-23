/** @type {import('tailwindcss').Config} */
export default {
// module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        fontFamily: {
          sans: ["'Inter'", "sans-serif"],
        },
      },
      
      extend: {
        fontFamily: {
          grotesque: ["'Bricolage Grotesque'", "sans-serif"],
        },
      },

      extend: {
        fontFamily: {
          titleFont: ["'DM Sans'", "sans-serif"]
        },
      },
    },
    plugins: [],
  };
