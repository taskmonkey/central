import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks} from '../../../Actions/index.js';
import NavTask from '../Dashboard/NavTask.jsx';

export default class MyTasks extends Component{

  render() {
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
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
