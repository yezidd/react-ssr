/**
 * Created by yzdd on 2018/3/21.
 */
import React, {Component} from 'react';
import {findDomNode} from 'react-dom';
import './todoItem.css'
import {connect} from "react-redux";
import {completeTodo, deleteTodo, modifyTodo} from "../../action/todo";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: this.props.item.complete,
      status: "text",
      textValue: this.props.item.text
    }
  }

  handleBlur = () => {
    if (this.state.textValue !== "") {
      this.props.modifyTodoBtn({index: this.props.item.index, text: this.state.textValue});
      this.setState({
        status: "text"
      });
    } else {
      this.setState({
        status: "text"
      })
    }
  };

  render() {
    const {style, check, complete, item, deleteBtn} = this.props;
    console.log(item.index, item, this.props.item.complete, this.state.checkValue, "----");
    return (
      <li className="item" style={style}>
        <input
          type="checkbox"
          name="selectTodo"
          className={"selectTodo"}
          onChange={(e) => {
            console.log(e.target.checked);
            this.setState({checkValue: e.target.checked});
            console.log(this.state.checkValue);
            complete(item.index);
          }}
          checked={this.state.checkValue}
        />
        {
          this.state.status === "change" ?
            <input
              onChange={(e) => this.setState({textValue: e.target.value})}
              value={this.state.textValue}
              onBlur={() => this.handleBlur()}
              autoFocus
              style={{flex: 1, marginRight: 100}}
              ref="myInput"
              id="myCheck"
              onFocus={() => document.getElementById("myCheck").setSelectionRange(0, this.state.textValue.length)}
            />
            : <p className="content" onClick={() => this.setState({status: "change"})}>{item.text}</p>
        }

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
    deleteBtn: (index) => dispatch(deleteTodo(index)),
    modifyTodoBtn: ({index, text}) => dispatch(modifyTodo({index, text}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)