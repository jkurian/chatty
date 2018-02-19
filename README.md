# Chatty Project
* A client-side SPA (single-page app) built with ReactJS, Webpack, Babel, Node.js and Web Sockets. 
* No data is persisted, focus is on client-side experience. 
* This app communicates with a server with Web Scokets and provides real-time updates. 

## Final Product

!["demo of chatty app"](/docs/chatty-full-demo.gif)

### Dependencies

* react
* react-dom
* prop-types
* express
* uuid 
* ws

### Dev-Dependencies
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server

* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Getting Started

1. Clone this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command in the root directory. The app will be served at <http://localhost:3000/>.
4. Run the chatty-server using the `npm start` in the chatty-server directory.
5. Go to <http://localhost:3000/> in your browser.\
6. Open multiple connections in different tabs at <http://localhost:3000/> and chat real time!