/**
 * Created by yzdd on 2018/3/8.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: ['react', 'react-dom', 'axios']
  },
  output: {
    path: path.resolve(__dirname, 'server/build'),
    filename: "[name].js"
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
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})

  ],
};