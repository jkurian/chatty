import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  render() {
    let styles = {
      color: this.props.messageInfo.color
    }
    if(this.props.messageInfo.type === 'incomingMessage' && this.props.messageInfo.url) {
      return (
        <div>
          <div className="message">
            <span className="message-username" style={styles} >{this.props.messageInfo.username}</span>
            <span className="message-content">
            <div>{this.props.messageInfo.content}</div>
            <div><img src={this.props.messageInfo.url} /></div>
          </span>
         </div>
        </div>
      );
    } else if (this.props.messageInfo.type === 'incomingMessage' && !this.props.messageInfo.url) {
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

Message.propTypes = {
  messageInfo: PropTypes.object
};
