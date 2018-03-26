// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
   .use(express.static('public'))
   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
   
   // Create the WebSockets server
   const wss = new SocketServer({ server });

   //Generates a random color for the username
   const randomColor = function() {
     let hex = '0123456789ABCDEF';
     let color = '#';
     for(let i = 0; i < 6; i++) {
      color += hex.charAt(Math.floor(Math.random() * 16));
     }
     return color;
   }

   //Checks if message contains a URL
   function checkURL(url) {
     let match = url.match(/\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/);
     //returns only the URL from the match if there is one
     if(match != null) match = match[0];
     return match;
}

   // Set up a callback that will run when a client connects to the server
   // When a client connects they are assigned a socket, represented by
   // the ws parameter in the callback.
   wss.on('connection', (ws) => {
    let usercolor = randomColor();
    ws.username = 'Anonymous';
    //on broadcast, we send a message to all the clients connected
    wss.broadcast = function broadcast(messageJSON) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageJSON));
          }
      });
    };
  console.log('Client connected');
  //when we recieve a message from the client, we add a UUID and a color which is 
  //generated on user connection.
  ws.on('message', function incoming(message) {
    let messageJSON = JSON.parse(message);
    messageJSON.id = uuidv4();
    messageJSON.color = usercolor;
    let url = checkURL(messageJSON.content);
    messageJSON.url = url;
    if(messageJSON.type === 'postMessage') {
        messageJSON.type = 'incomingMessage'
    } else if (messageJSON.type === 'postNotification') {
        ws.username = messageJSON.updatedUsername;
        messageJSON.type = 'incomingNotification';
        messageJSON.username = null;
    }
      wss.broadcast(messageJSON);
  });
  //Everytime a user connects, we send a notifcation to display how many users are connected.
  let usersOnline = {type: 'incomingUserCount', content:`Anonymous user connected! ${wss.clients.size} user(s) online.`, id: uuidv4(), usersOnline: wss.clients.size}
  wss.broadcast(usersOnline);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
   //Everytime a user disconnects, we send a notifcation to display how many users are connected.
  ws.on('close', () => {
    console.log('Client disconnected');
    let usersOnline = {type: 'incomingUserCount', content:`User ${ws.username} disconnected. ${wss.clients.size} user(s) online.`, id: uuidv4(), usersOnline: wss.clients.size}
    wss.broadcast(usersOnline);
  })

  ws.on('error', () => console.log('errored'));
});