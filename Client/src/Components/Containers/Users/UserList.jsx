import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks} from '../../../Actions/index.js';
import NavTask from '../Dashboard/NavTask.jsx';
import UserComponent from './UserComponent.jsx';


class UserList extends Component{
  constructor(props) {
    super(props);
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
        <div className="right-col">
					<div className="dashboard-title">
						<h1 className="pull-left">Users</h1>
					</div>
          <div className="tasksListContainer">
            <div>
               {
                this.props.users.map(user =>
                  <UserComponent user={user}/>
                )
              } 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return { users: state.tasks.allUsers }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
