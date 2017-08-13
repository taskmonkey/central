import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, PropsRoute } from 'react-router-dom';

import Login from './Components/Containers/Login/login.jsx';
import Dashboard from './Components/Containers/Dashboard/Dashboard.jsx';
import ProjectsList from './Components/Containers/ProjectsList/ProjectsList.jsx';
import UserList from './Components/Containers/Users/UserList.jsx';
import TasksTree from './Components/Containers/TasksTree/TasksTree.jsx';
import ProjectForm from './Components/Containers/ProjectsList/ProjectForm.jsx';
import Spinner from './Components/Containers/Login/Spinner.jsx';
import MyTasks from './Components/Containers/MyTasks/MyTasks.jsx';
import Settings from './Components/Containers/Settings/Settings.jsx';
import Chat from './Components/Containers/Chat/Chat.jsx';
import axios from 'axios';
import {connect} from 'react-redux'
import {getUsersTasks, getAllTasks, findAllTasksOfUser, getAllUsers} from './Actions/index.js'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) =>{

  return {}
}
const mapDispathToProps = (dispatch) => {
  return bindActionCreators({getUsersTasks, getAllTasks, findAllTasksOfUser, getAllUsers}, dispatch)
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  componentDidMount() {
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
    axios.get('http://localhost:3000/allTasksByUser')
      .then(result =>{

    })
    axios.get('http://localhost:3000/entireUsers')
      .then(result => {
        this.props.getAllUsers(result.data)
      })
      .catch(err => {
        console.log('err')
      })
  }

  render(){

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Spinner}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/myTasks" component={MyTasks}/>
          <Route exact path="/projectsList" component={ProjectsList}/>
          <Route exact path="/users" component={UserList}/>
          <Route exact path="/tasksTree" component={TasksTree}/>
          <Route exact path="/projectForm" component={ProjectForm}/>
          <Route exact path="/settings" component={Settings}/>
          <Route exact path="/chat" component={Chat}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Main)
