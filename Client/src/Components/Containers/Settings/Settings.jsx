import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import NavTask from '../Dashboard/NavTask.jsx'

class Settings extends Component {
  render() {
    return (
      <div>
        <div className="dashboard-container">
          <div className="left-col">
            <div className="app-title">
              <h1>Task Mon</h1>
            </div>
            <NavTask />
          </div>
        </div>
        <div className="right-col">
          <div className="dashboard-title">
            <h1 className="pull-left">Settings</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
