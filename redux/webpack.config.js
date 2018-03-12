/**
 * Created by yzdd on 2018/3/8.
 */
const path = require('path');
const webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: ['react', 'react-dom', 'axios', 'react-router-dom', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, 'server/build'),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '[name].[hash].js'}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CleanWebpackPlugin(['server/build'])
  ],
};