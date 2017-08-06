import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'
import Auth from '../../../Auth/Auth.js';

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render(){

    const auth = new Auth();

    return (
      <div>
        <button onClick={auth.login}>Login Auth</button>
        <Link to="/dashboard"><button>Login Without Password</button></Link>
      </div>
    )
  }
}

export default withRouter(Login);
