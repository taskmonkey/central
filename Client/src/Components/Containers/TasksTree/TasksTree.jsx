import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';


class TasksTree extends Component{
  render() {
    return(
      <div>
        <h1>Task Tree</h1>
        <Link to="/tasksDetails"><button>Task Details</button></Link>
      </div>
    )
  }
}

export default withRouter(TasksTree);
