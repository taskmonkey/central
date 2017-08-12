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
import {createTask, projectTree} from '../../../Actions/index.js';
import MyModal from './TaskModal.jsx';

class TasksTree extends Component{
  constructor() {
    super()
    this.state = {
      taskBudget_hours: '',
      showModal: false,
      currentNode: null,
      button: 900,
      taskId: null,
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
      currentNode: node,
      taskBudget_hours: 'Budget hours:  ' + node.budget_hours.toString()
    })
    this.forceUpdate();
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
  }

  handleTaskForm(nameVal, assigneeVal, budgetHoursVal, descriptionVal) {
    var newAssigneeVals = assigneeVal.split(' ');
    if (Number(budgetHoursVal) == budgetHoursVal) {
      axios.post('/addTask', {name: nameVal, assignees: newAssigneeVals, budget_hours: budgetHoursVal, description: descriptionVal, owner: this.props.storeProfile.userid, parentid: this.state.currentNode.id})
      .then(res => {
        this.props.createTask(res.data.task);
        if(this.state.currentNode.children) {
          currentNode: this.state.currentNode.children.push(res.data.task);
        } else {
          this.state.currentNode.children = [res.data.task];
        }
        if (this.state.button === 900){
          this.setState({button: 899});
        } else {
          this.setState({button: 900});
        }


      })
      .then(()=> {
        this.toggleModal();
      })
      .catch(err => {
        console.log('error in the post', err);
      });
    }
    else {
      alert('budget hours must be a number');
    }
  }

  render() {
    console.log('TREE', this.props.tree)
    let budget = '';
    let actual = '';
    let treeMargins = { bottom : 10, left : 20, right : 100, top : 10};
    if(this.props.tree.timeAlloted){
      budget = "total budgeted hours: " + this.props.tree.timeAlloted[0];
      actual = "total actual hours: " + this.props.tree.timeAlloted[1];
    }
    let node = this.state.currentNode;
    return(
      <div>
        <div className="dashboard-container">
          <div className="left-col">
  					<div className="app-title">
  						<h1>Task Mon</h1>
  					</div>
            <NavTask />
              <Button bsStyle="success" onClick={()=> {node ? this.toggleModal() : null}}>Add Task</Button>
          </div>
          <div className="taskTreeContainer">
            <div className="dashboard-title">
              <h1 className="pull-left">Task Tree</h1>
            </div>
            <div className="custom-container">
              <Tree
              data={this.props.tree}
              height={this.state.button}
              width={1050}
              animated
              duration={500}
              treeClassName='custom'
              keyProp='id'
              labelProp = 'name'
              nodeOffset= {10}
              margins={treeMargins}
              nodeClickHandler={this.onNodeClick}
              />;
            </div>
          </div>
          <div className="userProfilePeek">
            <div className="userProfilePeekCircle">
              <img className="userProfilePeekCirclePic" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
            </div>
            <div className="userProfilePeekNameContainer">
              <div className="userProfilePeekName">{console.log(this.state)}</div>
            </div>
            <div className="userProfilePeekTaskContainer">
              <div className="userProfilePeekTask">{this.state.taskName}</div>
              <div>
                {budget}
              </div>
              <div>
                {actual}
                </div>
              <div className="userProfilePeekName">{node ? node.name : ''}</div>
                <div>{node ? node.description : ''}</div>
                <Button bsStyle="success" onClick={()=> {node ? this.toggleModal() : null}}>Add Task</Button>
              </div>
            </div>
            <div>
              <MyModal
                toggleModal={this.toggleModal}
                showModal={this.state.showModal}
                handleChange = {this.handleChange}
                handleTaskForm = {this.handleTaskForm}
              />
            </div>
          </div>
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createTask, projectTree}, dispatch);
}

function mapStateToProps(state) {
  return {tree: state.tasks.projectTree, storeProfile: state.tasks.profile}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksTree);
