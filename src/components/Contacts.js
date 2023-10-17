import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import io from "socket.io-client";
// import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat, Toggled, partnerID, socket}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const uniqueContactIds = new Set();
  const filteredContacts = [];

  //ทำการ ลูปค่าเพื่อ หายูนีค id
  contacts.forEach((contact) => {
    if (!uniqueContactIds.has(contact.id)) {
      uniqueContactIds.add(contact.id);
      filteredContacts.push(contact);
      // console.log(contact.message_text);
    }
  });

 
  const token = localStorage.getItem("token");

  useEffect(() => {
    //ตึงข้อมูลตัวเอง
    if (partnerID !== null) {
      setCurrentSelected(partnerID)
    }
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
        setCurrentUserName(data.users[0].urs_name);
        setCurrentUserImage(data.users[0].urs_profile_img);
      }
    } catch (error) {
      // Handle error
    }
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact); //เลือกว่าเราสนทนากับใคร
  };

  const [activeChat, setActiveChat] = useState();

  const chatSelected = (id) => {
    setActiveChat(id);
    console.log("chat user ทำงาน");
  };
  

  return (
    <>
      {currentUserImage && currentUserImage && (
        <>
          {filteredContacts.map((contact, index) => {
            // {console.log(contact);}
            // <UserChat name={contact.urs_name} src={contact.urs_profile_img} key={contact.id} id="1" onClick={() => chatSelected("1") }  />;
            return (
              <>
                <div
                  key={contact.id}
                  className={`chat-item ${
                    contact.id == currentSelected?  "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(contact.id, contact)}
                >
                  <img src={contact.urs_profile_img}></img>
                  <div>
                    {!Toggled && (
                      <>
                        <p className="order">{contact.urs_name}</p>
                        <p>
                          {contact.message_text.split("images")[0] === "http://localhost:3333/" ? (
                            <p className="message">ได้ส่งรูปภาพ</p>
                          ) : (
                            <p className="message">{contact.message_text}</p>
                          )}
                        </p>
                        {/* <p className="message">{contact.message_text}</p> */}
                        <p className="time">
                          <span className="stat">{new Date(contact.last_message_time).toLocaleString("th-TH")}</span>
                        </p>
                      </>
                    )}

                    {Toggled && (
                      <>
                        <p className="order filterd">xxxx</p>
                        <p className="message filterd">bust-up full color..</p>
                        <p className="time filterd">
                          {" "}
                          <span className="q">คิวที่1</span>
                          <span className="stat">รอชำระเงิน</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="qq">
                  <div className={contact.id == currentSelected? "arrow" : ""} />
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
}
