/**
 * Created by yzdd on 2018/3/12.
 */
export const ADD_TODO = "todo/add";
export const DELETE_TODO = "todo/delete";
export const COMPLETE_TODO = "todo/complete";
export const MODIFY_TODO = "todo/modify";

export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      text
    }
  }
}

export function deleteTodo(index) {
  return {
    type: DELETE_TODO,
    payload: {
      index
    }
  }
}

export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    payload: {
      index
    }
  }
}

export function modifyTodo({index, text}) {
  return {
    type: MODIFY_TODO,
    payload: {
      index,
      text
    }
  }
}
