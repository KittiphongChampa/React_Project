// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import ChatInput from "./ChatInput";
// // import Logout from "./Logout";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import "../css/chat.css";
// // import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

// export default function ChatContainer({ currentChat, socket }) {
//   const token = localStorage.getItem("token");
//   const [userid, setUserid] = useState();
//   const [messages, setMessages] = useState([]);
//   const scrollRef = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   // console.log(arrivalMessage);

//   const date = new Date();
//   const date_now = date.toLocaleDateString('th-TH', {
//     hour: "2-digit",
//     minute: "2-digit",
//   })
//   const timestamp_chat = date_now.split(" ")[1];
//   // const timestamp_chat = date_now;

//   //   const data = await JSON.parse(
//   //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//   //   );
//   //   const response = await axios.post(recieveMessageRoute, {
//   //     from: data._id,
//   //     to: currentChat._id,
//   //   });
//   //   setMessages(response.data);
//   // }, [currentChat]);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:3333/index", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         const data = response.data;
//         if (data.status === "ok") {
//           setUserid(data.users[0].id);
//         } else {
//           console.log("เข้า else");
//         }
//         const getChatdata = await axios.post(
//           "http://localhost:3333/messages/getmsg",
//           {
//             from: data.users[0].id,
//             to: currentChat.id,
//           }
//         );
//         setMessages(getChatdata.data);
//       } catch (error) {
//         console.log("catch", error);
//       }
//     };
//     getUser();
//   }, [currentChat, token]);

//   const handleSendMsg = async (msg) => { //รับค่ามาจากอีกหน้า+ส่งแชทและแสดงผลแชทบนหน้าจอ
//     socket.current.emit("send-msg", {
//       to: currentChat.id,
//       from: userid,
//       msg,
//       timestamp_chat,
//     });
//     await axios.post("http://localhost:3333/messages/addmsg", {
//       from: userid,
//       to: currentChat.id,
//       message: msg,
//     })
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { fromSelf: true, message: msg, timestamp_chat: timestamp_chat, },
//     ]);
//   };
  
//   const handleSendImage = async (image) => {
//     const formData = new FormData();
//     formData.append("from", userid);
//     formData.append("to", currentChat.id);
//     formData.append("image", image);
//     console.log(formData);
//     await axios.post("http://localhost:3333/messages/addmsg", formData, {

//     }).then((response) => {
//       const data = response.data;
//       let msg = data.image_chat;
//       socket.current.emit("send-msg", {
//         to: currentChat.id,
//         from: userid,
//         msg,
//         timestamp_chat,
//       });
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { fromSelf: true, message: msg, timestamp_chat: timestamp_chat, },
//       ]);
//     })
//   }

//   useEffect(() => {//รับข้อความ
//     if (socket.current) {
//       socket.current.on("msg-receive", (msg) => {
//         console.log('Received message:', msg);
//         setArrivalMessage({ fromSelf: false, message: msg , timestamp_chat: timestamp_chat, });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ block: "end" }); // เลื่อนมุมมองไปยังตำแหน่งสุดท้ายของข้อความทั้งหมด
//   }, [messages]);
  

//   return (
//     <Container>
//       <div className="chat-header">
//         <div className="user-details">
//           <div className="avatar">
//             <img
//               src={currentChat.urs_profile_img}
//               alt=""
//             />
//           </div>
//           <div className="username">
//             <h3>{currentChat.urs_name}</h3>
//           </div>
//         </div>
//       </div>

//       <div className="chat-messages">
//         {messages.map((message) => {
//           return (
//             <div ref={scrollRef} key={uuidv4()}>
//               {message.fromSelf ? (
//                 <div className="message sended">
//                   <div className="sending_time">
//                     <span>
//                       {new Date(message.created_at).toLocaleString("th-TH", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }) !== "Invalid Date" ? (
//                         <span>
//                           {new Date(message.created_at).toLocaleString("th-TH", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       ) : (
//                         <span>{message.timestamp_chat}</span>
//                       )}
//                     </span>
//                   </div>

//                   <div className="content">
//                     {message.message.split("images")[0] === "http://localhost:3333/" ? (
//                       <img src={message.message} width={100} />
//                     ) : (
//                       <p>{message.message}</p>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="message recieved">
//                   <div className="content">
//                     {message.message.split("images")[0] === "http://localhost:3333/" ? (
//                       <img src={message.message} width={100} />
//                     ) : (
//                       <p>{message.message}</p>
//                     )}
//                   </div>
//                   <div className="sending_time">
//                     <span>
//                       {new Date(message.created_at).toLocaleString("th-TH", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }) !== "Invalid Date" ? (
//                         <span>
//                           {new Date(message.created_at).toLocaleString("th-TH", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       ) : (
//                         <span>{message.timestamp_chat}</span>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <ChatInput handleSendMsg={handleSendMsg} handleSendImage={handleSendImage} />
//     </Container>
//   );
// }

// const Container = styled.div
// `
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
// `
// ;



