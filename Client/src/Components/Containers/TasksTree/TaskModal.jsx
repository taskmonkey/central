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
            <h1>create a task</h1>
            <form onSubmit={(e) => {e.preventDefault(); props.handleTaskForm(taskForm.value, assigneeForm.value, budgetHours.value, description.value); props.toggleModal()}}>
              <div className="form-group">
                <label htmlFor="nameForm">Task</label>
                <input type="text" className="form-control" name="task" id="taskForm" placeholder="please enter a task" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="assignee">Assignee</label>
                <input type="text" className="form-control" name="assignee" id="assigneeForm" placeholder="please enter a name" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="budgetHours">Budget Hours</label>
                <input type="text" className="form-control" name="budgetHours" id="budgetHours" placeholder="please enter expected hours" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Task description</label>
                <textarea className="form-control" rows="3" name="description" id="description" placeholder="please enter a description" onChange={props.handleChange}></textarea>
                <Button bsStyle="info" onClick={(e)=> {e.preventDefault(); props.handleTaskForm(taskForm.value, assigneeForm.value, budgetHours.value, description.value); props.toggleModal()}}>Create Task</Button>
              </div>
            </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="info" onClick={(e)=> {e.preventDefault(); props.handleTaskForm(taskForm.value, assigneeForm.value, budgetHours.value, description.value); props.toggleModal()}}>Create Task</Button>
        <Button bsStyle="danger" onClick={props.toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal> 
  )
}

// import React, { Component } from 'react';
// import { Button, Modal } from 'react-bootstrap';

// class taskModal extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: '',
//       assignee: '',
//       budgetHours: '',
//       description: ''
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleTaskForm = this.handleTaskForm.bind(this);
//   }

//   handleChange(e) {
//     e.preventDefault();
//     console.log(e.target.name, nameForm.value);
//     this.setState({[e.target.name]: e.target.value});
//   }
  
//   handleTaskForm() {
//     //e.preventDefault();
//     axios.post('/addProject',{params: {name: this.state.name, assignees: [this.state.assignee], budgetHours: this.state.budgetHours, description: this.state.description, owner: 4}})
//       .then(res => {
//         console.log('here is the post res', res);
//         //this.props.createTask(res);
//       })
//       .catch(err => {
//         console.log('error in the post', err);
//       });
//   }

//   render() {
//     return (
//       <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
//       <Modal.Header closeButton>
//         <Modal.Title></Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="createTask">
//             <h1>create a task</h1>
//             <form onSubmit={(e) => {e.preventDefault(); this.handleTaskForm(); this.props.toggleModal()}}>
//               <div className="form-group">
//                 <label htmlFor="nameForm">Task</label>
//                 <input type="text" className="form-control" name="name" id="taskForm" placeholder="please enter a task" onChange={this.handleChange}/>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="assignee">Assignee</label>
//                 <input type="text" className="form-control" name="assignee" id="assigneeForm" placeholder="please enter a name" onChange={this.handleChange}/>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="budgetHours">Budget Hours</label>
//                 <input type="text" className="form-control" name="budgetHours" id="budgetHours" placeholder="please enter expected hours" onChange={this.handleChange}/>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Task description</label>
//                 <textarea className="form-control" rows="3" name="description" id="description" placeholder="please enter a description" onChange={this.handleChange}></textarea> 
//               </div>
//             </form>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button bsStyle="info" onClick={(e)=> {e.preventDefault(); this.handleTaskForm(); this.props.toggleModal()}}>Create Task</Button> 
//         <Button bsStyle="danger" onClick={this.props.toggleModal}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//     );
//   }
// }

// export default taskModal;