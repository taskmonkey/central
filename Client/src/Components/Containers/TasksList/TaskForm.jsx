import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createTask, fetchTasks} from '../../../Actions/index.js';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    //function binding
    this.handleChange = this.handleChange.bind(this);
    this.handleTaskForm = this.handleTaskForm.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.name, nameForm.value);
  }
  
  handleTaskForm(nameVal, categoryVal, contentVal) {
    // e.preventDefault();
    axios.post('http://reduxblog.herokuapp.com/api/posts?key=taskmon', {name: nameVal, categories: categoryVal, content: contentVal})
      .then(res => {
        console.log('here is the post res', res);
        this.props.createTask(res);
      })
      .catch(err => {
        console.log('error in the post', err);
      });
  }

  render() {
    return (
      <div className="container createTask">
        <div className="row">
          <h1>create a task</h1>
          <form onSubmit={(e) => {e.preventDefault(); this.handleTaskForm(nameForm.value, taskForm.value, description.value);}}>
            <div className="form-group col-md-5 col-md-offset-1">
              <label htmlFor="nameForm">Task</label>
              <input type="text" className="form-control" name="task" id="taskForm" placeholder="please enter a task" onChange={this.handleChange}/>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="assignee">Assignee</label>
              <input type="text" className="form-control" name="assignee" id="nameForm" placeholder="please enter a name" onChange={this.handleChange}/>
            </div>
            <div className="form-group col-md-6 col-md-offset-3">
              <label htmlFor="budgetHours">Budget Hours</label>
              <input type="text" className="form-control" name="budgetHours" id="budgetHours" placeholder="please enter expected hours" onChange={this.handleChange}/>
            </div>
            <div className="form-group col-md-8 col-md-6 col-md-offset-3">
              <label htmlFor="description">Task description</label>
              <textarea className="form-control" id="description" rows="3" name="description" id="description" placeholder="please enter a description" onChange={this.handleChange}></textarea>
              <button className="btn btn-primary" type="submit">Submit</button> 
            </div>
          </form>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({createTask, fetchTasks}, dispatch);
}

function mapStateToProps(state) {
  return { tasks: state.tasks.allTasks }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);