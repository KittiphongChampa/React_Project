import React, { useState, useEffect, useRef, createElement } from "react";
import "../css/indexx.css";
// import "../css/recent_index.css";
// import '../styles/index.css';
import "../styles/main.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import * as ggIcon from "@mui/icons-material";
import "../css/chat.css";
import axios from "axios";
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { Modal, Button, Input, Select, Space, Upload, Flex, Radio, Card } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { host } from "../utils/api";
import { Link, useParams } from 'react-router-dom';

const title = "แชท";
// const bgImg = { backgroundImage: "url('mainmoon.jpg')", backgroundSize: " cover", backgroundOpacity: "0.5" }
const body = { backgroundImage: "url('seamoon.jpg')" };

export default function ChatBox() {
  const { Search } = Input;
  const chat = useRef(null);
  // const message = 'Contrary to popular belsssssssssssssssssssssadfe   grgegief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3'
  const [messages, setMessages] = useState([]);
  const [chatlist, setChatlist] = useState();
  const [activeChat, setActiveChat] = useState();
  // const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const chat_partner_id = queryParams.get("id");
  const chat_order_id = queryParams.get("od_id");

  const [partnerChat, setPartnerChat] = useState([]);
  // console.log(partnerChat.id);

  useEffect(() => {
    chat.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const [selectedChatType, setSelectedChatType] = useState(chat_order_id == 0 || chat_order_id == null || chat_order_id == undefined? "private" : "order");

  function menuChat(event, menu) {
    let oldSelected = document.querySelector("button.selected");
    oldSelected.classList.remove("selected");
    event.target.classList.add("selected");
    setSelectedChatType(menu)
  }

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };
  /*--------------------------------------------------------------------------------- */
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined); //คนที่เราเลือกสนทนา
  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);

  const getPartnerChat = async () => {
    await axios
      .get(`${host}/chat/partner/${chat_partner_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {

        setPartnerChat(response.data[0]);
        // setOrderId(chat_order_id)

        console.log("พาร์ทเนอร์แชท", partnerChat);

      });
  };
  const getUser = async () => {
    try {
      const response = await axios.get(`${host}/index`, {
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
    getPartnerChat();
    getUser();
  }, []);

  useEffect(() => {
    if (userdata) {
      socket.current = io(`${host}`);
      socket.current.emit("add-user", userdata.id);
    }
  }, [userdata]);

  useEffect(() => {
    try {
      axios
        .get(`${host}/allchat`,{
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setContacts(response.data); //แสดงผลคนที่เราสามารถแชทด้วยได้ทั้งหมด
        });
    } catch (error) {
      // Handle error
      console.log("catch");
    }
  }, [contacts])


  const handleChatChange = (chat) => {
    setPartnerChat(null);
    setCurrentChat(chat);
  };


  /*--------------------------------------------------------------------------------- */

  //หลังจากที่กดส่งคำขอจ้างไปแล้วจะขึ้น order id มาและขึ้นเป็นแชทใหม่ 
  //ตอนเรียง contact แยกด้วยการเช็คทั้ง userid และ od_id ถ้า od_id อันเดียวกันให้อยู่ด้วยกัน

  return (
    <div className="body-con">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <NavbarUser />
      <div style={{ display: "flex", height: "100%" }}>
        <div className="chatbox-container">
          {/* -----ดิฟ1 ฝั่งรายชื่อ ------*/}
          <div className="aside-chatbox">
            <div className="headding">
              <h1>แชท</h1>
            </div>
            
            
            <div className="menu-chat-grid">
              <div className="abc">
                <Flex>
                  <Search placeholder="ค้นหา..." allowClear size="large"/>
                  <Button type="text" icon={<FilterOutlined style={{color: "white"}} />}
                    ></Button>
                </Flex>
              </div>
              <div className="menu-chat">
                {/* <button
                  onClick={(event) => menuChat(event, "all")}
                  className="selected"
                >
                  {" "}
                  ทั้งหมด
                </button> */}
                <button className={selectedChatType=="private" && "selected"} onClick={(event) => menuChat(event, "private")}>
                  ส่วนตัว
                </button>
                <button className={selectedChatType == "order" && "selected"} onClick={(event) => menuChat(event, "order")}>
                  ออเดอร์
                </button>
                
              </div>
            </div>

            <div className="chat-list">
              {/* {alert(chat_partner_id)} */}
              {/* {chatlist} */}
              <Contacts
                partnerID={chat_partner_id}
                orderID={chat_order_id}
                contacts={contacts}
                changeChat={handleChatChange}
                userdata={userdata}
                Toggled={isToggled}
                selectedChatType={selectedChatType}
                myId={userdata.id}
              />
            </div>
          </div>

          {/* -----ดิฟ2  กดแล้วให้เปลี่ยนตรงนี้------*/}
          <div className="chat-room">
            {partnerChat != undefined ? (
              <ChatContainer currentChat={partnerChat} socket={socket} orderId={chat_order_id} />
              //พอมีการเซ็ท current chat ของ contact จะโชว์แชทขึ้นมาเลย
            ) : currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
            {/* ถ้า partner chat ไม่เคยมีแชทมาก่อน ให้เพิ่ม div ในคอนแทค */}
          </div>
        </div>
      </div>
    </div>
  );
}
