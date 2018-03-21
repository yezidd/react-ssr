/**
 * Created by yzdd on 2018/3/12.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import NavBar from "../component/NavBar";
import "./todoContainer.css"

export default class ToDoContainer extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <scetion className="todoCon">
          <h2>
            正在进行
            <span id="inCount">14</span>
          </h2>
        </scetion>
      </div>
    );
  }
}