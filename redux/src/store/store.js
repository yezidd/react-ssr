/**
 * Created by yzdd on 2018/3/12.
 */

import reducer from '../reducer';
import {createStore} from "redux";

export default function createStoreAll(preloadedState = {}, enhancer) {
  return createStore(
    reducer, /* preloadedState, */
    preloadedState,
    enhancer
  );
}