import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    if(this.props.messageInfo.type === 'incomingMessage') {
      let styles = {
        color: this.props.messageInfo.color
      }
      return (
        <div>
          <div className="message">
          <span className="message-username" style={styles} >{this.props.messageInfo.username}</span>
          <span className="message-content">{this.props.messageInfo.content}</span>
      </div>
        </div>
      );
    } else if(this.props.messageInfo.type === 'incomingNotification') {
      return (
      <div className="message system">
        {this.props.messageInfo.content}
      </div>
      )
    }
  }
}
