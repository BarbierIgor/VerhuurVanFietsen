const { Transition } = require('@vue/runtime-dom');

// tailwind.config.js
module.exports = {
  mode: 'jit',

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: 'media', // or 'class'

  theme: {
    extend: {
      colors: {
        dark: {
          'accent': '#E64650',
          '400': '#DEDEDE',
          '600': '#86898c',
          '700': '#2E353B',
          '900': '#202020',
        },
      },
      backgroundImage: {
        'login-background': "url('./src/assets/images/background.png')",
      },
      transitionProperty: {
        'width': 'width',
        'position': 'top left right bottom',
        'max-height': 'max-height',
        'font-weight': 'font-weight',
    },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
