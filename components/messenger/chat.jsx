import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io("http://localhost:3002");
import { useRouter } from "next/router";
import "../../app/globals.css";
const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = useSelector((state) => state?.user?.user?.username);
  const router = useRouter();
  console.log(router);
  const user_chat_group_id = router.query?.id;
  console.log("this is user_chat group id");
  console.log(user_chat_group_id);
  const chat_group_id = router.query?.chat_group_id;
  console.log(chat_group_id);

  const chatContainerRef = useRef(null);
  const handleNewMessage = (msg) => {
    const usernameRegex = /^[^:]+:/; // Regex to match the username at the beginning of the message
    const usernameMatch = msg.message.match(usernameRegex);
    const username = usernameMatch ? usernameMatch[0].slice(0, -1).trim() : ""; // Extract the username
    const messageContent = usernameMatch
      ? msg.message.replace(usernameRegex, "").trim()
      : msg.message; // Remove the username from the message text
    const formattedMessage = {
      message: messageContent,
      username: username,
    };
    setMessages((prevMessages) => [...prevMessages, formattedMessage]);
    // Scroll to the bottom of the chat container
    // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    console.log("messages after setMessage");
    console.log(messages);
  };
  useEffect(() => {
    const fetchMessages = async (chat_group_id) => {
      try {
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/messenger/message/message/?chat_group_id=${chat_group_id}`
        );
        console.log(resp.data);

        console.log("fetch messages is called ok done ");
        console.log(chat_group_id);
        setMessages(resp.data);
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages(chat_group_id);
    // Attach chat message event listener
    socket.on("chat message", handleNewMessage);
    return () => {
      // Unsubscribe from chat message event when component unmounts
      socket.off("chat message", handleNewMessage);
    };
  }, [chat_group_id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message && user_chat_group_id) {
      try {
        const resp = await axios.post(
          `http://localhost:3000/api/messenger/message/message?user_chat_group_id=${user_chat_group_id}`,
          {
            message: message,
          }
        );
        // Emit a 'chat message' event to the server
        socket.emit("chat message", {
          message: `${username} : ${message}`,
          chat_group_id,
        });
        setMessage("");
        console.log(resp.data);
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // Scroll to the bottom of the chat container
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center  flex-col w-full  messagesListHeight">
      <div className="flex-1 items-center flex justify-center w-full overflow-y-auto">
        <ul className="space-y-2 mt-8">
          {messages?.length > 0 ? (
            messages?.map((message, index) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-2">{message?.username}: </span>
                <span>{message?.message}</span>
              </li>
            ))
          ) : (
            <div>
              <span className="text-2xl">
                No message to show.start converstation
              </span>
            </div>
          )}
        </ul>
      </div>
      <div className=" rounded-lg flex  items-center justify-center w-full  p-4">
        <form className="flex flex-col w-96 gap-2">
          <textarea
            type="text"
            className="flex-grow  h-24 p-2 px-2  py-1 mr-2 border border-gray-300 rounded"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
