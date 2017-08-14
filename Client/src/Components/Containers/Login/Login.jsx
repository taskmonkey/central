import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'
import Auth from '../../../Auth/Auth.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth(),
    }
    this.checkAuth = this.checkAuth.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  checkAuth(e) {
    e.preventDefault();
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
      // <div>
      //   <button onClick={this.state.auth.login}>Login Auth</button>
      //   <button onClick={this.checkAuth}>Check Auth</button>
      //   <button onClick={this.goToDashboard}>Go to Dashboard</button>
      //   <button onClick={this.state.auth.logout}>Logout</button>
      //   <Link to="/dashboard"><button>Bypass Authentication to Dashboard</button></Link>
      // </div>
      <ReactCSSTransitionGroup transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionEnter={false}
      transitionLeave={false}>
        <div className="landing">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <p className="navbar-brand">TaskMon</p>
              </div>
              <ul className="nav navbar-nav">
                {/* <li><Link to="/dashboard">Bypass Auth to Dashboard</Link></li>
                <li onClick={this.checkAuth}><a>Check Auth</a></li>
                <li onClick={(e) => {e.preventDefault(); this.goToDashboard();}}><a>Go To Dashboard</a></li>
                <li onClick={(e) => {e.preventDefault(); this.state.auth.logout(); alert('logged out')}}><a>Logout</a></li> */}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li onClick={this.state.auth.login}><a><span className="glyphicon glyphicon-user"></span> Sign Up/Login</a></li>
              </ul>
            </div>
          </nav>
          <div className="jumbotron">
            <div className="jumboText">
              <h1>Welcome to TaskMon</h1> 
               <i className="fa fa-angle-double-down" style={{fontSize:36}}></i> 
            </div>
          </div>
           <div className="landing-bottom">
            <div className="container">
              <div className="row">
                <div className="col-sm-5">
                  <h4 className="landing-header">Real Time Data</h4>
                  <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                    Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                    ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
                </div>
                <div className="col-sm-5 col-sm-offset-2">
                  <h4 className="landing-header">Interactive</h4>
                  <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                    Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                    ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-5">
                  <h4 className="landing-header">Multi-layered</h4>
                  <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                    Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                    ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
                </div>
                <div className="col-sm-5 col-sm-offset-2">
                  <h4 className="landing-header">Flexible</h4>
                  <p className="landing-blurbs">Lorem ipsum dolor sit amet, quo eu ceteros persecuti, unum omnis gubergren his id.
                    Ei sit graeco facilis, cum ei graece mandamus. Sea affert laboramus voluptatibus no,
                    ad qui duis noster similique. Ad dolorem noluisse torquatos vim.</p>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

export default withRouter(Login);
