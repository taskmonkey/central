import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default (props) => {
  return (
    <Modal show={props.showCompleteModal} onHide={props.toggleCompleteModal}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="createTask">
            <h1>Complete Task</h1>
            <form onSubmit={(e) => {e.preventDefault(); props.handleCompleteTask(completeForm.value);}}>
              <div className="form-group">
                <label htmlFor="nameForm">Actual Hours</label>
                <input type="text" className="form-control" name="task" id="completeForm" placeholder="please enter Actual Hours" />
              </div>
            </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="info" onClick={(e)=> {e.preventDefault(); props.handleCompleteTask(completeForm.value);}}>Complete Task</Button>
        <Button bsStyle="danger" onClick={props.toggleCompleteModal}>Close</Button>
      </Modal.Footer>
    </Modal> 
  )
}