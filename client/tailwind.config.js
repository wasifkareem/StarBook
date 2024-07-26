/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dotted-net":
          "radial-gradient(circle, #cccccc 1px, transparent 1px), radial-gradient(circle, #cccccc 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
