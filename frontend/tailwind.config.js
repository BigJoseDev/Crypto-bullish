// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure all your files are covered here
  ],
  theme: {
    extend: {
      animation: {
        fadeInLine: "fadeInLine 1.5s ease-out forwards",
      },
      keyframes: {
        fadeInLine: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
}
