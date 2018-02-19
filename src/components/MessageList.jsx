import React, { Component } from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class MessageList extends Component {
    componentDidUpdate() {
        const elem = ReactDOM.findDOMNode(this.refs.messages);
        if(elem) {
            elem.scrollIntoView(false);
        }
    }
  render() {
      const messages = this.props.messages.map((message) => {
          return (
              <Message messageInfo={message} key={message.id}/>
            )
        })
    return (
        <main ref='messages' className='messages'>
            {messages}
        </main>
    );
  }
}


MessageList.propTypes = {
    messages: PropTypes.array
};