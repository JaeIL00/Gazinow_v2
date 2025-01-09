/** @type {import('tailwindcss').Config} */

const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_999 = { ...Array.from(Array(1000)).map((_, i) => `${i}px`) };

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        'black-717': '#171717',
        'gray-575': '#757575',
        'gray-d7d': '#7d7d7d',
        'gray-183': '#7c8183',
        'gray-999': '#999',
        'gray-ebe': '#BEBEBE',
        'gray-4b4': '#B4B4B4',
        'gray-ca': '#cacaca',
        'gray-ddd': '#ddd',
        'gray-3e3': '#e3e3e3',
        'gray-beb': '#EBEBEB',
        'gray-f2': '#f2f2f2',
        'gray-8f8': '#F8F8F8',
        'gray-9f9': '#F9F9F9',

        'purple-54f': '#49454F',

        'light-green': '#0BC73F',
        'light-red': '#EB5147',
        'light-blue': '#346BF7',
        'rgb-white': [255, 255, 255],
        'rgb-gray-999': [153, 153, 153],

        'subway-line-1': '#3151C2',
        'subway-line-2': '#00A84D',
        'subway-line-3': '#FF791E',
        'subway-line-4': '#0EB5EB',
        'subway-line-5': '#8F49DB',
        'subway-line-6': '#C36617',
        'subway-line-7': '#919642',
        'subway-line-8': '#DA3182',
        'subway-line-9': '#A49E88',
        'subway-line-ejb': '#D99124', // 의정부
        'subway-line-el': '#70B15A', // 에버라인
        'subway-line-gg': '#947325', // 김포골드
        'subway-line-gh': '#0471AE', // 공항철도
        'subway-line-kc': '#007A63', // 경춘선
        'subway-line-kj': '#69C3B3', // 경의중앙
        'subway-line-kk': '#063190', // 경강선
        'subway-line-nbd': '#C12F42', // 신분당
        'subway-line-sbd': '#EFAE27', // 수인분당
        'subway-line-sh': '#70B22C', // 서해선
        'subway-line-us': '#B9CB03', // 우이신설
        'subway-line-sl': '#547FB7', // 신림
        'subway-line-io': '#94B9EA', // 인천1
        'subway-line-it': '#FB9A41', // 인천2
        'ni-subway-line-1': '#D6DCF3',
        'ni-subway-line-2': '#CEF7E5',
        'ni-subway-line-3': '#FFE4D3',
        'ni-subway-line-4': '#CFF0FB',
        'ni-subway-line-5': '#E8DCF8',
        'ni-subway-line-6': '#F3DFD1',
        'ni-subway-line-7': '#E9EAD9',
        'ni-subway-line-8': '#F9D7E6',
        'ni-subway-line-9': '#EDECE6',
        'ni-subway-line-ejb': '#F8E8D4', // 의정부
        'ni-subway-line-el': '#E2EEDF', // 에버라인
        'ni-subway-line-gg': '#E9E3D3', // 김포골드
        'ni-subway-line-gh': '#CDE3EF', // 공항철도
        'ni-subway-line-kc': '#CDE4E0', // 경춘선
        'ni-subway-line-kj': '#E0F4F0', // 경의중앙
        'ni-subway-line-kk': '#CCD6E9', // 경강선
        'ni-subway-line-nbd': '#F3D5DA', // 신분당
        'ni-subway-line-sbd': '#FCF0D4', // 수인분당
        'ni-subway-line-sh': '#E1F0D6', // 서해선
        'ni-subway-line-us': '#F1F5CD', // 우이신설
        'ni-subway-line-sl': '#DEE4F1', // 신림
        'ni-subway-line-io': '#EAF1FB', // 인천1
        'ni-subway-line-it': '#FEEAD9', // 인천2
      },
    },
  },
  plugins: [],
};
