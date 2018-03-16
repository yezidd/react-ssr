import React from 'react'
import axios from 'axios';
import {Redirect, Route, Switch} from "react-router-dom";
import ToDo from "./page/ToDo";
import List from "./page/List";
import About from "./page/About";
import Root from "./page/Root";
import ToDoContainer from "./page/container/ToDoContainer";
import "./App.css";

export default class App extends React.Component {

  render() {
    return <div onClick={() => window.alert(123)}>
      <div>
        <Switch>

          <Route path="/todo" component={ToDo}/>
          <Route path="/list" component={List}/>
          {/* some other routes */}
          <RedirectWithStatus
            status={301}
            from="/red"
            to="/about"
          />
          <RedirectWithStatus
            status={302}
            from="/todo"
            to="/list"
          />
        </Switch>
      </div>
    </div>
  }
}
const RedirectWithStatus = ({from, to, status}) => (
  <Route render={({staticContext}) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext)
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)