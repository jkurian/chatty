import React, {Component} from 'react';
import ChatBar from './components/ChatBar.jsx'
import MessageList from './components/MessageList.jsx'
import NavBar from './components/NavBar.jsx'

const defaultState = {
  defaultValue: {name: 'Anonymous'},
  messages: []
}

class App extends Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.state = defaultState;
  }
  addMessage(message) {
    const oldMessages = this.state.messages;
    const newMessage = {username: message.username, content: message.inputValue, key:'1'}
    const allMessages = oldMessages.concat(newMessage);
    this.setState({messages: allMessages})
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar defaultValue={this.state.defaultValue.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
