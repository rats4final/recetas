module.exports = {
  env: {
    es6: true,
    node: true,
    jest: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module', // Agrega esta línea
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off', //XD
    quotes: ['error', 'single', { avoidEscape: true }],
    // Resto de las reglas que desees mantener
    'no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
};
