import React, {Component} from 'react';
import ChatBar from './components/ChatBar.jsx'
import MessageList from './components/MessageList.jsx'
import NavBar from './components/NavBar.jsx'

const defaultState = {
  username: {name: 'Anonymous'},
  messages: []
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  componentDidMount() {
    this.setState({
      username:{name: 'Anonymous'},
      messages: [{username: 'Albert', content: 'hello world!', key: '1'}]
    })
  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar defaultValue={this.state.username.name}/>
      </div>
    );
  }
}
export default App;
