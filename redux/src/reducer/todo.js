/**
 * Created by yzdd on 2018/3/12.
 */
import {ADD_TODO, COMPLETE_TODO, DELETE_TODO, MODIFY_TODO} from "../action/todo";

const initialState = {
  list: []
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {list: state.list.concat([{index: state.list.length, text: action.payload.text, complete: false}])};
    case DELETE_TODO:
      return {
        list: state.list.filter((v, i) => v.index !== action.payload.index)
      };
    case MODIFY_TODO:
      return {
        list: state.list.map((v, i) => {
          if (v.index === action.payload.index) {
            return {index: action.payload.index, text: action.payload.text, complete: v.complete}
          } else {
            return v;
          }
        })
      }
    case COMPLETE_TODO:
      return {
        list: state.list.map((v, i) => {
          if (v.index === action.payload.index) {
            return {index: action.payload.index, text: v.text, complete: !v.complete}
          } else {
            return v;
          }
        })
      };
    default:
      return state;
  }
};
export default todoReducer;