require("dotenv").config();
var express = require('express');
var userRouter = require('./controller/user');
var cors=require('cors');
const { Server } = require("socket.io");
const { createMessage ,getAllMessage} = require("./concrete/chatConcrete");

var app = express();
app.use(cors())
app.use(express.json());


app.use('/user',userRouter)




var server=app.listen(5001,()=>{
  console.log("App running on port 5001 ")
})

var socketIo=new Server(server,{cors: {
  origin: "http://localhost:3000",
  credentials: false,
},})


global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

socketIo.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("addUser", (userId) => {
    global.onlineUsers.set(userId, socket.id);
    socket.emit("getUsers", Array.from(global.onlineUsers));
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const sendUserSocket = global.onlineUsers.get(receiverId);
    // Save Messsage
    createMessage()
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("getMessage", {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    global.onlineUsers.delete(getKey(global.onlineUsers, socket.id));
    socket.emit("getUsers", Array.from(global.onlineUsers));
  });
});

// createMessage("sdfsdfsdf",{message:"Asdasd",createdAt:Date.now(),sender:'asdasd',receiver:'sdfsdfdf'})
createMessage("sdfsdfsdf",{
  message: 'Hello, this is a test message.',
  createdAt: new Date().toISOString(),
  sender: 'user123',
  receiver: 'friend456'
});