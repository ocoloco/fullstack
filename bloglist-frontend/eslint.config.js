import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'


export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  { settings: { react: { version: 'detect' } } },
  {
    ignores:
      ['dist', 'node_modules']
  },
  {
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 2,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'no-unused-vars': 0
    }
  }
]
