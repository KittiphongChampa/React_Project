import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import io from "socket.io-client";
// import Logo from "../assets/logo.svg";
import { Link, useParams } from 'react-router-dom';
import { host } from "../utils/api";


export default function Contacts({ myId, contacts, changeChat, userdata, Toggled, partnerID, orderID, selectedChatType }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState();

  const uniqueContactIds = new Set();
  const filteredContacts = [];
 
  contacts.forEach((contact) => {
    const combinedId = contact.id + contact.od_id;
    if (!uniqueContactIds.has(combinedId)) {
      uniqueContactIds.add(combinedId);
      filteredContacts.push(contact);
    }
  });
 

  const token = localStorage.getItem("token");

  useEffect(() => {
    //ตึงข้อมูลตัวเอง
    // filteredContacts.push({ id: "138", urs_name: "ทดสอบ", od_id: "0",
    //   receiver:"138",sender:"139",urs_profile_img:"http://localhost:3333/images/Meol4zXybLFHqrYuzYCGTMsijHDnZiBmuSyH7YqCx35fZ8JRvG.jpg" });
    // console.log("ฟีลเตอร์คอนแทค",filteredContacts)
    if (partnerID !== null) {
      orderID == null ? setCurrentSelected(partnerID + 0) : setCurrentSelected(partnerID + orderID)
    }
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await axios.get(`${host}/index`, {
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
    changeChat(contact);
    window.history.pushState({}, '', `/chatbox?id=${contact.id}&od_id=${contact.od_id}`)
  };
  return (
    <>
      
      {currentUserImage && currentUserImage && (
        <>

          {filteredContacts.map((contact, index) => {
            return (
              <>
                {selectedChatType == "private" && contact.od_id == 0 || selectedChatType == "order" && contact.od_id != 0 || selectedChatType == "all" ?
                  (<>
                    <div
                      key={contact.id + contact.od_id} //เปลี่ยนเป็น ยูเซอร์ไอดี+ออเดอร์ไอดี 
                      className={`chat-item ${String(contact.id) + String(contact.od_id) == currentSelected ? "selected" : ""
                        }`}
                      onClick={() => changeCurrentChat(String(contact.id) + String(contact.od_id), contact)}
                    >
                      <img src={contact.urs_profile_img}></img>
                      <div>
                        {!Toggled && (
                          <>
                            <p className="order h6">{contact.urs_name}</p>
                            <p>
                              {contact.message_text?.split("images")[0] === `${host}/` ? (
                                <p className="message">ได้ส่งรูปภาพ</p>
                              ) : (
                                  <p className="message"
                                    style={{
                                      display: "flex",
                                    }}>
                                    <span className="oneline-textoverflow" style={{ flex: 1}}>{contact.message_text}</span>
                                    <span style={{ width: "fit-content" }}> xx:xx น.</span>
                                  </p>
                              )}
                            </p>
                            {/* <p className="message">{contact.message_text}</p> */}
                            <p className="time">
                              {/* <span className="stat">{new Date(contact.last_message_time).toLocaleString("th-TH")}</span> */}
                              {contact.od_id != 0 && <> <span className="stat">
                                {contact?.current_step_name?.includes("แนบสลิป") || contact?.current_step_name?.includes("ภาพ") ?
                                  contact.artist_id == myId && 'รอ' //ถ้ามีคำว่าสลิปและเราเป็นนักวาด ให้ใส่คำว่ารอ แต่ถ้าไม่มีคำว่าสลิป และเราไม่ใช่นักวาด ให้ใส่คำว่ารอ
                                  : contact.artist_id !== myId && 'รอ'}{contact?.current_step_name?.includes("ภาพ") && 'อนุมัติ'}{contact.current_step_name}</span>
                                {/* <span className="stat">{contact.od_id}</span> */}
                                </>
                              }
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
                      {/* {console.log(contact.id + contact.od_id + "=" + currentSelected)} */}
                      <div className={String(contact.id) + String(contact.od_id) == currentSelected ? "arrow" : ""} />
                    </div>
                  </>)
                  : null
                }
              </>
            );
          })}
        </>
      )}
    </>
  );
}
