import { useContext, useEffect, useRef, useState } from "react";

import {
  initiateSocketConnection,
} from "../../services/ChatService";
import useAuth from "../../hooks/useAuth";
import ChatRoom from "../chat/ChatRoom";
import { ToastCTx } from '../../context/ToastProvider'
import Welcome from "../chat/Welcome";
import AllUsers from "../chat/AllUsers";
import { getAllUser } from "../../api/user";
import getRommIdFromEmail from "../../utils/getRoomId";






export default function ChatLayout() {
  const [users, SetUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const chatUser = useRef()
  const [onlineUsersId, setonlineUsersId] = useState([]);
  const socket = useRef();
  const [currentUser] = useAuth();
  const { error } = useContext(ToastCTx)

  useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.emit("addUser", currentUser.email);
      socket.current.on("getUsers", (users) => {
        console.log("got Active user list", users)
        users = users.map(x => x[0])
        setonlineUsersId(users)
      });
    };

    getSocket();
  }, [currentUser.email]);



  useEffect(() => {
    getAllUser().then(data => {
      SetUsers(data.data.data);
    }, (er) => {
      error("Something went wrong")
    })

  }, [currentUser]);


  const handleChatRoom = (newuser) => {
    var chatRoom = getRommIdFromEmail(newuser.email, currentUser.email)
    chatUser.current = newuser
    setCurrentChat(chatRoom);
  };



  return (
    <div className="container mx-auto">
      <div className="min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
        <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">

          <AllUsers
            users={users}
            onlineUsersId={onlineUsersId}
            currentUser={currentUser}
            changeChat={handleChatRoom}
          />
        </div>

        {currentChat ? (
          <ChatRoom
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
            receiver={chatUser.current}
          />
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
}
