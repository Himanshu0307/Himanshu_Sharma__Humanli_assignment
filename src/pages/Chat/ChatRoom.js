import { useState, useEffect, useRef, useContext } from "react";

import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";
import { getAllMessagesFromRoomId } from "../../api/chat";
import { ToastCTx } from "../../context/ToastProvider";
import Spinner from "../../components/Spinner";

export default function ChatRoom({ currentRoom, currentUser, socket, receiver }) {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { error } = useContext(ToastCTx);

  const scrollRef = useRef();

  //  get Mesages
  useEffect(() => {
    setLoading((x) => true)
    getAllMessagesFromRoomId(currentRoom).then(res => {
      var messages = res.data.data
      setMessages(messages);
    }, (err) => {
      error("Failed to fetch data")
    }).finally(() => {
      setLoading(false)
    })
  }, [currentRoom, error]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        senderId: data.senderId,
        message: data.message,
      });
    });
  }, [socket]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    var messageBody = { message, createdAt: Date.now(), sender: currentUser.email, receiver: receiver.email }
    socket.current?.emit("sendMessage", messageBody)
  };

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          {/* <Contact chatRoom={currentChat} currentUser={currentUser} /> */}
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {isLoading ? <Spinner /> : messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser.email} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
