import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import Tree from 'react-tree-graph';


class TasksTree extends Component{

  render() {
    let data = {
      name: 'Parent',
      children: [{
          name: 'Child One'
      }, {
          name: 'Child Two'
      }]
    }
    return(
      <div>
        <h1>Task Tree</h1>
        <Tree
            data={data}
            height={400}
            width={400}
            animated={true}/>
        <Link to="/tasksDetails"><button>Task Details</button></Link>
      </div>
    )
  }
}

export default withRouter(TasksTree);
