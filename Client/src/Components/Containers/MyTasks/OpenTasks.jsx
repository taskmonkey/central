import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {projectTree} from '../../../Actions/index.js';
import axios from 'axios'





class MyTasksComponent extends Component{
  constructor(props){
    super(props)
    this.getTaskTree = this.getTaskTree.bind(this);
  }
  getTaskTree(){
    console.log(this.props)
    // /projectOfTask
    axios.get('/projectOfTask', {params: {taskid: this.props.task.id}})
      .then(result =>{
        console.log('this is the result' , result)
        axios.get('/allChildTasks', {params: {taskid: result.data.parent}})
          .then(resp => {
          console.log('this is the children',resp)
          let totals = resp.data.pop();
          let tree = this.props.projects;
          console.log(tree)
          tree.children = resp.data;
          tree.timeAlloted = [tree.budget_hours + totals.budgetTotal, tree.actual_hours + totals.actualTotal];
          this.props.projectTree(tree);
        })
      })
    .catch(err =>{
      console.log('fuck')
    })
  }
  render(){
    //console.log(this.props)
    return(
      <div className="OpenTasks">
        <div className="IndividualTasks">
          <div className="row">
            
            <div className="col-sm-2">
              {this.props.task.name}
            </div>
            <div className="col-sm-8">
              {this.props.task.description}
            </div>
            <div className="col-sm-1">
              <Link to='/tasksTree'><div className="" onClick={this.getTaskTree}><button className="taskButton">TaskTree</button></div></Link> 
            </div>
            <div className="col-sm-1">
              <Link to='/tasksTree'><div className="" onClick={this.getTaskTree}><button className="taskButtonComplete">Complete</button></div></Link> 
            </div>
          </div>
        </div>
        
        {/* <div className="tasksListItemTitle" onClick={() => {  props.history.push("/tasksTree")}}>{props.user.username}</div> */}
      </div>
    )
  }
} 
function mapDispatchToProps(dispatch) {
  return bindActionCreators({projectTree}, dispatch);
}
function mapStateToProps(state) {
  return { projects: state.tasks.allProjects }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTasksComponent);