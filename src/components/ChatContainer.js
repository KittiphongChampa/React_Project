import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userid, setUserid] = useState([]);

  console.log(arrivalMessage);

  // useEffect(async () => {
  //   const data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   const response = await axios.post(recieveMessageRoute, {
  //     from: data._id,
  //     to: currentChat._id,
  //   });
  //   setMessages(response.data);
  // }, [currentChat]);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3333/index", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = response.data;
        if (data.status === "ok") {
          setUserid(data.users[0].id);
        }else{
          console.log('เข้า else');
        }
        const getChatdata = await axios.post("http://localhost:3333/messages/getmsg", {
            from: data.users[0].id,
            to: currentChat.id,
        }).then((response) => {
          const data = response.data
          setMessages(data);
        })
        // setMessages(getChatdata.data);
      } catch (error) {
        // Handle error
        console.log('catch');
      }
    };
    getUser();
  }, [currentChat]);


  // useEffect(() => {
  //   const getCurrentChat = async () => {
  //     if (currentChat) {
  //       // await JSON.parse(
  //       //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       // )._id;
  //       const response = await axios.get("http://localhost:3333/index", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       const data = response.data;
  //       if (data.status === "ok") {

  //       }
  //     }
  //   };
  //   getCurrentChat();
  // }, [currentChat]);

  const handleSendMsg = async (msg) => {
    //ข้อความถูกส่งมาที่นี่

    socket.current.emit("send-msg", {
      to: currentChat.id,
      from: userid,
      msg,
    });

    await axios.post("http://localhost:3333/messages/addmsg", {
      from: userid,
      to: currentChat.id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={currentChat.urs_profile_img}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.urs_name}</h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;