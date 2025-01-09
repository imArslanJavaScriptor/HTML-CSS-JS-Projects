const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, ".")));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Broadcast incoming messages
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  // Notify when a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
