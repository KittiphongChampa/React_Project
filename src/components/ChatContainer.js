import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../css/chat.css";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  // console.log(socket.current.on);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  // console.log(arrivalMessage);
  const [userid, setUserid] = useState();
  const token = localStorage.getItem("token");

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

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3333/index", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       const data = response.data;
  //       if (data.status === "ok") {
  //         setUserid(data.users[0].id);
  //       }else{
  //         console.log('เข้า else');
  //       }
  //       const getChatdata = await axios.post("http://localhost:3333/messages/getmsg", {
  //           from: data.users[0].id,
  //           to: currentChat.id,
  //       }).then((response) => {
  //         const data = response.data
  //         setMessages(data);
  //       })
  //       // setMessages(getChatdata.data);
  //     } catch (error) {
  //       // Handle error
  //       console.log('catch');
  //     }
  //   };
  //   getUser();
  // }, [currentChat]);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // const handleSendMsg = async (msg) => {
  //   //ข้อความถูกส่งมาที่นี่
  //   socket.current.emit("send-msg", {
  //     to: currentChat.id,
  //     from: userid,
  //     msg,
  //   });

  //   await axios.post("http://localhost:3333/messages/addmsg", {
  //     from: userid,
  //     to: currentChat.id,
  //     message: msg,
  //   });

  //   // const msgs = [...messages];
  //   // msgs.push({ fromSelf: true, message: msg });
  //   // setMessages(msgs);
  //   setMessages(prevMessages => [
  //     ...prevMessages,
  //     { fromSelf: true, message: msg },
  //   ]);
  // };

  const handleSendMsg = async (msg) => { //ส่งแชทและแสดงผลแชทบนหน้าจอ
    socket.current.emit("send-msg", {
      to: currentChat.id,
      from: userid,
      msg,
    });
  
    await axios.post("http://localhost:3333/messages/addmsg", {
      from: userid,
      to: currentChat.id,
      message: msg,
    })
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg },
    ]);
  };

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
        } else {
          console.log("เข้า else");
        }
        const getChatdata = await axios.post(
          "http://localhost:3333/messages/getmsg",
          {
            from: data.users[0].id,
            to: currentChat.id,
          }
        );
        setMessages(getChatdata.data);
      } catch (error) {
        console.log("catch", error);
      }
    };
    getUser();
  }, [currentChat, token]);
  
  useEffect(() => { //รับแชทและแสดงผลแชทบนหน้าจอ
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        console.log('Received message:', msg);
        // ทำอะไรกับข้อความที่รับมาเมื่อแชทถูกส่งไปที่คอมโพเนนต์นี้
        setMessages((prev) => [...prev, messages]);
        // setArrivalMessage({ fromSelf: false, message: msg });
      });
    }else {
      console.log('ไม่ทำงาน');
    }
  }, [socket]);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  useEffect(() => {
    // setMessages((prev) => [...prev, messages]);
    // setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollRef.current?.scrollIntoView({ block: "end" }); // เลื่อนมุมมองไปยังตำแหน่งสุดท้ายของข้อความทั้งหมด
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
      {/* <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div>
                  <p>
                    {new Date(message.created_at).toLocaleString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              {message.fromSelf ? (
                <div className="message sended">
                  <div className="sending_time">
                    <p>
                      {new Date(message.created_at).toLocaleString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              ) : (
                <div className="message recieved">
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                  <div className="sending_time">
                    <p>
                      {new Date(message.created_at).toLocaleString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div
`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  } 
`
;