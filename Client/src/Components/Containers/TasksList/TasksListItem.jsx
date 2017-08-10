import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'

let TasksListItem = (props) => {

  return(
    <div className="tasksListItemContainer">
      <div className="tasksListItemCircle">
        <img className="tasksListItemCircleImage" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
      </div>
      <div className="tasksListItemTitle" onClick={() => {  props.history.push("/tasksTree")}}>{props.tasksListItem.name}</div>
    </div>
  )
}

export default withRouter(TasksListItem);
