require("dotenv").config();
var express = require('express');
var userRouter = require('./controller/user');
var cors = require('cors');
const { Server } = require("socket.io");
const { createMessage, getAllMessage } = require("./concrete/chatConcrete");
const chatRouter = require("./controller/chat");
const getRommIdFromEmail = require("./util/getRoomId");

var app = express();
app.use(cors())
app.use(express.json());


app.use('/user', userRouter)
app.use('/chat', chatRouter)




var server = app.listen(5001, () => {
  console.log("App running on port 5001 ")
})

var socketIo = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})


global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

socketIo.on("connection", (socket) => {

  // global.chatSocket = socket;

  socket.on("addUser", (userId) => {
    global.onlineUsers.set(userId, socket.id);
    console.log("Added User", userId)
    socket.emit("getUsers", Array.from(global.onlineUsers));
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message, createdAt }) => {
    const roomId = getRommIdFromEmail(receiverId, senderId)
    const sendUserSocket = global.onlineUsers.get(roomId);
    console.log("message Created on api ", message)
    // Save Messsage
    if (await createMessage(roomId, { senderId, receiverId, message, createdAt }))
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("getMessage", {
          senderId,
          message,
        });
      }
  });

  socket.on("disconnect", () => {
    global.onlineUsers.delete(getKey(global.onlineUsers, socket.id));
    console.log("removed user", global.onlineUsers)
    socket.emit("getUsers", Array.from(global.onlineUsers));
  });




});

