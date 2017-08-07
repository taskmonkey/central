import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
import NavTask from './NavTask.jsx'

class Dashboard extends Component{
  render() {
    return(
      <div className = "container">
        <h1>Task Mon Dashboard</h1>
          <div className="row">
            <div className="col-md-2">
              <NavTask />
            </div>
            
            {/* <div className ="col-sm-">
              <PieGraph />
            </div> */}
            
            
            <div className ="col-md-9">
              <BarGraph />
            </div>
        
        </div>
          <Link to="/tasksList"><button>Tasks List</button></Link>
      </div>
    )
  }
}

export default withRouter(Dashboard);
