import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <Link to="/dashboard"><button>Login</button></Link>
      </div>
    )
  }
}

export default withRouter(Login);
