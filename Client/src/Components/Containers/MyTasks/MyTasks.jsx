import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks} from '../../../Actions/index.js';
import NavTask from '../Dashboard/NavTask.jsx';
import {getTasksByLoggedInUser, storeProfile } from '../../../Actions/index.js'
import MyTasksComponent from './OpenTasks.jsx';
import axios from 'axios'
//function here that changes tasksByLoggedInUser by fetching data

const mapStateToProps = (state) =>{
  
  console.log('this is the state in main MYTASKS', state)
  return {
    tasksByUser: state.tasks.tasksByLoggedInUser,
    profile: state.tasks.profile.userid
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getTasksByLoggedInUser}, dispatch)
} 


class MyTasks extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    axios.get('/allOpenTasksOfUser', {params: {userid: this.props.profile}})
              .then((data)=>{
                console.log('this is the data package',data.data)
                this.props.getTasksByLoggedInUser(data.data)
              })
              .catch((err)=>{
                console.log('error')
              })
  }


  render() {
    //console.log(this.props, 'this is the mytasks page')
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        <div className="right-col">
					<div className="dashboard-title">
						<h1 className="pull-left">My Tasks</h1>
            
					</div>
          <div className="tasksListContainer">
            <div>
              <h3>Task Descriptions</h3>
              <hr></hr>
              {
                this.props.tasksByUser.map(task => 
                  <MyTasksComponent task={task}/>
                )
              } 
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyTasks)