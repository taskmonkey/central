import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import Tree from 'react-tree-graph';
import { easeElastic } from 'd3-ease';


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
          <div className="custom-container">
            <Tree
            data={data}
            height={600}
            width={800}
            animated
            duration={1000}
            easing={easeElastic}
            treeClassName="custom"/>
          </div>
        <Link to="/tasksDetails"><button>Task Details</button></Link>
      </div>
    )
  }
}

export default withRouter(TasksTree);
