import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks} from '../../../Actions/index.js';


class TasksList extends Component{

  componentWillMount() {
    this.props.fetchTasks();
  }

  render() {
    return(
      <div>
        <h1>Task List</h1>
        {
          this.props.tasks.map(task =>
            <div>{task.title + ': ' + task.content}</div>
          )
        }
        <Link to="/tasksTree"><button>Tasks Tree</button></Link>
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
