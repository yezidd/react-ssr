import {hydrate, render} from 'react-dom'
import React from 'react'
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import createStoreAll from './store/store';

let preState = window.__INITIAL_STATE__;

let store = createStoreAll(preState, typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
