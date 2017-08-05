import React, { Component } from 'react'
import Dashboard from './Components/Dashboard/Dashboard.jsx'

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