import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import Tree from 'react-tree-graph';
import $ from 'jquery';


class TasksTree extends Component{

  componentDidMount() {
    $('.node').mouseover(() => {
      alert('HOVERING');
    })
  }

  render() {
    let data = {
      name: 'Parent',
      children: [{
          name: 'Child One'
      }, {
          name: 'Child Two',
          children: [{
            name: 'Child Three'
          },
          {
            name: 'Child Four'
          }]
      }]
    }
    let style = {
      color: 'red',
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
            duration={500}
            treeClassName="custom"
            />
          </div>
        <Link to="/tasksDetails"><button>Task Details</button></Link>
      </div>
    )
  }
}

export default withRouter(TasksTree);
