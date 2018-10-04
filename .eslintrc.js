module.exports = {
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  rules: {
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'prettier/prettier': [
      'error',
      { singleQuote: true }
    ]
  },
  env: {
    node: true,
    es6: true,
    jest: true
  }
};
