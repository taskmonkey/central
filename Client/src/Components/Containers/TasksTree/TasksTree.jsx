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
import CompleteModal from './CompleteModal.jsx';

class TasksTree extends Component{
  constructor() {
    super()
    this.state = {
      taskBudget_hours: '',
      showModal: false,
      showCompleteModal: false,
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
    this.toggleCompleteModal = this.toggleCompleteModal.bind(this);
    this.handleCompleteTask = this.handleCompleteTask.bind(this);
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
  checkChildren(node) {  
    if(node.children) {
      for(let i = 0; i < node.children.length; i++) {
        if(node.children[i].status !== 1) {
          return true;
        }
        let route = this.checkChildren(node.children[i]);
        if (route) {
          console.log(route, 'route');
          return route;
        }
      }
    }
  }
  toggleModal(){
    this.setState({
        showModal: !this.state.showModal
    });
  }
  toggleCompleteModal(){
    this.setState({
        showCompleteModal: !this.state.showCompleteModal
    });
  }
  handleChange(e) {
    e.preventDefault();
  }

  handleTaskForm(nameVal, assigneeVal, budgetHoursVal, descriptionVal) {
    var splitStrAndEraseSpaces = function (str) {
      var newArr = str.trim().split(',');
      return newArr.map(function(val){
        return val.trim();
      })
    }
    var newAssigneeVals = splitStrAndEraseSpaces(assigneeVal);
    if (Number(budgetHoursVal) == budgetHoursVal) {
      console.log('newAssignees', newAssigneeVals);
      axios.post('/addTask', {name: nameVal, assignees: newAssigneeVals, budget_hours: budgetHoursVal, description: descriptionVal, owner: this.props.storeProfile.userid, parentid: this.state.currentNode.id})
      .then(res => {
        var newRes = res.data.task;
        newRes.className = 'red-node';
        this.props.createTask(newRes);
        if(this.state.currentNode.children) {
          currentNode: this.state.currentNode.children.push(newRes);
        } else {
          this.state.currentNode.children = [newRes];  
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
  handleCompleteTask(actualHours) {
    if (Number(actualHours) == actualHours) {
    //console.log(this.checkChildren(this.state.currentNode), 'tododododo');
    axios.put('/updateStatusComplete', {taskid: this.state.currentNode.id, actual_hours: actualHours})
      .then (() => {
        this.state.currentNode.className = 'green-node';
        this.state.currentNode.status = 1;
        //this.props.tree.timeAlloted[1] += Number(actualHours);
        if (this.state.button === 900){
          this.setState({button: 899});
        } else {
          this.setState({button: 900});
        }
      })
      .then(()=> {
        this.toggleCompleteModal();
      })
      .catch((err) => {
        console.log ('error in the update', err);
      })
    } else {
      alert('actual hours must be a number');
    }
  }
  render() {
    console.log('TREE', this.props.tree)
    let budget = '';
    let actual = '';
    let treeMargins = { bottom : 10, left : 20, right : 100, top : 10};
    let node = this.state.currentNode;
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
              height={this.state.button}
              width={1050}
              animated
              duration={500}
              treeClassName='custom'
              keyProp='id'
              labelProp = 'name'
              nodeOffset= {5}
              nodeRadius = {7}
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
              <div className="userProfilePeekName"></div>
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
              <div>{this.state.taskBudget_hours}</div>
              <Button bsStyle="success" onClick={()=> {node ? this.toggleModal() : null}}>Add Task</Button>
              <Button bsStyle="info" onClick={()=>{node && !this.checkChildren(node) ? this.toggleCompleteModal() : null}}>Mark task as complete</Button>
            </div>
            <div>
              <MyModal
                toggleModal={this.toggleModal}
                showModal={this.state.showModal}
                handleChange = {this.handleChange}
                handleTaskForm = {this.handleTaskForm}
              />
            </div>
            <div>
              <CompleteModal
                toggleCompleteModal={this.toggleCompleteModal}
                showCompleteModal={this.state.showCompleteModal}
                handleCompleteTask = {this.handleCompleteTask}
              />
            </div>
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