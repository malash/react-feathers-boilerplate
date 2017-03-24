import webpack from 'webpack';
import { resolve } from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
  entry: (process.env.NODE_ENV === 'production' ? [] : [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
  ])
    .concat([resolve(__dirname, 'app/index.jsx')]),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    sourceMapFilename: 'bundle.[hash].map',
    publicPath: '/'
  },
  context: resolve(__dirname, 'app'),
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-source-map' : 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'public'),
      to: resolve(__dirname, 'dist'),
    }]),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'app/index.html'),
      filename: 'index.html',
      inject: 'body',
    })
  ]
}