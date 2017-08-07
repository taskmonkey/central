import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';


class TasksList extends Component{



  render() {
    return(
      <div>
        <h1>Task List</h1>
        <input className="createProject"></input>
        <button className="createProjectButton">Create Project</button>
        <Link to="/tasksTree"><button>Tasks Tree</button></Link>
      </div>
    )
  }
}

export default withRouter(TasksList);
