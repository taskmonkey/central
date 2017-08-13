import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import NavTask from '../Dashboard/NavTask.jsx';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import $ from 'jquery';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', message => {
      let newMessage = {
        body: message.body.body,
        username: message.body.username.nickname,
        picture: message.body.username.image,
      }
      this.state.messages.push(newMessage)
      this.forceUpdate();
    });
    $(".chatInputButton").click(function() {
      $(".messagesContainer").animate({ scrollTop: $(".messagesContainer").height() + 500 }, "slow");
    });
    $(document).keypress(function(e) {
      if(e.which == 13) {
        $(".messagesContainer").animate({ scrollTop: $(".messagesContainer").height() + 500 }, "slow");
      }
    });
  }

  submitMessage() {
    const body = $('.chatInput').val();
    if (body) {
      const message = {
        body,
        username: 'Me',
        picture: this.props.profile.image,
      }
      this.state.messages.push(message)
      this.forceUpdate();
      this.socket.emit('message', {body, username: this.props.profile})
      $('.chatInput').val('');
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      console.log('message', message)
      return <ul className="chatMessageContainer" key={index}>
        <div className="chatImageContainer"><img className="chatImageContainerImage" src={message.picture}></img></div>
        <div className="message"><b>{message.username + ' : '}</b>{message.body}</div></ul>
    })
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        <div className="chatContainer">
					<div className="dashboard-title">
						<h1 className="pull-left">Chat</h1>
					</div>
          <div className="chatListContainer">
            <div className="messagesContainer">
               {messages}
            </div>
            <div>
              <input className="chatInput" type="text" placeholder='Enter a message...' onKeyPress={(e) => {if(e.key === 'Enter') {this.submitMessage()}}}></input>
              <button className="chatInputButton" onClick={this.submitMessage}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      profile: state.tasks.profile
    }
}

export default connect(mapStateToProps)(Chat);
