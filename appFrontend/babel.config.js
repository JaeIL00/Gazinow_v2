module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['nativewind/babel'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@global': './src/global',
          '@screens': './src/screens',
          '@store': './src/store',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: true,
      },
    ],
  ],
};
