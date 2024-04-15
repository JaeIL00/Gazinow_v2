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
    },
  },
  plugins: [],
};
