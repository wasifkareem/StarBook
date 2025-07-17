/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        pri:"#171717",
      },
      backgroundImage: {
        "dotted-net":
          "radial-gradient(circle, #cccccc 1px, transparent 1px), radial-gradient(circle, #cccccc 1px, transparent 1px)",
      },
      fontFamily: {
  			quicksand: [
  				'Quicksand',
  				'sans-serif'
  			]
  		},
    },
    screens: {
      "3xl": "1900px",
      "2xl": "1536px",
      xl: "1150px",
      lg: "782px",
      md: "768px",
    },
  },
  plugins: [],
};
