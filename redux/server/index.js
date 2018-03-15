/**
 * Created by yzdd on 2018/3/8.
 */
require('babel-core/register')();

require('babel-polyfill');
require('babel-register')({
        presets: ['es2015', 'react', 'stage-0'],


    });
require('css-modules-require-hook')({
generateScopedName: '[name]__[local]___[hash:base64:5]'
})
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  limit: 8192
})
require('./server');