import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../css/chat.css";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import * as Icon from "react-feather";
import * as ggIcon from "@mui/icons-material";
import "../styles/main.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ChatContainer({ currentChat, socket }) {
  const token = localStorage.getItem("token");
  const [userid, setUserid] = useState();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // console.log(arrivalMessage);

  const date = new Date();
  const date_now = date.toLocaleDateString('th-TH', {
    hour: "2-digit",
    minute: "2-digit",
  })
  const timestamp_chat = date_now.split(" ")[1];
  // const timestamp_chat = date_now;

  //   const data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   const response = await axios.post(recieveMessageRoute, {
  //     from: data._id,
  //     to: currentChat._id,
  //   });
  //   setMessages(response.data);
  // }, [currentChat]);

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

  const handleSendMsg = async (msg) => { //รับค่ามาจากอีกหน้า+ส่งแชทและแสดงผลแชทบนหน้าจอ
    socket.current.emit("send-msg", {
      to: currentChat.id,
      from: userid,
      msg,
      timestamp_chat,
    });
    await axios.post("http://localhost:3333/messages/addmsg", {
      from: userid,
      to: currentChat.id,
      message: msg,
    })
    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg, timestamp_chat: timestamp_chat, },
    ]);
  };
  
  const handleSendImage = async (image) => {
    const formData = new FormData();
    formData.append("from", userid);
    formData.append("to", currentChat.id);
    formData.append("image", image);
    console.log(formData);
    await axios.post("http://localhost:3333/messages/addmsg", formData, {

    }).then((response) => {
      const data = response.data;
      let msg = data.image_chat;
      socket.current.emit("send-msg", {
        to: currentChat.id,
        from: userid,
        msg,
        timestamp_chat,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { fromSelf: true, message: msg, timestamp_chat: timestamp_chat, },
      ]);
    })
  }

  useEffect(() => {//รับข้อความ
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log('Received message:', msg);
        setArrivalMessage({ fromSelf: false, message: msg , timestamp_chat: timestamp_chat, });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" }); // เลื่อนมุมมองไปยังตำแหน่งสุดท้ายของข้อความทั้งหมด
  }, [messages]);
  

  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [previewUrl, setPreviewUrl] = useState("");


  const [form_image, setForm_image] = useState(false);
  const Close_form_image = () => {
    setPreviewUrl(null);
    setForm_image(false);
  };
  const openModal = () => setForm_image(true);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    } else {
      // console.log(image);
      handleSendImage(image);
    }
  };

  return (
    <>
      <div className="chat-header">
        <div className="chat-name">
          <img src={currentChat.urs_profile_img}></img>
          <div>
            <p>Full color by boobii : bust-up full color</p>
            <p>สั่งโดย {currentChat.urs_name}</p>
          </div>
        </div>
        <div className="status-chat-header">
          <p>คิว1</p>
          <p>รอจ่ายเงิน</p>
        </div>
        <p className="menu-icon-chat">
          <Icon.Menu className="" />
        </p>
      </div>

      <div className="chat">
        {messages.map((message) => {
          return (
            <div className="user-message" ref={scrollRef} key={uuidv4()}>
              {message.fromSelf ? (
                <>
                  <div className="my-message">
                    {/* <div>{message.message}</div> */}
                    {message.message.split("images")[0] === "http://localhost:3333/" ? (
                      <img src={message.message} width={100} />
                    ) : (
                      <div>{message.message}</div>
                    )}
                  </div>

                  {/* <p className="time-sent">
                    <span>
                      {new Date(message.created_at).toLocaleString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) !== "Invalid Date" ? (
                        <span>
                          {new Date(message.created_at).toLocaleString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      ) : (
                        <span>{message.timestamp_chat}</span>
                      )}
                    </span>
                  </p> */}
                </>
              ) : (
                <>
                  <div className="their-message">
                    {/* <div>{message.message}</div> */}
                    {message.message.split("images")[0] === "http://localhost:3333/" ? (
                      <img src={message.message} width={100} />
                    ) : (
                      <div>{message.message}</div>
                    )}
                  </div>
            

                  {/* <p className="time-sent">
                    <span>
                    {new Date(message.created_at).toLocaleString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) !== "Invalid Date" ? (
                      <span>
                        {new Date(message.created_at).toLocaleString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    ) : (
                      <span>{message.timestamp_chat}</span>
                    )}
                  </span>
                  </p> */}
                </>
              )}
            </div>
          );
        })}

        {/* <div ref={chat}></div> */}
      </div>

      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <div className="chat-sender" >
          <Icon.Plus className="plus-icon" onClick={openModal}/>
          <input
            type="text"
            placeholder="พิมพ์ข้อความ..."
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          ></input>
          <button type="submit">
            <Icon.Send className="send-icon" />
          </button>
        </div>
      </form>
      <Modal show={form_image} onHide={Close_form_image} size="lg" centered>
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            เลือกรูปภาพ
          </Modal.Title>
        </Modal.Header> */}
        <div class="d-flex justify-content-center mt-3">
          <h5>เลือกรูปภาพ</h5>
        </div>
        <Modal.Body class="d-flex justify-content-center">
          <form
            id="sendImage"
            onClick={() => document.querySelector(".input-field").click()}
            className="dragNdrop"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onSubmit={(event) => sendChat(event)}
          >
            <input
              type="file"
              accept="image/png ,image/gif ,image/jpeg"
              className="input-field"
              hidden
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files) {
                  setImage(files[0]);
                  setPreviewUrl(URL.createObjectURL(files[0]));
                }
              }}
            />
            {previewUrl ? (
              <img src={previewUrl} alt={fileName} className="imagePreview" />
            ) : (
              <h4>Drop images here</h4>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={Close_form_image}>Close</Button>
          <Button variant="primary" type="submit" form="sendImage" onClick={Close_form_image}>Send</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}