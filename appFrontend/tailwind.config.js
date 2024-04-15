/** @type {import('tailwindcss').Config} */

const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_999 = { ...Array.from(Array(1000)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      borderWidth: px0_999,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_999,
      minHeight: px0_999,
      spacing: px0_999,
      borderRadius: px0_999,
      colors: {
        'black-17': '#171717',
        'gray-7d': '#7d7d7d',
        'gray-99': '#999',
        'gray-be': '#BEBEBE',
        'gray-ca': '#cacaca',
        'gray-dd': '#ddd',
        'gray-e3': '#e3e3e3',
        'gray-eb': '#EBEBEB',
        'gray-f2': '#f2f2f2',
        'gray-f8': '#F8F8F8',
        'gray-f9': '#F9F9F9',
        'light-green': '#0BC73F',
        'light-red': '#EB5147',
        'light-blue': '#346BF7',
        'rgb-white': [255, 255, 255],
        'rgb-gray-99': [153, 153, 153],
      },
    },
  },
  plugins: [],
};
