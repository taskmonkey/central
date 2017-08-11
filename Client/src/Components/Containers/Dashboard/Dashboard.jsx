import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
import NavTask from './NavTask.jsx'
import Auth from '../../../Auth/Auth.js'
import {connect} from 'react-redux'
import {getTasksByLoggedInUser} from '../../../Actions/index.js'
import {bindActionCreators} from 'redux'

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
    mappedUsersAndTasks : mapUserstoAllTasks(state.tasks.allTasks, state.tasks.allUsers, state.tasks.usersTasks)
  }
}
const mapDispathToProps = (dispatch) => {
  return bindActionCreators({getTasksByLoggedInUser}, dispatch)
}


class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth()
      // barchart: []
    }
  }
  render() {
    return(
      <div className="dashboard-container">
        <div className="left-col">
        <Link to="/login"><button className="logoutButton" onClick={this.state.auth.logout}>Logout</button></Link>
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
          <Link to="/login"><button className="logoutButton" onClick={this.state.auth.logout}>Logout</button></Link>
					<div className="graph-container">
						<h3>HRLA16</h3>
            <hr></hr>
            <BarGraph allTasksAndUsers={this.props.mappedUsersAndTasks} allTasksUsers={this.props.allTasksUsers} allUsers={this.props.allUsers}/>
          	  <Link to="/login"><button className="logoutButton" onClick={this.state.auth.logout}>Logout</button></Link>
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
export default connect(mapStateToProps, mapDispathToProps)(Dashboard)
