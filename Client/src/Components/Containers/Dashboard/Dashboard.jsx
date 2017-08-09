import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
import NavTask from './NavTask.jsx'
import {connect} from 'react-redux'
import Auth from '../../../Auth/Auth.js'

class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth(),
    }
  }

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
            <Link to="/login"><button className="logoutButton" onClick={this.state.auth.logout}>Logout</button></Link>
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
      </div>
    )
  }
}

//export default connect(mapStateToProps, mapDispathToProps)(Dashboard)
export default withRouter(Dashboard);
