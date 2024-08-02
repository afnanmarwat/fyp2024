/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      // => @media (min-width: 320px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        downtoup: {
          '0%': { transform: 'translateY(300px)',
            
           },
          '100%': { transform: 'translateY(0px)' },
        },
        rtl: {
          '0%': { 
            transform: 'translatex(100vw)'        
           },
          '100%': { 
            transform: 'translatex(0px)',
          },
        },
      },
    },
  },
  plugins: [],
}

