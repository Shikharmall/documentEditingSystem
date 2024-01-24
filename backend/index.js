/*

D0YetokoWskaiRqM
shmall212020

*/

var express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const cookieParser = require("cookie-parser");

const app = express();

const server = createServer(app);

let allowedOrigins = ["http://localhost:5173","https://document-editing-system.vercel.app"];

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: allowedOrigins,
  },
});

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

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const userRoutes = require("./routes/userRoute");
const documentRoutes = require("./routes/documentRoute");
const { editDocument } = require("./controllers/Document/documentController");

app.use("/", userRoutes);
app.use("/", documentRoutes);

//app.listen(port);

io.on("connection", async (socket) => {
  //console.log("User connected:", socket.id);

  socket.on("text-update", (data) => {
    // Broadcast the text update to all connected clients except the sender
    socket.broadcast.emit("text-update", data);
  });

  /*socket.on('saveData', async (data) => {
    try {
      const savedData = await editDocument(data);
      io.emit('broadcastData', savedData);
    } catch (error) {
      // Handle error if needed
    }
  });*/

  socket.on("disconnect", () => {
    //console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
