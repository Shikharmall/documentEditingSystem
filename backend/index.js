/*const express = require("express");

require("dotenv").config();

const port = process.env.PORT || 5174;

const mongoose = require("mongoose");

if (process.env.DATABASE === "MONGODBATLAS") {
  mongoose.connect(process.env.DATABASEURL);
  mongoose.connection.on("error", (err) => {
    console.log("Connection Failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected to MongoDB Atlas.");
  });
} else {
  console.log("No proper ENV.");
}

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

const userRoutes = require("./routes/userRoute");

app.use("/", userRoutes);

const cors = require("cors");

let allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/

/*

D0YetokoWskaiRqM
shmall212020

*/

var express = require("express");

const cookieParser = require("cookie-parser");
var app = express();

require("dotenv").config();

const port = process.env.PORT || 5174;

const mongoose = require("mongoose");

if (process.env.DATABASE === "MONGODBATLAS") {
  mongoose.connect(process.env.DATABASEURL);
  mongoose.connection.on("error", (err) => {
    console.log("Connection Failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected to MongoDB Atlas.");
  });
} else {
  console.log("No proper ENV.");
}

app.use(cookieParser());

app.use(express.json()); 

const cors = require("cors");

let allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const userRoutes = require("./routes/userRoute");

app.use("/", userRoutes);

app.listen(port);

