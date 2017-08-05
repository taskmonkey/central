import React, { Component } from 'react'


class Main extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      todos: []
    }
  }
  render(){
    return (
      <div>
        <h1> TaskMonkey </h1>
      </div>
        
    )
  }
}

export default Main;