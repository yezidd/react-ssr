/**
 * Created by yzdd on 2018/3/21.
 */
import React, {Component} from 'react';
import './todoItem.css'
import {connect} from "react-redux";
import {completeTodo, deleteTodo} from "../../action/todo";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: this.props.item.complete
    }
  }

  render() {
    const {style, check, complete, item, deleteBtn} = this.props;
    return (
      <li className="item" style={style}>
        <input
          type="checkbox"
          name="selectTodo"
          className={"selectTodo"}
          onChange={(e) => {
            console.log(e.target.checked);
            this.setState({checkValue: e.target.checked}, (e) => {
              complete(item.index)
            });
          }}
          checked={this.state.checkValue}
        />
        <p className="content">456</p>
        <a className="deleteBtn" onClick={() => deleteBtn(item.index)}>-</a>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    complete: (index) => dispatch(completeTodo(index)),
    deleteBtn: (index) => dispatch(deleteTodo(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)