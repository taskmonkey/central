import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'


const MyTasksComponent = (props) => {
  console.log(props, 'taskscomponent')
  return(
    <div className="OpenTasks">
      <div className="IndividualTasks">
        <div className="row">
          
          <div className="col-sm-4">
            {props.task.name}
          </div>
          
          <div className="col-sm-8">
            {props.task.description}
          </div>
        </div>
      </div>
      {/* <div className="tasksListItemTitle" onClick={() => {  props.history.push("/tasksTree")}}>{props.user.username}</div> */}
    </div>
  )
}

export default withRouter(MyTasksComponent);