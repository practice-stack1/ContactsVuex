module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': [2, { "props": false }],
    'no-shadow': ["error", { "allow": ["state"] }],
    "import/prefer-default-export": false,
    'istent-return' : 'off',
    'no-plusplus': 'off',
    'no-trailing-spaces': [2, { "skipBlankLines": true }]
   
  },
};
