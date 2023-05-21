import "../css/chat.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
    // const [currentUser, setCurrentUser] = useState(undefined);

    const test = 0;

  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  console.log(userdata);

  useEffect(() => {
    //ดึงข้อมูลตัวเอง
    getUser();
  }, []);

  const getUser = async () => {
    await axios
      .get("http://localhost:3333/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
        }
      });
  };

  useEffect(() => {
    //เกี่ยวกับการแชท
    if (userdata) {
      socket.current = io("http://localhost:3333");
      socket.current.emit("add-user", userdata.id);
    }
  }, [userdata]);

  useEffect(async () => {
    //ดึงข้อมูลของคนที่เราฟอลทั้งหมด
    if (userdata) {
      const data = await axios.get(
        `http://localhost:3333/allchat/${userdata.id}`
      );
      setContacts(data.data);
    } else {
      navigate("#");
    }
  }, [userdata]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
