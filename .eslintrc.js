module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'plugins': [
    '@typescript-eslint',
    'simple-import-sort',
  ],
  'rules': {
    'max-len': 'off',
    'new-cap': 'off',
  },
  'overrides': [
    {
      'files': ['*.ts'],
      'rules': {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^'],
              ['^\\.(?!/?$)', '^\\./?$', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    },
  ],
  'ignorePatterns': ['dist/'],
};
