import React, {Component} from 'react';
import {render} from 'react-dom';
import Auth from '../../../Auth/Auth.js';
import {Redirect,Link, withRouter} from 'react-router-dom'
import MDSpinner from "react-md-spinner";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {storeProfile} from '../../../Actions/index.js';



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
        this.state.auth.getProfile((err, profile) => {
          
          this.props.storeProfile(profile);
          //console.log(this.props, 'profile hopefully');
          this.props.history.push('/dashboard')
       });
        //this.props.history.push('/dashboard')
      } else {
        this.props.history.push('/login')
      }
    }, 750)
  }

  render() {
    //console.log(this.props, 'props');
    return(
      <div className="spinnerContainer">
        <MDSpinner className="spinner" size="300"/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({storeProfile}, dispatch);
}
function mapStateToProps(state) {
  return {profile: state.tasks.profile};
}
export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
