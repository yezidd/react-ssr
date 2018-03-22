/**
 * Created by yzdd on 2018/3/21.
 */
import React, {Component} from 'react';
import './todoItem.css'

export default class TodoItem extends Component {



  render() {
    const {style, check} = this.props;
    return (
      <li className="item" style={style}>
        <input
          type="checkbox"
          name="selectTodo"
          className={"selectTodo"}
          defaultChecked={check}

        />
        <p className="content">456</p>
        <a className="deleteBtn">-</a>
      </li>
    );
  }
}