import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
import NavTask from './NavTask.jsx'

class Dashboard extends Component{
  render() {
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        {/* <div className ="col-sm-">

        </div> */}
        <div className="right-col">
					<div className="dashboard-title">
						<h1 className="pull-left">Dashboard</h1>
						<div className="pull-right">Sample 1</div>
						<span className="pull-right">Same 2</span>
					</div>
					<div className="graph-container">
						<h3>HRLA16</h3>
            <hr></hr>
          	  <BarGraph />
						<h3>Sprints</h3>
            <hr></hr>
						<div className="row">
              <PieGraph />
							{/* <div className="col-sm-4"><PieGraph /></div>
							<div className="col-sm-4"><PieGraph /></div>
							<div className="col-sm-4"><PieGraph /></div> */}
						</div>
					</div>
        </div>
        <Link to="/tasksList"><button>Tasks List</button></Link>
      </div>
    )
  }
}

export default withRouter(Dashboard);
