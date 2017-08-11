import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import Tree from 'react-tree-graph';
import $ from 'jquery';
import NavTask from '../Dashboard/NavTask.jsx';
import {connect} from 'react-redux';

class TasksTree extends Component{
  constructor() {
    super()
    this.state = {
      taskName: '',
      taskDescription: '',
      taskBudget_hours: ''
    }
    this.onNodeClick = this.onNodeClick.bind(this);
    this.traverseTree = this.traverseTree.bind(this);
  }

  onNodeClick(nodeKey) {
    let node = this.traverseTree(nodeKey, this.props.tree);
    this.setState({
      taskName: node.name,
      taskDescription: node.description,
      taskBudget_hours: 'Budget hours:  ' + node.budget_hours.toString()
      
    })
  }
  traverseTree(id, node) {
    if(node.id === id) {
      return node;
    } else {
      if(node.children) {
        for(var i = 0; i < node.children.length; i++) {
          let route = this.traverseTree(id, node.children[i]);
          if(route){
            return route;
          }
        }
      }
    }
  }
  render() {
    let budget = '';
    let actual = ''
    if(this.props.tree.timeAlloted){
      budget = "total budgeted hours: " + this.props.tree.timeAlloted[0];
      actual = "total actual hours: " + this.props.tree.timeAlloted[1];
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
              data={this.props.tree}
              height={900}
              width={1050}
              animated
              duration={500}
              treeClassName="custom"
              keyProp='id'
              labelProp = 'name'
              
              nodeClickHandler={this.onNodeClick}

              />
            </div>
          </div>
          <div className="userProfilePeek">
            <div className="userProfilePeekCircle">
              <img className="userProfilePeekCirclePic" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
            </div>
            
            <div className="userProfilePeekNameContainer">
              <div>
              {budget}
              </div>
              <div>
                {actual}
                </div>
              <div className="userProfilePeekName">{this.state.taskName}</div>
              <div>{this.state.taskDescription}</div>
              <div>{this.state.taskBudget_hours}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { tree: state.tasks.projectTree }
}

export default connect(mapStateToProps)(TasksTree);

