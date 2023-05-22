import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../css/chat.css";

const socket = io("http://localhost:3333"); // เปลี่ยน URL เป็น URL ของเซิร์ฟเวอร์ Node.js ที่คุณใช้

const ChatContainer = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

// useEffect(() => {
//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });
// }, []);


  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", message);
    setMessage("");
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>

  );
};

export default ChatContainer;
