import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import Tree from 'react-tree-graph';
import $ from 'jquery';
import NavTask from '../Dashboard/NavTask.jsx';


class TasksTree extends Component{
  constructor() {
    super()
    this.state = {
      userProfilePeekName: '',
    }
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  onNodeClick(nodeKey) {
    this.setState({
      userProfilePeekName: nodeKey,
    })
  }

  render() {
    let data = {
      name: 'Parent',
      children: [{
          name: 'Child One',
      }, {
          name: 'Child Two',
          children: [{
            name: 'Child Three',
          },
          {
            name: 'Child Four',
            children: [{
              name: 'Child Six'
            }]
          }]
      }]
    }

    return(
      <div>
        <div className="dashboard-container">
          <div className="left-col">
  					<div className="app-title">
  						<h1>Task Mon</h1>
  					</div>
            <NavTask />
          </div>
          <div className="taskTreeContainer">
            <div className="dashboard-title">
              <h1 className="pull-left">Task Tree</h1>
            </div>
            <div className="custom-container">
              <Tree
              data={data}
              height={900}
              width={1050}
              animated
              duration={500}
              treeClassName="custom"
              nodeClickHandler={this.onNodeClick}
              />
            </div>
          </div>
          <div className="userProfilePeek">
            <div className="userProfilePeekCircle">
              <img className="userProfilePeekCirclePic" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
            </div>
            <div className="userProfilePeekNameContainer">
              <div className="userProfilePeekName">{this.state.userProfilePeekName}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TasksTree);
