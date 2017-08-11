import React, {Component} from 'react';
import {render} from 'react-dom';
import Auth from '../../../Auth/Auth.js';
import {Redirect,Link, withRouter} from 'react-router-dom'
import MDSpinner from "react-md-spinner";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {storeProfile, fetchProjects, getTasksByLoggedInUser} from '../../../Actions/index.js';
import axios from 'axios';


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

          axios.get('/getUserInfo', {params: {username:profile.nickname}})
          .then((res) => {
            profile.userid = Number(res.data.id);  
            profile.image = res.data.image;
            axios.get('/allProjectsByUser', {params: {userid: Number(res.data.id)}})
        
            .then((result) => {
              
              this.props.fetchProjects(result.data);
              axios.get('/allOpenTasksOfUser', {params: {userid: Number(res.data.id)}})
              .then((data)=>{
                console.log(data.data)
                this.props.getTasksByLoggedInUser(data.data)
              })
            })
            .catch(err => {
              console.log(err);
            })
          })
          this.props.storeProfile(profile);
          
          this.props.history.push('/dashboard')
      });
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
  return bindActionCreators({storeProfile, fetchProjects, getTasksByLoggedInUser}, dispatch);
}
function mapStateToProps(state) {
  return {profile: state.tasks.profile};
}
export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
