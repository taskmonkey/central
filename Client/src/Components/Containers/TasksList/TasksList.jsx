import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks} from '../../../Actions/index.js';
import NavTask from '../Dashboard/NavTask.jsx';
import TasksListItem from './TasksListItem.jsx';


class TasksList extends Component{

  componentWillMount() {
    this.props.fetchTasks();
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
						<h1 className="pull-left">Tasks List</h1>
					</div>
          <div className="tasksListContainer">
            <div>
              {
                this.props.tasks.map(task =>
                  <TasksListItem tasksListItem={task}/>
                )
              }
              <Link to="/tasksTree"><button className="tasksTreeButton">Tasks Tree</button></Link>
              <Link to="/taskForm"><button>Tasks Form</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchTasks}, dispatch);
}

function mapStateToProps(state) {
  return { tasks: state.tasks.allTasks }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
