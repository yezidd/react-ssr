import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Root extends Component {
  render() {
    return (
      <div>
        <Link className="link" to="/about">
          <span>Home</span>
        </Link>
        <Link className="link" to="/list">
          <span>List</span>
        </Link>
        <Link className="link" to="/todo">
          <span>About</span>
        </Link>
      </div>
    )
  }
}

export default Root