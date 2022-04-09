module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        corps_1: ["Lato", "sans-serif"],
        corps_2: ["Spartant", "sans-serif"],
      },
      colors: {
        background: "#f5f8fa",
        darker: "#1D2671",
        primaire: {
          vive: "#42a5f5",
          normal: "#1976d2",
          foncé: "#1565c0",
        },
        secondaire: {
          vive: "#ba68c8",
          normal: "#9c27b0",
          foncé: "#7b1fa2",
        },
        accentué: {
          vive: "#ff9800",
          normal: "#ed6c02",
          foncé: "#e65100",
        },
      },
    },
  },
  plugins: [],
  variants: {
    // ...
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
  },
};
