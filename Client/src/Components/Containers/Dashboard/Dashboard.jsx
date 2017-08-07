import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'

class Dashboard extends Component{
  render() {
    return(
      <div>
        <h1>Task Monkey Dashboard</h1>
        <PieGraph />
        <BarGraph />
        <Link to="/tasksList"><button>Tasks List</button></Link>
      </div>
    )
  }
}

export default withRouter(Dashboard);
