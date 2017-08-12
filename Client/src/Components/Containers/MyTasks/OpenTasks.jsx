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
    // this.getTaskTree = this.getTaskTree.bind(this);
  }
  // getTaskTree(){
  //   axios.get('/allChildTasks', {params: {taskid: this.props.projectsListItem.id}})
  //   .then(resp => {
  //     let totals = resp.data.pop();
  //     let tree = this.props.projectsListItem;
  //     tree.children = resp.data;
  //     tree.timeAlloted = [tree.budget_hours + totals.budgetTotal, tree.actual_hours + totals.actualTotal];
  //     this.props.projectTree(tree);
  //   })
  //   .catch(err =>{
  //     console.log('hello')
  //   })
  // }
  render(){
    return(
      <div className="OpenTasks">
        <div className="IndividualTasks">
          <div className="row">
            
            <div className="col-sm-4">
              {this.props.task.name}
            </div>
            
            <div className="col-sm-8">
              {this.props.task.description}
            </div>
          </div>
        </div>
        {/* <Link to='/tasksTree'><div className="tasksListItemTitle" onClick={this.getTaskTree}>{this.props.projectsListItem.name}</div></Link> */}
        {/* <div className="tasksListItemTitle" onClick={() => {  props.history.push("/tasksTree")}}>{props.user.username}</div> */}
      </div>
    )
  }
} 
function mapDispatchToProps(dispatch) {
  return bindActionCreators({projectTree}, dispatch);
}


export default connect(null, mapDispatchToProps)(MyTasksComponent);