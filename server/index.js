const express = require("express");
const socket = require("socket.io");

const app = express();

const server = app.listen(3000, () => {
  console.log("Server started in 3000");
});

const io = socket(server, {
  cors: { origin: "*" },
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
  });
});

// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });
