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
import io from 'socket.io-client';

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
      assignee: {name: '', img: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"},
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

  componentDidMount() {
    // '/' will trigger the .on('connection') event on the server side
    this.socket = io('/');
    this.socket.on('addedTask', body => {
      // alert(body);
    });
  }

  onNodeClick(nodeKey) {
    // HA, GOOD LUCK WITH THIS XD SPAGHETTI CODE TO THE MAXXXXX
    let node = this.traverseTree(nodeKey, this.props.tree);
    let nodeAssigneeClone = node.assignee.slice(0);
    nodeAssigneeClone = nodeAssigneeClone.split('');
    let quoteIdx = nodeAssigneeClone.indexOf("'");
    nodeAssigneeClone.splice(0, quoteIdx + 1);
    quoteIdx = nodeAssigneeClone.indexOf("'");
    let name = nodeAssigneeClone.splice(0, quoteIdx).join('');
    nodeAssigneeClone.splice(0,1);
    quoteIdx = nodeAssigneeClone.indexOf("'");
    nodeAssigneeClone.splice(0, quoteIdx + 1);
    quoteIdx = nodeAssigneeClone.indexOf("'");
    let img = nodeAssigneeClone.splice(0, quoteIdx).join('');
    this.setState({
      currentNode: node,
      taskBudget_hours: 'Budget hours:  ' + node.budget_hours.toString(),
      assignee: {name, img},
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
    var taskDetails = {name: nameVal, assignees: newAssigneeVals, budget_hours: budgetHoursVal, description: descriptionVal, owner: this.props.storeProfile.userid, parentid: this.state.currentNode.id};
    if (Number(budgetHoursVal) == budgetHoursVal && budgetHoursVal) {
      axios.post('/addTask', taskDetails)
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
        console.log('EMITTING IO')
        this.socket.emit('addedTask', taskDetails)
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
    if (Number(actualHours) == actualHours && actualHours) {
    axios.put('/updateStatusComplete', {taskid: this.state.currentNode.id, actual_hours: actualHours})
      .then (() => {
        this.state.currentNode.className = 'green-node';
        this.state.currentNode.status = 1;
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
          <div className="right-col">
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
                nodeOffset= {9}
                nodeRadius = {7}
                margins={treeMargins}
                nodeClickHandler={this.onNodeClick}
              />
              <div className="userProfilePeek">
                <div className="userProfilePeekCircle">
                  <img className="userProfilePeekCirclePic" src={this.state.assignee.img}/>
                </div>
                <div className="userProfilePeekNameContainer">
                  <div className="userProfilePeekName"></div>
                </div>
                <div className="userProfilePeekTaskContainer">
                  <div className="userProfilePeekAssignee">Assigned to: {'\xa0\xa0' + this.state.assignee.name}</div>
                  <div className="userProfilePeekTask">{this.state.taskName}</div>
                  <div>
                    {budget}
                  </div>
                  <div>
                    {actual}
                    </div>
                  <div className="userProfilePeekName">{node ? node.name : ''}</div>
                  <div className="userProfilePeekDetails">
                    <div>{node ? node.description : ''}</div>
                    <div>{this.state.taskBudget_hours}</div>
                  </div>
                  <Button className="userProfilePeekButtons" bsStyle="warning" onClick={()=> {node ? this.toggleModal() : null}}>Add Task</Button>
                  <Button className="completeButton" bsStyle="success" onClick={()=>{node && !this.checkChildren(node) ? this.toggleCompleteModal() : null}}>Complete</Button>
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
