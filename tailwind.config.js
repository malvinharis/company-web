const _plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  prefix: 'tw-',
  content: ['./src/pages/**', './src/components/**'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green: colors.green,
      sky: colors.sky,
      primary: {
        DEFAULT: '#005EEB',
        light: '#005EEB1F',
        dark: '#0047B3',
      },
      secondary: {
        DEFAULT: '#6F7989',
      },
      gray: {
        DEFAULT: '#DFE4E8',
        dark: '#333333',
        light: '#F9FAFC',
      },
      transparent: {
        DEFAULT: 'transparent',
      },
    },
    fontFamily: {
      'family-regular': 'Poppins',
      'family-bold': 'Poppins-Bold',
    },
    extend: {},
  },
  plugins: [],
};
