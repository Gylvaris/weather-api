import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  eslint.configs.recommended,
  prettierConfig,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ignores: ['eslint.config.js', '.prettierrc', 'package.json', '/node_modules', '/dist'],
  },
  {
    files: ['**/*.ts', '**/*.mts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: [
          './tsconfig.eslint.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
      parser: tseslint.parser,
    },
    ignores: ['eslint.config.js', '.prettierrc', 'package.json'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^node:', '^@?\\w', '^'], ['^\\.']],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
);
