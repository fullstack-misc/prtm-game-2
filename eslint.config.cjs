const ts = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const unusedImports = require('eslint-plugin-unused-imports');


/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  {
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
