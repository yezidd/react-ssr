/**
 * Created by chenlizan on 2017/6/30.
 */

import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../build/webpack.dev.config';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import AppDom from "../src/App";
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import createStoreAll from '../src/store/store';

const complier = webpack(webpackConfig);

// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
complier.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets;
  let file, data;

  Object.keys(assets).forEach(key => {
    if (key.match(/\.html$/)) {
      file = path.resolve(__dirname, "../" + key)
      data = assets[key].source()
      fs.writeFileSync(file, data)
    }
  })
  callback()
});

const App = () => {

  const app = express();
  //挂载静态资源
  // app.use("/static", express.static("dist"));
  //设置模版引擎为html
  app.engine("html", require("ejs").__express);
  //设置模版的路径
  app.set("views", path.resolve(__dirname, "views"));
  //有一项是'view engine'，表示没有指定文件模板格式时，默认使用的引擎插件。
  app.set('view engine', 'html');

  //解析post请求资源
  // 处理json请求类型
  app.use(bodyParser.json());

  //application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: false}));


  //错误处理
  app.use(function (err, req, res, next) {
    res.status(500);
    res.render("error", {error: err.message});
  });


  app.use(webpackDevMiddleware(complier, {
    // 这里是对 webpackDevMiddleware 的一些配置，具体其他配置我们下面已经列出来了。
    //绑定中间件的公共路径,与webpack配置的路径相同
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(require("webpack-hot-middleware")(complier));


  app.get("*", function (req, res) {
    let store = createStoreAll();
    let context = {};

    var html = ReactDomServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <AppDom/>
        </StaticRouter>
      </Provider>
    );
    console.log(req.url);
    console.log(context, "---上下文---");

    if (context.url) {
      res.status(context.status);
      res.location(context.url);
      res.end();
    } else {
      res.render('index', {root: html, preloadState: store});
      res.end();
    }
  });


  return app;
};

const createApp = () => {
  const app = App();
  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  });
  return app;
};

createApp();