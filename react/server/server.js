import {indexPage} from "./tool";

var express = require("express");
var app = express();

var React = require('react');
var ReactDOMServer = require('react-dom/server');

import App from '../src/App';

app.get('/static/vendor.bundle.js', (req, res) => {

  res.sendFile('/vendor.bundle.js', { root: __dirname + `/build` });
})

app.get('/static/app.js', (req, res) => {

  res.sendFile('/app.js', { root: __dirname + `/build` });
})

app.get('/', function (req, res) {
  var html = ReactDOMServer.renderToString(<App/>);
  console.log(html);
  res.end(indexPage(html));
});

app.listen(3000, function () {
  console.log('running on port ' + 3000);
});
