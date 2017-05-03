module.exports = {
  extends: 'airbnb',
  installedESLint: true,
  plugins: ['import'],
  env: {
    jest: true,
  },
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'ignore',
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
  },
};
