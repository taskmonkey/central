import React, {Component} from 'react';
import Pie from './Dashboard.jsx'

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state ={
      data: [{1: 1, 2: 3}]
    }
  }

  render() {
    return (

      <div>/Dashboard  
      </div>
    )
  }
}
export default Dashboard;