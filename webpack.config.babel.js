import webpack from 'webpack';
import { resolve } from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import BabiliPlugin from 'babili-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    'babel-polyfill',
    'isomorphic-fetch',
  ].concat(isProd ? [
    resolve(__dirname, 'app/index.prod.jsx'),
  ] : [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'app/index.jsx'),
  ]),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    sourceMapFilename: 'bundle.[hash].map',
    publicPath: '/'
  },
  context: resolve(__dirname, 'app'),
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-source-map' : 'eval-source-map',
  devServer: {
    public: 'localhost:3001',
    host: '0.0.0.0',
    port: 3001,
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
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
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: isProd,
              localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]--[hash:base64]',
            }
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=25000'
      }
    ]
  },
  plugins: (isProd ? [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BabiliPlugin(),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'app/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'public'),
      to: resolve(__dirname, 'dist'),
    }]),
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'app/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'public'),
      to: resolve(__dirname, 'dist'),
    }]),
  ]),
}
