import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    //function binding
    this.handleChange = this.handleChange.bind(this);
    this.handleTaskForm = this.handleTaskForm.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.name, this.state[e.target.name]);
    this.setState({[e.target.name]: e.target.value});
  }

  handleTaskForm(e) {
    e.preventDefault();
    axios.post('/api/cats/TaskForm', {name: this.state.name, owner: this.state.owner, image: this.state.image, description: this.state.description})
      .then(res => {
        console.log('handleTaskForm: ', res);
        this.props.cats.push(res);
        alert('cat is now in our database!');
      })
      .catch(err => {
        console.log('error in the post', err);
      });
  }

  render() {
    return (
      // <div className="row">
      //   <h1>list a cat to lend</h1>
        // <form className="form-group col-md-5 col-md-offset-1">
        //   <div>
        //     <label htmlFor="nameForm">Name</label>
        //     <input type="text" className="form-control" name="name" id="nameForm" value={this.state.name} placeholder="please enter a name" onChange={this.handleChange}/>
        //   </div>
        // </form>
      //   <form className="form-group col-md-5">
      //     <div>
      //       <label htmlFor="ownerForm">Owner's Email</label>
      //       <input type="text" className="form-control" name="owner" id="ownerForm" value={this.state.owner} placeholder="please enter an owner email" onChange={this.handleChange}/>
      //     </div>
      //   </form>
      //   <form className="form-group col-md-6 col-md-offset-3">
      //     <label htmlFor="imageForm">Image url</label>        
      //     <input className="form-control" id="imageForm" value={this.state.image} type="text" name="image" placeholder="please enter an image url" onChange={this.handleChange}/>
      //     <span>A good image increases borrow chances by 500%</span>
      //   </form>
      //   <form className="form-group col-md-8 col-md-offset-2">
      //       <label htmlFor="description">Adoption message</label>
      //       <textarea className="form-control" id="description" rows="3" name="description" value={this.state.description} placeholder="please enter a description" onChange={this.handleChange}></textarea>
      //       <button className="btn btn-primary col-md-offset-11" onClick={this.handleTaskForm}>Submit</button> 
      //   </form>
      // </div>
      <div className="row">
        <h1>create a task</h1>
        <form className="form-group col-md-5 col-md-offset-1">
          <div>
            <label htmlFor="nameForm">Name</label>
            <input type="text" className="form-control" name="name" id="nameForm" placeholder="please enter a name" />
          </div>
        </form>
      </div>
    );
  }
}

export default TaskForm;