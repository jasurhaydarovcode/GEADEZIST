const flowbite = require('flowbite-react/tailwind'); 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content()
  ],
  theme: {
    colors: {
      geadezist: { 
        100: '#DBDDE2', 
      }, 
    },
    extend: {},
  },
  daisyui: {
    logs: false, // Daisy UI Log disabled
  },
  plugins: [
    flowbite.plugin(),
    require('daisyui'),
  ],
}; 