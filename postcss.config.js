module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {
      features: {
        rem: {
          rootValue: '62.5%',
        },
      },
    }
  },
};
