import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Containers/Login/login.jsx';
import Dashboard from './Components/Containers/Dashboard/Dashboard.jsx';
import TasksList from './Components/Containers/TasksList/TasksList.jsx';
import TasksTree from './Components/Containers/TasksTree/TasksTree.jsx';
import TasksDetails from './Components/Containers/TasksDetails/TasksDetails.jsx';
import TaskForm from './Components/Containers/TasksList/TaskForm.jsx';
import Spinner from './Components/Containers/Login/Spinner.jsx';

import axios from 'axios';
import {connect} from 'react-redux'
import {getTasks} from './Actions/index.js'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) =>{
  console.log('this is the state in main', state)
  return {}
}
const mapDispathToProps = (dispatch) => {
  return bindActionCreators({getTasks}, dispatch)  
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  componentDidMount() {
    console.log('this is the main props',this.props)
    axios.get('http://localhost:3000/entireUsersTasks')
      .then(result => {
        console.log(result.data)
        this.props.getTasks(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }



  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Spinner}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/tasksList" component={TasksList}/>
          <Route exact path="/tasksTree" component={TasksTree}/>
          <Route exact path="/taskForm" component={TaskForm}/>
          <Route exact path="/tasksDetails" component={TasksDetails}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
<<<<<<< HEAD

export default Main;
=======
export default connect(mapStateToProps, mapDispathToProps)(Main)
//export default Main;
>>>>>>> working on main.jsx
