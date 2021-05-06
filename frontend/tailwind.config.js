module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: { "-spin": "-spin 1s linear infinite" },
      keyframes: {
        "-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
    },
    flexGrow: {
      DEFAULT: 1,
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
  },
  variants: {
    extend: {
      borderWidth: ["last", "hover"],
      cursor: ["hover"],
    },
  },
  plugins: [],
};
