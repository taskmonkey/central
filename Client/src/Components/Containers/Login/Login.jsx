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

  componentWillMount() {
    this.state.auth.handleAuthentication();
    setTimeout(() => {
      if (this.state.auth.isAuthenticated()) {
        this.props.history.push('/dashboard')
      }
    }, 100)
  }

  checkAuth(e) {
    e.preventDefault();
    this.state.auth.handleAuthentication();
    console.log(localStorage)
    this.state.auth.getProfile((err, profile) => {
      console.log(profile);
    });
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
      // <div>
      //   <button onClick={this.state.auth.login}>Login Auth</button>
      //   <button onClick={this.checkAuth}>Check Auth</button>
      //   <button onClick={this.goToDashboard}>Go to Dashboard</button>
      //   <button onClick={this.state.auth.logout}>Logout</button>
      //   <Link to="/dashboard"><button>Bypass Authentication to Dashboard</button></Link>
      // </div>
      <div className="landing">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <p className="navbar-brand">TaskMon</p>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/dashboard">Bypass Auth to Dashboard</Link></li>
              <li onClick={this.checkAuth}><a>Check Auth</a></li>
              <li onClick={(e) => {e.preventDefault(); this.goToDashboard();}}><a>Go To Dashboard</a></li>
              <li onClick={(e) => {e.preventDefault(); this.state.auth.logout(); alert('logged out')}}><a>Logout</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li onClick={this.state.auth.login}><a><span className="glyphicon glyphicon-user"></span> Sign Up/Login</a></li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron">
          <h1>YOUR LAST TASK MANAGER</h1>
        </div>
        <div className="landing-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-5">
                <h4 className="landing-header">Real time data</h4>
                <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                  Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                  ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
              </div>
              <div className="col-sm-5 col-sm-offset-2">
                <h4 className="landing-header">interactive</h4>
                <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                  Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                  ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-5">
                <h4 className="landing-header">multi-layered</h4>
                <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                  Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                  ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
              </div>
              <div className="col-sm-5 col-sm-offset-2">
                <h4 className="landing-header">flexible</h4>
                <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                  Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                  ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
              </div>
            </div>
          </div>
        </div>
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
