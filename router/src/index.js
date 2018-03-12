import {hydrate, render} from 'react-dom'
import React from 'react'
import App from "./App";
import {BrowserRouter} from "react-router-dom";

hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
