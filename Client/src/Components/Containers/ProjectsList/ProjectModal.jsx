import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default (props) => {
  return (
    <Modal show={props.showModal} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="createTask">
            <h1>Create a Project</h1>
            <form onSubmit={(e) => {e.preventDefault(); props.handleTaskForm(nameForm.value, assigneeForm.value, projectForm.value, description.value); props.toggleModal()}}>
              <div className="form-group">
                <label htmlFor="nameForm">Project Name</label>
                <input type="text" className="form-control" name="project" id="projectForm" placeholder="please enter project name" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="assignee">Assignee name(s)</label>
                <input type="text" className="form-control" name="assignee" id="assigneeForm" placeholder="names of those involved in this project" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="budgetHours">Budget Hours</label>
                <input type="text" className="form-control" name="budgetHours" id="budgetHours" placeholder="please enter expected hours" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Project Description</label>
                <textarea className="form-control" id="description" rows="3" name="description" id="description" placeholder="please enter a description" onChange={props.handleChange}></textarea>
              </div>
            </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="info" onClick={(e)=> {e.preventDefault(); props.handleTaskForm(nameForm.value, assigneeForm.value, projectForm.value, description.value); props.toggleModal()}}>Create Project</Button>
        <Button bsStyle="danger" onClick={props.toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
