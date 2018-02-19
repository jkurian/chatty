import React, { Component } from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

export default class MessageList extends Component {
  render() {
      const messages = this.props.messages.map((message) => {
          return (
              <Message messageInfo={message} key={message.id}/>
            )
        })
    return (
        <main className='messages'>
            {messages}
        </main>
    );
  }
}


MessageList.propTypes = {
    messages: PropTypes.array
};