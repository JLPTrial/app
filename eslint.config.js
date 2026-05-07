const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  globalIgnores(['.expo/*']),
  expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'indent': ['error', 2],
      'semi': ['error', 'always'],
    },
  },
]);