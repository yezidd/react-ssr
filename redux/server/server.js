import {indexPage} from "./tool";

var express = require("express");
var app = express();

var React = require('react');
var ReactDOMServer = require('react-dom/server');

import App from "../src/App";

import {StaticRouter} from 'react-router-dom'


app.get('/static/vendor.bundle.js', (req, res) => {

  res.sendFile('/vendor.bundle.js', {root: __dirname + `/build`});
});

app.get('/static/app.css', (req, res) => {

  res.sendFile('/css/app.css', {root: __dirname + `/build`});
});

app.get('/static/app.js', (req, res) => {

  res.sendFile('/app.js', {root: __dirname + `/build`});
});

var i = 0;
app.get('*', function (req, res) {

  let context = {}
  var html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  );

  console.log(context, "上下文是干嘛的" + i);
  i++;
  console.log(html);
  if (context.url) {
    res.writeHead(context.status, {
      Location: context.url
    });
    res.end()
  } else {
    res.end(indexPage(html));
  }
});

app.listen(3000, function () {
  console.log('running on port ' + 3000);
});
