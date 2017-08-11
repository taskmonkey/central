import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import Tree from 'react-tree-graph';
import $ from 'jquery';
import NavTask from '../Dashboard/NavTask.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createTask} from '../../../Actions/index.js';
import MyModal from './TaskModal.jsx';

class TasksTree extends Component{
  constructor() {
    super()
    this.state = {
      taskName: '',
      taskDescription: '',
      taskBudget_hours: '',
      userProfilePeekName: '',
      showModal: false
    }
    this.onNodeClick = this.onNodeClick.bind(this);
    this.traverseTree = this.traverseTree.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTaskForm = this.handleTaskForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal(){
    this.setState({
        showModal: !this.state.showModal
    });
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.name, taskForm.value);
  }
  
  handleTaskForm(nameVal, assigneeVal, budgetHoursVal, descriptionVal) {
    axios.post('/addProject',{name: nameVal, assignees: [assigneeVal], budget_hours: budgetHoursVal, description: descriptionVal, owner: 4})
      .then(res => {
        console.log('here is the post res', res);
        this.props.createTask(res);
      })
      .catch(err => {
        console.log('error in the post', err);
      });
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
            <div>
              <Button bsStyle="success" onClick={this.toggleModal}>Add Task</Button>
              <MyModal
                toggleModal={this.toggleModal}
                showModal={this.state.showModal}
                handleChange = {this.handleChange}
                handleTaskForm = {this.handleTaskForm}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createTask}, dispatch);
}

function mapStateToProps(state) {
  return {tree: state.tasks.projectTree}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksTree);

