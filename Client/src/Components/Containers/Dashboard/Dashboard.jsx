import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
<<<<<<< HEAD
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
=======
import PieDemo from './PieChart.jsx'

>>>>>>> 3ac5ff0791d9de05d4e36aad4e69a754d91e62cd

class Dashboard extends Component{

  render() {
    return(
      <div>
        <h1>Task Monkey Dashboard</h1>
<<<<<<< HEAD
        <PieGraph />
        <BarGraph />
=======
        <PieDemo />
>>>>>>> 3ac5ff0791d9de05d4e36aad4e69a754d91e62cd
        <Link to="/tasksList"><button>Tasks List</button></Link>
      </div>
    )
  }
}

export default withRouter(Dashboard);
