const webpack = require('webpack')
const path = require('path')

module.exports = {
  target: 'node',
  mode: 'development',
  context: __dirname,
  entry:
    {
      index: './src/index.ts'
    },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-pdf-handler.js',
    library: 'ReactPdfHandler',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, '/sample/node_modules/']
      },
      {
        test: /\.(pdf|gif|png|jpe?g|svg)$/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  optimization: {
    minimize: true
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3005,
    watchOptions: {
      poll: true
    }
  }
}
