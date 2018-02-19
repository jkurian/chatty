import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {inputValue: '', username: props.defaultValue}
  }
  render() {
    const messageOnChange = (evt) => {
      this.setState({inputValue: evt.target.value, username: this.state.username})
    }
    const nameOnChange = (evt) => {
      this.setState({inputValue: this.state.inputValue, username: evt.target.value})
    }
    return (
    <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={nameOnChange} value={this.state.username}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={messageOnChange} value={this.state.inputValue}/>
    </footer>
    );
  }
}
