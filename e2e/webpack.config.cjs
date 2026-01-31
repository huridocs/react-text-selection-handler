const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [path.resolve('e2e/test_app/src/index.tsx')],
  },

  mode: 'development',

  output: {
    path: path.resolve('e2e/build_test_app'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: './',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve('e2e/test_app/src/index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
};
