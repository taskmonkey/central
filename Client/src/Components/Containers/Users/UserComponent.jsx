import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'

const UserComponent = (props) => {

  return(
    <div className="tasksListItemContainer">
      <div className="tasksListItemCircle">
        <img className="tasksListItemCircleImage" src={props.user.image}/>
      </div>
      <div className="tasksListItemTitle" onClick={() => {  props.history.push("/tasksTree")}}>{props.user.username}</div>
    </div>
  )
}

export default withRouter(UserComponent);