module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'prettier'
  ],
  plugins: [
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': [
      'error"'
    ]
  }
}
