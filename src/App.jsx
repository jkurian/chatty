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
    //Since this is passed as a prop down MessageList, we have to bind it 
    //to this context
    this.addMessage = this.addMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    //connect to localhost:3001 with WebSocket
    this.socket = new WebSocket("ws:localhost:3001");
    //set the initial state for this app component
    this.state = defaultState;
  }
  //Sends a message to the server connected via socket
  sendMessage(message) {
    this.socket.send(JSON.stringify(message));
  }
  //Creates the message object from the server, either a notification or a message
  //If we recieve a notification, it means the user has changed their name
  //and therefor we send the notification and the message afterwards.
  addMessage(message) {
    const newMessage = {type: 'postMessage', username: message.username, content: message.inputValue}
    if(this.state.defaultValue.name !== newMessage.username) {
      const newNotification = {type: 'postNotification', content:`${this.state.defaultValue.name} has changed their name to ${newMessage.username}`}
      this.sendMessage(newNotification)
      this.state.defaultValue.name = newMessage.username
    }
      this.sendMessage(newMessage);
  }

  //when we recieve a message to the server, we update the state to contain
  //this new message.
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

    this.socket.onclose = (event) => {
      console.log('closed');
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
