import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'

const UserComponent = (props) => {

  console.log(props.user, 'HEEEEEEERE')

  return(
    <div className="tasksListItemContainer">
      <div className="tasksListItemCircle">
        <img className="tasksListItemCircleImage" src={props.user.image}/>
      </div>
      <div className="tasksListItemTitle">{props.user.username}</div>
    </div>
  )
}

export default withRouter(UserComponent);
