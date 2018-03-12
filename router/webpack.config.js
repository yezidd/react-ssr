/**
 * Created by yzdd on 2018/3/8.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: ['react', 'react-dom', 'axios', 'react-router-dom', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, 'server/build'),
    filename: "[name].js",
    chunkFilename: "[name].[hash].js"
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
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '[name].[hash].js'})

  ],
};