module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  
  theme: {
    extend: {
      fontFamily: {
        'Quicksand': ['Quicksand', 'sans-serif'],
      },
    },

    variants: {
      extend: {},
    },

    plugins: [],

    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      white: {
        DEFAULT: '#FFFFFF',
      },

      green: {
        dark: '#313C46',
        DEFAULT: '#26ED77',
      },

      gray: {
        dark: '#313C46',
        DEFAULT: '#626C74',
        light: '#E2E2E3',
        lightest: '#FAFAFB',
      },

      blue: {
        DEFAULT: '#007DE8',
      },

      red: {
        DEFAULT: '#EA0000',
      },
      
      orange: {
        DEFAULT: '#FA7300',
      }, 

    }
  },
  
};
