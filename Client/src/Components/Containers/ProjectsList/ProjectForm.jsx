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
  }

  handleProjectForm(nameVal, assigneeVal, budgetHoursVal, descriptionVal) {
    var newAssigneeVals = assigneeVal.split(' ');
    if (Number(budgetHoursVal) == budgetHoursVal) {
      axios.post('/addProject', {name: nameVal, assignees: newAssigneeVals, budget_hours: budgetHoursVal, description: descriptionVal, owner: this.props.storeProfile.userid})
      .then(res => {
        this.props.createProject(res.data.task);
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
  return {projects: state.tasks.allProjects, storeProfile: state.tasks.profile}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
