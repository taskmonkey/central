import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'
import Auth from '../../../Auth/Auth.js';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth(),
    }
    this.checkAuth = this.checkAuth.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  checkAuth() {
    this.state.auth.handleAuthentication();
    alert(this.state.auth.isAuthenticated());
  }

  goToDashboard() {
    this.state.auth.handleAuthentication();
    if (this.state.auth.isAuthenticated()) {
      this.props.history.push('/dashboard')
    } else {
      return;
    }
  }

  render(){

    return (
      <div>
        <button onClick={this.state.auth.login}>Login Auth</button>
        <button onClick={this.checkAuth}>Check Auth</button>
        <button onClick={this.goToDashboard}>Go to Dashboard</button>
        <Link to="/dashboard"><button>Bypass Authentication to Dashboard</button></Link>
      </div>
    )
  }
}

export default withRouter(Login);

// import React, { Component } from 'react';
// import { Navbar, Button } from 'react-bootstrap';
// import Auth from '../../../Auth/Auth.js';
//
// class Login extends Component {
//
//   constructor(props) {
//     super(props)
//     this.state = {
//       auth: new Auth(),
//     }
//   }
//
//   goTo(route) {
//     this.props.history.replace(`/${route}`)
//   }
//
//   login() {
//     this.state.auth.login();
//   }
//
//   logout() {
//     this.state.auth.logout();
//   }
//
//   render() {
//     const { isAuthenticated } = this.state.auth;
//
//     return (
//       <div>
//         <Navbar fluid>
//           <Navbar.Header>
//             <Navbar.Brand>
//               <a href="#">Auth0 - React</a>
//             </Navbar.Brand>
//             <Button
//               bsStyle="primary"
//               className="btn-margin"
//               onClick={this.goTo.bind(this, 'dashboard')}
//             >
//               Home
//             </Button>
//             {
//               !isAuthenticated() && (
//                   <Button
//                     bsStyle="primary"
//                     className="btn-margin"
//                     onClick={this.login.bind(this)}
//                   >
//                     Log In
//                   </Button>
//                 )
//             }
//             {
//               isAuthenticated() && (
//                   <Button
//                     bsStyle="primary"
//                     className="btn-margin"
//                     onClick={this.logout.bind(this)}
//                   >
//                     Log Out
//                   </Button>
//                 )
//             }
//           </Navbar.Header>
//         </Navbar>
//       </div>
//     );
//   }
// }
//
// export default Login;
