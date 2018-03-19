/**
 * Created by yzdd on 2018/3/12.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import NavBar from "../component/NavBar";

export default class ToDoContainer extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <button onClick={()=>alert("----")}>点击234567ddd</button>
      </div>
    );
  }
}