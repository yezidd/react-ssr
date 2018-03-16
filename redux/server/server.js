/**
 * Created by chenlizan on 2017/6/30.
 */

import path from 'path'
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

const App = () => {
  const app = express();
  //挂载静态资源
  app.use("/static", express.static("dist"));
  //设置模版引擎为html
  app.engine("html", require("ejs").__express);
  //设置模版的路径
  app.set("views", path.resolve(__dirname, "views"));
  //有一项是'view engine'，表示没有指定文件模板格式时，默认使用的引擎插件。
  app.set('view engine', 'html');



  app.get("*", function (req, res) {

    let context = {};

    var html = ReactDomServer.renderToString(
      <StaticRouter
        location={req.url}
        context={context}
      >
        <AppDom/>
      </StaticRouter>
    );
    console.log(req.url);
    console.log(context, "---上下文---");

    if (context.url) {
      res.status(context.status);
      res.location(context.url);
      res.end();
    } else {
      res.render('index', {root: html});
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