


import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import axios from "axios";
// import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat, userdata, Toggled }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  //   useEffect(async () => {
  //     const data = await JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //     );
  //     setCurrentUserName(data.username);
  //     setCurrentUserImage(data.avatarImage);
  //   }, []);

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
          setCurrentUserName(data.users[0].urs_name);
          setCurrentUserImage(data.users[0].urs_profile_img);
        }
      } catch (error) {
        // Handle error
      }
    };
    getUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const [activeChat, setActiveChat] = useState();

  const chatSelected = (id) => {
    setActiveChat(id);
    console.log("chat user ืำงาน");
  };





  return (
    <>
      
      {currentUserImage && currentUserImage && (
        <>
            {contacts.map((contact, index) => {
              // <UserChat name={contact.urs_name} src={contact.urs_profile_img} key={contact.id} id="1" onClick={() => chatSelected("1") }  />;
              return (
                <>
                  <div
                    className={`chat-item ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    // className="chat-item "

                    // className={"chat-item " + (activeChat == props.id ? "selected" : "")}
                    key={contact.id}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <img src={contact.urs_profile_img}></img>
                    <div>
                      {/* <p className="order">{contact.urs_name}</p>
                      <p className="message">ข้อควsssssssssssssssssss</p>
                      <p className="time">
                        <span className="stat">00:12 น.</span>
                      </p> */}
                      {!Toggled && <><p className="order">{contact.urs_name}</p>
                    <p className="message">ข้อควsssssssssssssssssss</p>
                    <p className="time"><span className="stat">00:12 น.</span></p></>}


                {Toggled && <><p className="order filterd">xxxx</p>
                    <p className="message filterd">bust-up full color..</p>
                    <p className="time filterd"> <span className="q">คิวที่1</span><span className="stat">รอชำระเงิน</span></p></>}
                    </div>
                  </div>
                  <div className="qq">
                    {/* <div className={activeChat == props.id ? "arrow" : ""} /> */}
                    <div className={index === currentSelected ? "arrow" : ""} />
                  </div>
                </>
              );
            })}
        </>
      )}
    </>
  );
}

