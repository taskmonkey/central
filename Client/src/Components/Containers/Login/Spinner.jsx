import React, {Component} from 'react';
import {render} from 'react-dom';
import Auth from '../../../Auth/Auth.js';
import {Redirect,Link, withRouter} from 'react-router-dom'
import MDSpinner from "react-md-spinner";

class Spinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth(),
    }
  }

  componentDidMount() {
    this.state.auth.handleAuthentication();
    setTimeout(() => {
      if (this.state.auth.isAuthenticated()) {
        this.props.history.push('/dashboard')
      } else {
        this.props.history.push('/login')
      }
    }, 500)
  }

  render() {
    return(
      <div className="spinnerContainer">
        <MDSpinner className="spinner" size="300"/>
      </div>
    )
  }
}

export default withRouter(Spinner);
