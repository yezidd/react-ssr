import React from 'react'
import axios from 'axios';

export default class Home extends React.Component {

  getData() {
    console.log("-----会不会执行两次4444---");
  }

  render() {
    return <div onClick={() => window.alert(123)}>
      <div>Hello world</div>
      <button onClick={() => this.getData()}>点击获取数据</button>
    </div>
  }
}