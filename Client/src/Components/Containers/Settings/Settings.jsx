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
            <div className="tasksListContainer">
            <h1 className="pull-left">Unavailable</h1>
            <div className="row">
              <div className="col-sm-4">

              </div>
              <div className="col-sm-8">
                <img src ="https://s-media-cache-ak0.pinimg.com/736x/6f/23/7e/6f237ea6ac27fe935dfc4aa3dc72232e--original--poisons.jpg"/>
              </div>
            </div>
            <h1 className ="paidfeature"> Oops !  </h1>
            <h3 className ="paidfeature">Looks live you've reached a paid feature.  Please upgrade now!</h3>
            
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Settings;
