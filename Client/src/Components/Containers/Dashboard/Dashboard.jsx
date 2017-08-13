import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
import NavTask from './NavTask.jsx'
import Auth from '../../../Auth/Auth.js'
import {connect} from 'react-redux'
import {getTasksByLoggedInUser, getUsersTasks, getAllTasks, findAllTasksOfUser, getAllUsers } from '../../../Actions/index.js'
import {bindActionCreators} from 'redux'
import axios from 'axios'
import io from 'socket.io-client';

const mapUserstoAllTasks = (allTasks, allUsers, usersTasks) =>{
  // console.log(allTasks, 'this is the all tasks')
  // console.log(allUsers)
  let userObjects = []
  let taskObjects = []
  let lookUpObject = {}
  let createNewUserObjects = () => {
    for (let i = 0; i < allUsers.length; i++){
      let newUserObject = {};
      newUserObject['name'] = allUsers[i].username
      newUserObject['completed'] = 0;
      newUserObject['incomplete'] = 0;
      newUserObject['id'] = allUsers[i].id;
      userObjects.push(newUserObject)
    }


  }
  createNewUserObjects()
  for (let i = 0; i < allTasks.length; i++){
    lookUpObject[i] = allTasks[i]
  }
  for (let i = 0; i < usersTasks.length; i++){
    usersTasks[i]['status'] = lookUpObject[usersTasks[i].tasks_id - 1].status
    usersTasks[i]['description'] = lookUpObject[usersTasks[i].tasks_id - 1].description
  }
  for (let i= 0; i < usersTasks.length; i++){
    if (usersTasks[i].status === -1){
      userObjects[usersTasks[i].user_id -1].incomplete++
    }
    if (usersTasks[i].status === 1){
      userObjects[usersTasks[i].user_id -1].completed++
    }
  }
  return userObjects;
  // console.log(lookUpObject, 'this is the new object')

}

const mapStateToProps = (state) =>{
  //console.log('this is the state in main DASHBOARD', state)
  return {
    allTasks: state.tasks.allTasks,
    allUsers: state.tasks.allUsers,
    allTasksUsers: state.tasks.usersTasks,
    mappedUsersAndTasks : mapUserstoAllTasks(state.tasks.allTasks, state.tasks.allUsers, state.tasks.usersTasks),
    profile: state.tasks.profile,
    tasks:state.tasks.tasksByLoggedInUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getTasksByLoggedInUser,getUsersTasks, getAllTasks, findAllTasksOfUser, getAllUsers}, dispatch)
}


class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth()
    }
    this.willMount = this.willMount.bind(this);
  }

  willMount() {
    axios.get('http://localhost:3000/entireUsersTasks')
      .then(result => {
        this.props.getUsersTasks(result.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://localhost:3000/entireTasks')
      .then(result =>{
        this.props.getAllTasks(result.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('/allOpenTasksOfUser', {params: {userid: this.props.profile.userid}})
      .then((data)=>{
        this.props.getTasksByLoggedInUser(data.data)
      })
      .catch((err)=>{
        console.log('error')
      })
    axios.get('http://localhost:3000/entireUsers')
      .then(result => {
        this.props.getAllUsers(result.data)
      })
      .catch(err => {
        console.log('err')
      })
  }

  componentWillMount(){
    this.willMount();
  }

  componentDidMount() {
    // '/' will trigger the .on('connection') event on the server side, connects everytime the component mounts
    this.socket = io('/');
    this.socket.on('addedTask', body => {
      console.log('body', body);
      console.log('profile', this.props.profile);
      if(body.body.assignees[0] === this.props.profile.nickname) {
        alert('You have a new task assigned!');
        this.willMount();
      }
    });
  }

  render() {
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        {/* <div className ="col-sm-">

        </div> */}
        <div className="right-col">
					<div className="dashboard-title">
						<h1 className="pull-left">Dashboard</h1>
					</div>

					<div className="graph-container">
						<h3>HRLA16</h3>
            <hr></hr>
            <BarGraph allTasksAndUsers={this.props.mappedUsersAndTasks} allTasksUsers={this.props.allTasksUsers} allUsers={this.props.allUsers}/>

						<h3>Sprints</h3>
            <hr></hr>
						<div className="row">
              <PieGraph />
							{/* <div className="col-sm-4"><PieGraph /></div>
							<div className="col-sm-4"><PieGraph /></div>
							<div className="col-sm-4"><PieGraph /></div> */}
						</div>
					</div>
        </div>
      </div>
    )
  }
}

//export default connect(mapStateToProps, mapDispathToProps)(Dashboard)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
