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
    var newAssigneeVals = assigneeVal.length > 0 ? assigneeVal.split(' ') : [];
    if (newAssigneeVals.indexOf(this.props.storeProfile.nickname) < 0) {
      newAssigneeVals.push(this.props.storeProfile.nickname);
    }
    newAssigneeVals.push(this.props.storeProfile.nickname);
    if (Number(budgetHoursVal) == budgetHoursVal) {
      axios.post('/addProject', {name: nameVal, parentid: null, assignees: newAssigneeVals, budget_hours: budgetHoursVal, description: descriptionVal, owner: this.props.storeProfile.userid})
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
      <div className="tasksTreeButton" style={{position: 'absolute', zIndex: 2, float: 'right'}}>
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
