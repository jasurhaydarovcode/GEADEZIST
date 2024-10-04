const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      'geadezist': {
        100: '#DBDDE2'
      }
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

