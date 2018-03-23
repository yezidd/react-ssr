/**
 * Created by yzdd on 2018/3/12.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import NavBar from "../component/NavBar";
import "./todoContainer.css"
import TodoItem from "../component/TodoItem";
import {connect} from "react-redux";
import {ADD_TODO, addTodo} from "../../action/todo";

class ToDoContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoText: ""
    }
  }

  handleKeyDown = (e) => {
    const {add} = this.props;
    console.log(e.keyCode);
    if (e.keyCode === 13 && this.state.todoText !== "") {
      add(this.state.todoText);
      this.setState({
        todoText: ""
      })
    }
  };

  render() {
    const {todoUnCompleteLength, todoCompleteLength, todoUnComplete, todoComplete} = this.props;
    console.log(this.props);
    return (
      <div>
        <NavBar
          onKeyDown={(e) => this.handleKeyDown(e)}
          onChange={(event) => this.setState({todoText: event.target.value})}
          value={this.state.todoText}
          ref={ref => this.todoInput = ref}
        />
        <div className="todoBody">
          <scetion className="todoCon">
            <h2>
              正在进行
            </h2>
            <span className="inCount">{todoUnCompleteLength}</span>
          </scetion>
          <ul>
            {
              todoUnComplete.map((v, i) => <TodoItem key={v.index} item={v}/>)
            }
          </ul>
          <scetion className="todoCon">
            <h2>
              已经完成
            </h2>
            <span className="inCount">{todoCompleteLength}</span>
          </scetion>
          <ul>
            {
              todoComplete.map((v, i) => <TodoItem key={v.index}
                                                   item={v}
                                                   style={{
                                                     opacity: 0.5,
                                                     borderLeft: "5px solid #999",
                                                     textDecoration: "line-through"
                                                   }} check={true}/>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoUnCompleteLength: state.todo.list.filter((v, i) => v.complete === false).length,
    todoCompleteLength: state.todo.list.filter((v, i) => v.complete === true).length,
    todoUnComplete: state.todo.list.filter((v, i) => v.complete === false),
    todoComplete: state.todo.list.filter((v, i) => v.complete === true),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (text) => dispatch(addTodo(text)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);