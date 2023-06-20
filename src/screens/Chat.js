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
  const [currentChat, setCurrentChat] = useState(undefined);//คนที่เราเลือกสนทนา

  // const [currentUser, setCurrentUser] = useState(undefined);

  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3333/index", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      if (data.status === "ok") {
        setUserdata(data.users[0]);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (userdata) {
      socket.current = io("http://localhost:3333");
      socket.current.emit("add-user", userdata.id);
    }

    try {
      axios.get(
        `http://localhost:3333/allchat/${userdata.id}`
      ).then((response) => {
        setContacts(response.data);//แสดงผลคนที่เราสามารถแชทด้วยได้ทั้งหมด
      })
    } catch (error) {
      // Handle error
      console.log('catch');
    }

  }, [userdata]);

  // useEffect(async () => {
  //   if (userdata) {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3333/allchat/${userdata.id}`
  //       );
  //       // console.log();
  //       setContacts(response.data);
  //     } catch (error) {
  //       // Handle error
  //       console.log('error');
  //     }
  //   } else {
  //     navigate("#");
  //   }
  // }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            changeChat={handleChatChange}
            userdata={userdata}
          />
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
