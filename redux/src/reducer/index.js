/**
 * Created by yzdd on 2018/3/12.
 */
import todoReducer from './todo';
import {combineReducers} from "redux";

export default combineReducers({
  todo: todoReducer
})