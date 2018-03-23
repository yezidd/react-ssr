import {hydrate, render} from 'react-dom'
import React from 'react'
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import createStoreAll from './store/store';
import storage from './utils/storage';

// let preState = Object.assign({}, window.__INITIAL_STATE__, JSON.parse(storage.getItem("data")));
let preState = Object.assign({}, window.__INITIAL_STATE__, {});

let store = createStoreAll(preState, typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(function () {
  console.log(store.getState());
  //监听所有store的变化，然后在最终的时候初始化
  storage.setItem("data", JSON.stringify(store.getState()));
});

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
