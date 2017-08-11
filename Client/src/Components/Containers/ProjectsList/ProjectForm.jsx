import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createProject} from '../../../Actions/index.js';
import MyModal from '../ProjectsList/ProjectModal.jsx';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    //function binding
    this.handleChange = this.handleChange.bind(this);
    this.handleProjectForm = this.handleProjectForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(){
    this.setState({
        showModal: !this.state.showModal
    });
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    console.log(e.target.name, 'type: ', typeof e.target.value);

  }

  handleProjectForm(nameVal, assigneeVal, budgetHoursVal, descriptionVal) {
    var newAssigneeVals = assigneeVal.split(' ');
    if (Number(budgetHoursVal) == budgetHoursVal) {
      axios.post('/addProject', {name: nameVal, assignees: newAssigneeVals, budget_hours: budgetHoursVal, description: descriptionVal, owner: this.props.storeProfile})
      .then(res => {
        var dataName = JSON.parse(res.config.data);
        console.log('here is the post res', dataName.name);
        // this.props.createProject(res.data.task);
      })
      .then(()=> {
        this.toggleModal();
      })
      .catch(err => {
        console.log('error in the post', err);
      });

    }
    else {
      alert('please enter a number');
    }
  }

  render() {
    return (
      <div className="tasksTreeButton">
        <Button bsStyle="success" onClick={this.toggleModal}>Add Project</Button>
        <MyModal
          toggleModal={this.toggleModal}
          showModal={this.state.showModal}
          handleChange = {this.handleChange}
          handleProjectForm = {this.handleProjectForm}
        />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({createProject}, dispatch);
}

function mapStateToProps(state) {
  return {tasks: state.tasks.allTasks, storeProfile: state.tasks.storeProfile}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
