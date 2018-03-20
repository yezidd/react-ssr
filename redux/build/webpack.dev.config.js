'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientConfig = {
  entry: {
    bundle: [
      path.resolve(__dirname, "../src/index.js"),
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true'
    ],
    vendor: ['react', 'react-dom', 'redux', 'react-redux'],
  },
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "bundle.js",
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.js$/, use: ['babel-loader'], exclude: path.resolve(__dirname, "../node_modules")},
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"}))
      },
      {
        test: /\.(jpg|png|gif|webp)$/, use: ["url-loader?limit=8000"]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }],
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: "[name].js"
    }),
    new ExtractTextPlugin("style.css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: "./server/views/index.html",
      template: "./server/views/tpl/index.tpl.html"
    }),
    new OpenBrowserPlugin({
      url: "http://localhost:3000"
    })
  ]
};
module.exports = clientConfig;