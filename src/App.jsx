import React, {Component} from 'react';
import ChatBar from './components/ChatBar.jsx'
import MessageList from './components/MessageList.jsx'
import NavBar from './components/NavBar.jsx'
import ReactDOM from 'react-dom'
const defaultState = {
  defaultValue: {name: 'Anonymous'},
  messages: [],
  userCount: 0
};

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
    const newMessage = {type: 'postMessage', username: message.username, content: message.inputValue};
    if(this.state.defaultValue.name !== newMessage.username) {
      const newNotification = {type: 'postNotification', content:`${this.state.defaultValue.name} has changed their name to ${newMessage.username}`, updatedUsername: newMessage.username};
      this.sendMessage(newNotification);
      this.setState({defaultValue: {name: newMessage.username}, messages: this.state.messages});
    }
      this.sendMessage(newMessage);
  }

  //when we recieve a message to the server, we update the state to contain
  //this new message.
  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected to server!');
    }

    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const allMessages = oldMessages.concat(newMessage);
      if(newMessage.type === 'incomingUserCount') {
        this.setState({messages: allMessages, userCount: newMessage.usersOnline})
      } else {
        this.setState({messages: allMessages});
      }
    }

    this.socket.onclose = () => {
      console.log('closed');
    }
  }
  componentDidUpdate() {
    const elem = ReactDOM.findDOMNode(this.refs.wrappermes);
    if(elem) {
      //Allows for scrolling to bottom of wrapperMessages div
        elem.scrollIntoView({block: 'end'});
        //needed to push the messages viewport above the footer!
        elem.scrollTop += 63;
    }
}
  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <div className='wrapperMessages' ref='wrappermes'>
        <MessageList messages={this.state.messages}/>
        </div>
        <ChatBar defaultValue={this.state.defaultValue.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
