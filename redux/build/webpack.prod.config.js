/**
 * Created by yzdd on 2018/3/8.
 */
const path = require('path');
const webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

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
      {test: /\.js$/, use: "babel-loader", include: /src/},
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader??limit=50000&name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '[name].bundle.js'}),
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CleanWebpackPlugin(['server/build']),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      ignoreOrder: true
    }),
  ],
};