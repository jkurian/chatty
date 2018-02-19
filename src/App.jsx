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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.socket = new WebSocket("ws:localhost:3001", "protocolOne");
  }
  sendMessage(message) {
    this.socket.send(JSON.stringify(message));
  }
  addMessage(message) {
    const newMessage = {username: message.username, content: message.inputValue}
    this.sendMessage(newMessage)
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to server!')
    }

    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const allMessages = oldMessages.concat(newMessage);
      this.setState({messages: allMessages})
    }
    
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
