const express = require('express');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const cors = require('cors');
const route = require('./route/index');
const connectDB = require('./config/connect');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ChatBot = require('./utils/ChatBot');
const path = require('path');
const connection = require("./config/connect.js");
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_CLIENT,
    },
});

app.use(cookieParser());
app.use(cors({ origin:  process.env.CORS_CLIENT, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));
route(app);
app.use(express.static('uploads'));
connectDB();

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);

        ChatBot(message, io);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



const startServer = async () => {
  try {
    await connection();
    console.log("Connected successfully to DB");
    server.listen(port, hostname, () => {
      console.log(`App listening at http://${hostname}:${port}`);
    });
  } catch (error) {
    console.log("Error connecting to DB:", error);
  }
};

startServer();
