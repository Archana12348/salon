/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        // Here we name our animation 'marquee'
        // You can change '30s' to make it faster or slower
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          // The animation starts at 0%
          "0%": { transform: "translateX(0)" },
          // It moves left by 50% of its total width.
          // Since we have two lists, this moves it exactly one list-width.
          "100%": { transform: "translateX(-50%)" },
        },
      },
      maxWidth: {
        "7.5xl": "88rem", // Custom size between 7xl and full
        ch: "26rem",
      },
    },
  },
  plugins: [],
};
