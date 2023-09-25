module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'jest'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: '{react}',
            group: 'builtin',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/ignore': ['react-native'],
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
