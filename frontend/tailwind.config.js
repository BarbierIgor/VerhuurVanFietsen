// tailwind.config.js
module.exports = {
  // mode: 'jit',

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: 'media', // or 'class'

  // corePlugins: {
  //   preflight: false,
  // },

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
    },
  },

  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
