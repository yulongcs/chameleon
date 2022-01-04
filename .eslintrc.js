module.exports = {
  extends: ['@efox/eslint-config-react-prittier-ts', 'plugin:react-hooks/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/display-name': 0,
  },
}
