// collaborative-doc-editor-server/index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("text-update", (data) => {
    // Broadcast the text update to all connected clients except the sender
    socket.broadcast.emit("text-update", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const cors = require("cors");

let allowedOrigins = [
  "http://localhost:5173",
  "https://language-learning-game-five.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
