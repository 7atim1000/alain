// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add responsive scaling utilities
      scale: {
        'zoom-90': '0.9',
        'zoom-95': '0.95',
        'zoom-105': '1.05',
        'zoom-110': '1.1',
      },
      // Add min/max dimensions for zoom handling
      minWidth: {
        'zoom-min': '320px',
      },
      maxWidth: {
        'zoom-max': '1920px',
      },
    },
  },
}