module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {},
  globals: {},
  overrides: {
    files: ["*"],
    rules: {
      "no-tabs": "off",
      "indent": "off",
      "semi": "off",
      "no-multi-spaces": "off",
      "no-multiple-empty-lines": "off"
    }
  }
}
