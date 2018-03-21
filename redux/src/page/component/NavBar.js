/**
 * Created by yzdd on 2018/3/15.
 */
import React, {Component} from 'react';
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    const {style, ...other} = this.props;
    return (
      <div className="navCon" style={style}>
        <div className="navTitle">
          <label for="title" className="font1">ToDoList</label>
          <input
            className="todoInput"
            type="text"
            id="title"
            name="title"
            placeholder="添加ToDo"
            required="required"
            autocomplete="off"
            {...other}
          />
        </div>
      </div>
    );
  }
}