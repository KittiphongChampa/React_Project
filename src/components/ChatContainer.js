import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../css/chat.css";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import * as Icon from "react-feather";
import * as ggIcon from "@mui/icons-material";
import "../styles/main.css";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Scrollbars from 'react-scrollbars-custom';
import ImgFullscreen from './openFullPic'
import ChatOrderDetail from '../components/ChatOrderDetail'
import ChatAddModal from '../components/ChatAddModal'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Select, Space, Upload, Switch, Flex, Radio, InputNumber, Form } from 'antd';
import OrderSystemMsg from "./OrderSystemMsg";
import 'animate.css'
import { format } from 'date-fns';
import QRCode from "qrcode.react";

import { host } from "../utils/api";

const generatePayload = require("promptpay-qr");


const getBase64 = (file) =>
  new Promise((resolve, rreject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => rreject(error);
  });

export default function ChatContainer({ currentChat, socket, userdata }) {
  const token = localStorage.getItem("token");
  const [userid, setUserid] = useState();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const chat_order_id = queryParams.get("od_id");
  const currentDate = new Date();
  const date = new Date();
  const date_now = date.toLocaleDateString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timestamp_chat = date_now.split(" ")[1];
  const [allSteps, setAllSteps] = useState()
  const [orderDetail, setOrderDetail] = useState()
  const orderId = useRef()
  const [form] = Form.useForm();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${host}/index`, {
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
          `${host}/messages/getmsg`,
          {
            from: data.users[0].id,
            to: currentChat.id,
            od_id: chat_order_id
          }
        )
        const getOrderData = await axios.post(
          `${host}/getorderdata`,
          {
            od_id: chat_order_id
          }
        )
        if (chat_order_id !== 0) {
          setOrderDetail(getOrderData.data);
          await getCurrentStep()
          await getAllSteps()
        }
        setMessages(getChatdata.data);
        orderId.current = chat_order_id
      } catch (error) {
        console.log("catch", error);
      }
    };
    getUser();
    getPayment()
  }, [currentChat, token]);

  const handleSendMsg = async (msg) => {
    //รับค่ามาและส่งแชทและแสดงผลแชทบนหน้าจอ
    socket.current.emit("send-msg", {
      to: currentChat.id,
      from: userid,
      msg,
      od_id: chat_order_id,
      timestamp_chat,
    });
    await axios.post(`${host}/messages/addmsg`, {
      from: userid,
      to: currentChat.id,
      message: msg,
      od_id: chat_order_id
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg, timestamp_chat: timestamp_chat },
    ]);
  }

  const [isBriefOpen, setIsBriefOpen] = useState(false)
  function handleBrief() {
    setIsBriefOpen(!isBriefOpen)
  }

  //รับข้อความ
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", ({ img, msgId, msg, to, od_id, step_id, step_name, status, checked, isSystemMsg }) => {
        //ให้เช็คว่าถ้าออเดอร์ไอดี + ผู้รับ(ไอดีของเรา) = ออเดอร์ไอดีที่เราเปิดอยู่
        // alert(od_id + to + "=" + orderId.current + userid)
        if (od_id + to === orderId.current + userid) {
          setArrivalMessage({
            img: img,
            msgId: msgId,
            fromSelf: false,
            message: msg,
            timestamp_chat: timestamp_chat,
            current_time: currentDate,
            step_id: step_id,
            step_name: step_name,
            od_id: od_id,
            status: status,
            checked: checked,
            isSystemMsg: isSystemMsg
          });
        }

        socket.current.on("update-order", ({ msgId, to, od_id, deleted }) => {
          // setCurStepId(nowCurId)
          if (od_id + to === orderId.current + userid) {
            alert("อัปเดตตัวนี้" + msgId)
            setMessages((current) =>
              current?.map((message) => (
                message.msgId == msgId ? { ...message, checked: 1 } : message
              ))
            );
          }
          if (deleted != undefined || deleted != null) {
            setMessages((current) =>
              current.filter((msg) => msg.msgId != msgId)
            )
          }
        });

        socket.current.on("update-timeline", ({ to, od_id, nowCurId }) => {
          alert("ฟังก์ชันปุ่มเขียวทำงาน" + od_id + orderId.current)
          if (od_id === orderId.current) {
            setCurStepId(nowCurId)
            alert(nowCurId)
          }
        });
      });
    }
  }, [socket.current, currentChat]);

  useEffect(() => {
    arrivalMessage &&
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [arrivalMessage]);

  const chatbottom = useRef()
  useEffect(() => {
    chatbottom?.current.scrollIntoView({ behavior: 'smooth', block: "end" }); // เลื่อนมุมมองไปยังตำแหน่งสุดท้ายของข้อความทั้งหมด
  }, [messages.length]);
  useEffect(() => {
    orderId.current = chat_order_id
    chatbottom?.current.scrollIntoView({ behavior: 'smooth', block: "end" }); // เลื่อนมุมมองไปยังตำแหน่งสุดท้ายของข้อความทั้งหมด
  }, []);


  //*------------------------การดึงค่าสถานะ---------------------------------------------
  const [curStepId, setCurStepId] = useState()
  const currentStepId = useRef()
  const currentStepName = useRef()
  const msgId = useRef()
  //ดึงข้อมูลสเตปปัจจุบัน
  const getCurrentStep = async () => {
    try {
      const result = await axios.post(
        `${host}/getcurrentstep`,
        {
          od_id: chat_order_id
        }
      );
      currentStepId.current = result.data.step_id;
      currentStepName.current = result.data.step_name;
      msgId.current = result.data.msgId;

    

    } catch (error) {
      console.error("Error fetching current stat:", error);
    }
  }

  useEffect(() => {
    //ที่ต้องมีเคอร์อันนี้สำหรับอัปเดตตุ่มเขียว
    setCurStepId(currentStepId.current)
  }, [currentStepId.current])

  const getAllSteps = async () => {
    const result = await axios.post(
      `${host}/getAllSteps`,
      {
        od_id: chat_order_id
      }
    )
    setAllSteps(result.data)
  }

  const updateMsg = (msgid) => {
    // alert(msgid)
    msgid == null || msgid == undefined ? setMessages(
      messages.map((message) => (
        message.msgId === msgId.current ? { ...message, checked: 1 } : message
      ))
    )
      : setMessages((current) =>
        current.filter((msg) => msg.msgId != msgid)
      )

    socket.current.emit("update-order", {
      to: currentChat.id,
      msgId: msgid == null || msgid == undefined ? msgId.current : msgid,
      od_id: chat_order_id,
      nowCurId: currentStepId.current,
      deleted: msgid
    });
    // console.log(messages);
  };



  //*--------------------------------------------------------------------

  //*------------------------อัปเดตสถานะ---------------------------------------------

  //รับคำขอจ้าง
  const acceptRequest = (step_id, step_name) => {
    Swal.fire({
      title: `ยอมรับคำขอจ้างนี้หรือไม่`,
      showCancelButton: true,
      confirmButtonText: "ยอมรับ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {

        // แจ้งเตือนเมื่อยอมรับ
        const acceptOrder = {
          sender_id: userdata.id,
          sender_name: userdata.urs_name,
          sender_img: userdata.urs_profile_img,
          order_id: chat_order_id,
          receiver_id: currentChat.id,
          msg: 'รับคำขอจ้าง'
        }
        socket.current.emit('acceptOrder', acceptOrder);
        await axios.post(`${host}/noti/order/add`, acceptOrder);

        //ไปอัปเดต ui ให้เป็นเช็ค 1
        updateMsg()
        //อัปเดตให้ส่งคำขอจ้องเป็นเช็ค1
        const result = await axios.post(
          //แค่อัปเดตให้เป็น 1 พอ
          `${host}/messages/updatestep`,
          {
            step_id: step_id,
            od_id: chat_order_id,
          }
        );

        socket.current.emit("send-msg", {
          to: currentChat.id,
          from: userid,
          msg: "รับคำขอจ้างแล้ว",
          timestamp_chat,
          step_id: currentStepId.current,
          step_name: currentStepName.current,
          od_id: chat_order_id,
          status: "a",
          checked: 1,
          isSystemMsg: true,
          current_time: currentDate
        });

        //ส่งuiว่ารับคำขอจ้างแล้ว
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            to: currentChat.id,
            from: userid,
            message: "รับคำขอจ้างแล้ว",
            timestamp_chat,
            step_id: currentStepId.current,
            step_name: currentStepName.current,
            od_id: chat_order_id,
            status: "a",
            checked: 1,
            isSystemMsg: true,
            current_time: currentDate
          },
        ]);
        //เพิ่มเข้าดาต้าเบส
        await axios.post(`${host}/messages/addmsg`, {
          from: userid,
          to: currentChat.id,
          message: "รับคำขอจ้างแล้ว",
          step_id: currentStepId.current,
          od_id: chat_order_id,
          status: "a",
          checked: 1,
        })

        //อัปเดตให้รับคำขอจ้างเสร็จเช็คแอ้ด
        const res = await axios.post(
          `${host}/messages/updatestep`,
          {
            step_id: currentStepId.current,
            od_id: chat_order_id,
          }
        );
        //ไปอัปเดตตุ่มเขียว+ไปสเตปต่อไป

        currentStepId.current = res.data.step_id;
        currentStepName.current = res.data.step_name;
        msgId.current = res.data.msgId;


        Swal.fire("ยอมรับคำขอจ้างนี้แล้ว", "", "success");
      }
    });
  };

  //ส่งโปรเกส
  function sendProgress(event) {
    event.preventDefault();
    Swal.fire({
      title: "ส่ง" + currentStepName?.current + "หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //แอดแมสเสจเข้าไป
        await axios.post(`${host}/messages/addmsg`, {
          from: userid,
          to: currentChat.id,
          step_id: value,
          message: `ส่ง${currentStepName.current}แล้ว`,
          od_id: chat_order_id,
          checked: 0,
        })
        //เอาสเตตัสปจบ.มา+เอาไอดีของแชทที่ดึงออกมาด้วย
        await getCurrentStep()
        //เอาไอดีแชทมาใส่
        socket.current.emit("send-msg", {
          msgId: msgId.current,
          to: currentChat.id,
          from: userid,
          msg: `ส่ง${currentStepName.current}แล้ว`,
          timestamp_chat,
          step_id: value,
          step_name: currentStepName.current,
          od_id: chat_order_id,
          checked: 0,
          isSystemMsg: true,
          current_time: currentDate
        });
        // console.log(currentStepId.current)
        //ใส่ไอดีแชทให้ตอนแสดงผลให้ตัวเอง
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            msgId: msgId.current,
            to: currentChat.id,
            from: userid,
            message: `ส่ง${currentStepName.current}แล้ว`,
            timestamp_chat,
            step_id: value,
            step_name: currentStepName.current,
            od_id: chat_order_id,
            checked: 0,
            status: null,
            isSystemMsg: true,
            current_time: currentDate
          },
        ]);
        Swal.fire("ส่งภาพแล้ว", "", "success");
        handleCancel()
      }
    });
  }

  //อนุมัติโปรเกส
  const approveProgress = (step_id, step_name) => {
    let nextStep;
    Swal.fire({
      title: "อนุมัติภาพนี้หรือไม่",
      showCancelButton: true,
      confirmButtonText: "อนุมัติ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        socket.current.emit("send-msg", {
          to: currentChat.id,
          from: userid,
          msg: `อนุมัติ${step_name}แล้ว`,
          timestamp_chat,
          step_id: step_id,
          step_name: step_name,
          od_id: chat_order_id,
          status: "a",
          checked: 1,
          isSystemMsg: true,
          current_time: currentDate
        });
        console.log(currentStepId.current)
        await axios.post(`${host}/messages/addmsg`, {
          from: userid,
          to: currentChat.id,
          step_id: step_id,
          message: `อนุมัติ${step_name}แล้ว`,
          od_id: chat_order_id,
          status: "a",
          checked: 1,
        })
        updateMsg()
        //อันนี้คือเพิ่มของตัวเอง
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            to: currentChat.id,
            from: userid,
            message: `อนุมัติ${step_name}แล้ว`,
            timestamp_chat,
            step_id: step_id,
            step_name: step_name,
            od_id: chat_order_id,
            status: "a",
            checked: 1,
            isSystemMsg: true,
            current_time: currentDate
          },
        ]);


        const result = await axios.post(
          `${host}/messages/updatestep`,
          {
            step_id: step_id,
            od_id: chat_order_id,
          }
        );
        currentStepId.current = result.data.step_id;
        currentStepName.current = result.data.step_name;
        msgId.current = result.data.msgId;
        nextStep = result.data.step_name
        socket.current.emit("update-timeline", {
          to: currentChat.id,
          od_id: chat_order_id,
          nowCurId: currentStepId.current
        })

        Swal.fire("ส่งภาพแล้ว", "", "success");
      }
      //ถ้าเป็นภาพร่างให้ส่งระบุราคาไป
      if (step_name.includes("ภาพร่าง")) {
        await axios.post(`${host}/messages/addmsg`, {
          from: userid,
          to: currentChat.id,
          step_id: currentStepId.current,
          message:"ระบุราคาคอมมิชชัน",
          od_id: chat_order_id,
          checked: 0,
        }).then(
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              msgId: msgId.current,
              to: currentChat.id,
              from: userid,
              message: `ระบุราคาคอมมิชชัน`,
              timestamp_chat,
              step_id: currentStepId.current,
              step_name: currentStepName.current,
              od_id: chat_order_id,
              checked: 0,
              isSystemMsg: true
            },
          ])
        )
      }
      else if (nextStep.includes("แนบสลิป2")) {
        await axios.post(`${host}/messages/addmsg`, {
          from: userid,
          to: currentChat.id,
          step_id: currentStepId.current,
          message: `กรุณาแนบใบเสร็จชำระเงิน2`,
          od_id: chat_order_id,
          checked: 0,
        }).then(
          // console.log("ส่งแนบสลิป")
          socket.current.emit("send-msg", {
            msgId: msgId.current,
            to: currentChat.id,
            from: userid,
            msg: `กรุณาแนบใบเสร็จชำระเงิน2`,
            timestamp_chat,
            step_id: currentStepId.current,
            step_name: currentStepName.current,
            od_id: chat_order_id,
            checked: 0,
            isSystemMsg: true,
            current_time: currentDate
          }),
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              msgId: msgId.current,
              to: currentChat.id,
              from: userid,
              message: `กรุณาแนบใบเสร็จชำระเงิน2`,
              timestamp_chat,
              step_id: currentStepId.current,
              step_name: currentStepName.current,
              od_id: chat_order_id,
              checked: 0,
              isSystemMsg: true,
              current_time: currentDate
            }
          ])
        )
      }
    });
  }

  //แก้ไขโปรเกส
  const editProgress = (step_id, step_name) => {
    let title;
    if (orderDetail.pkg_edits <= orderDetail.od_number_of_edit) {
      title = 'การแก้ไขครั้งนี้มีค่าใช้จ่าย ต้องการแจ้งแก้ไขภาพนี้หรือไม่'
    } else {
      title = 'ต้องการแจ้งแก้ไขภาพนี้หรือไม่'
    }
    Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          socket.current.emit("send-msg", {
            to: currentChat.id,
            from: userid,
            msg: `แจ้งแก้ไข${step_name}แล้ว`,
            timestamp_chat,
            step_id: step_id,
            step_name: step_name,
            od_id: chat_order_id,
            status: "e",
            checked: 1,
            isSystemMsg: true,
            current_time: currentDate
          });
          await axios.post(`${host}/messages/addmsg`, {
            from: userid,
            to: currentChat.id,
            message: `แจ้งแก้ไข${step_name}แล้ว`,
            step_id: step_id,
            od_id: chat_order_id,
            status: "e",
            checked: 1,
          })
          updateMsg()

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              to: currentChat.id,
              from: userid,
              isSystemMsg: true,
              current_time: currentDate,
              step_name: step_name,
              step_id: step_id,
              message: `แจ้งแก้ไข${step_name}แล้ว`,
              od_id: chat_order_id,
              status: "e",
              checked: 1,
              timestamp_chat: timestamp_chat
            },
          ]);

          Swal.fire("แจ้งแก้ไขภาพแล้ว", "", "success");
          const result = await axios.post(
            `${host}/messages/updatestep`,
            {
              step_id: step_id,
              od_id: chat_order_id,
              od_edit: true
            }
          );
          // currentStepId.current = result.data.step_id;
          // currentStepName.current = result.data.step_name;
          // msgId.current = result.data.msgId;

        }
      })


      ;
  }

  //ลบรูป
  const delProgress = (step_id, step_name, msgid) => {
    Swal.fire({
      title: "ลบภาพนี้หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          setMessages((current) =>
            current.filter((msg) => msg.msgId != msgid)
          )
          updateMsg(msgid)
          Swal.fire("ลบภาพแล้ว", "", "success");
          const result = await axios.post(
            `${host}/messages/updatestep`,
            {
              step_id: step_id,
              od_id: chat_order_id,
              deleted: true
            }
          )
          currentStepId.current = result.data.step_id;
          currentStepName.current = result.data.step_name;
          msgId.current = result.data.msgId;

        }
      });
  }

  // ตั้งราคา --------------------
  const setPrice = (step_id, step_name, price) => {
    console.log(price)
    Swal.fire({
      title: `กำหนดเป็นราคา ${price} บาทใช่หรือไม่`,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          socket.current.emit("send-msg", {
            to: currentChat.id,
            from: userid,
            msg: `กำหนดราคาคอมมิชชันนี้ ${price} บาท`,
            timestamp_chat,
            step_id: step_id,
            step_name: step_name,
            od_id: chat_order_id,
            status: "a",
            checked: 1,
            isSystemMsg: true,
            current_time: currentDate
          });
          console.log(currentStepId.current)
          await axios.post(`${host}/messages/addmsg`, {
            from: userid,
            to: currentChat.id,
            message: `กำหนดราคาคอมมิชชันนี้ ${price} บาท`,
            step_id: step_id,
            od_id: chat_order_id,
            status: "a",
            checked: 1,
          })
          updateMsg()
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              to: currentChat.id,
              from: userid,
              message: `กำหนดราคาคอมมิชชันนี้ ${price} บาท`,
              timestamp_chat,
              step_id: step_id,
              step_name: step_name,
              od_id: chat_order_id,
              status: "a",
              checked: 1,
              isSystemMsg: true,
              current_time: currentDate
            },
          ]);

          const result = await axios.post(
            `${host}/messages/updatestep`,
            {
              step_id: step_id,
              od_id: chat_order_id,
              od_price: price,
            }
          );
          currentStepId.current = result.data.step_id;
          currentStepName.current = result.data.step_name;
          msgId.current = result.data.msgId;
          socket.current.emit("update-timeline", {
            to: currentChat.id,
            od_id: chat_order_id,
            nowCurId: currentStepId.current
          })

          Swal.fire("ตั้งราคาแล้ว", "", "success");

          //ให้มันแนบสลิปต่อ
          await axios.post(`${host}/messages/addmsg`, {
            from: userid,
            to: currentChat.id,
            step_id: currentStepId.current,
            message: `กรุณาแนบใบเสร็จชำระเงิน`,
            od_id: chat_order_id,
            checked: 0,
          }).then(
            // console.log("ส่งแนบสลิป")
            socket.current.emit("send-msg", {
              msgId: msgId.current,
              to: currentChat.id,
              from: userid,
              msg: `กรุณาแนบใบเสร็จชำระเงิน`,
              timestamp_chat,
              step_id: currentStepId.current,
              step_name: currentStepName.current,
              od_id: chat_order_id,
              checked: 0,
              isSystemMsg: true,
              current_time: currentDate
            }),
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                msgId: msgId.current,
                to: currentChat.id,
                from: userid,
                message: `กรุณาแนบใบเสร็จชำระเงิน`,
                timestamp_chat,
                step_id: currentStepId.current,
                step_name: currentStepName.current,
                od_id: chat_order_id,
                checked: 0,
                isSystemMsg: true,
                current_time: currentDate
              }
            ])
          )
        }
      });
  }

  //แนบสลิปแล้ว
  function submitSlip(step_id, step_name,) {
    return new Promise((resolve) => {
      Swal.fire({
        title: `อัปโหลดใบเสร็จชำระเงินนี้หรือไม่`,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then(async(result) => {
        if (result.isConfirmed) {
          Swal.fire("อัปโหลดสลิปแล้ว", "", "success");
          await updateMsg()
          const result = await axios.post(
            `${host}/messages/updatestep`,
            {
              step_id: step_id,
              od_id: chat_order_id,
            }
          );
          currentStepId.current = result.data.step_id;
          currentStepName.current = result.data.step_name;
          msgId.current = result.data.msgId;
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              to: currentChat.id,
              from: userid,
              msgId: msgId.current,
              isSystemMsg: true,
              current_time: currentDate,
              step_id: currentStepId.current,
              step_name: currentStepName.current,
              message: "แนบใบเสร็จชำระเงินแล้ว",
              od_id: orderId.current,
              checked: 0,
              timestamp_chat: timestamp_chat,
            },
          ]);


          socket.current.emit("send-msg", {
            msgId: msgId.current,
            to: currentChat.id,
            from: userid,
            msg: "แนบใบเสร็จชำระเงินแล้ว",
            timestamp_chat,
            step_id: currentStepId.current,
            step_name: currentStepName.current,
            od_id: chat_order_id,
            checked: 0,
            current_time: currentDate,
            isSystemMsg: true
          });

          //ไปขั้นตอนใหม่แล้วคือขั้นชำระเงินขั้นแรก
          await axios.post(`${host}/messages/addmsg`, {
            from: userid,
            to: currentChat.id,
            step_id: currentStepId.current,
            message: "แนบใบเสร็จชำระเงินแล้ว",
            od_id: chat_order_id,
            checked: 0,
          })

          socket.current.emit("update-timeline", {
            to: currentChat.id,
            od_id: chat_order_id,
            nowCurId: currentStepId.current
          })
          Swal.fire("อัปโหลดสลิปแล้ว", "", "success");
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });


    // Swal.fire({
    //   title: `อัปโหลดใบเสร็จชำระเงินนี้หรือไม่${msgId.current}`,
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "ตกลง",
    //   cancelButtonText: "ปิด",
    // })
    //   .then(async (result) => {
    //     if (result.isConfirmed) {
    //       await updateMsg()
    //       const result = await axios.post(
    //         `${host}/messages/updatestep`,
    //         {
    //           step_id: step_id,
    //           od_id: chat_order_id,
    //         }
    //       );
    //       currentStepId.current = result.data.step_id;
    //       currentStepName.current = result.data.step_name;
    //       msgId.current = result.data.msgId;
    //       setMessages((prevMessages) => [
    //         ...prevMessages,
    //         {
    //           to: currentChat.id,
    //           from: userid,
    //           msgId: msgId.current,
    //           isSystemMsg: true,
    //           current_time: currentDate,
    //           step_id: currentStepId.current,
    //           step_name: currentStepName.current,
    //           message: "แนบใบเสร็จชำระเงินแล้ว",
    //           od_id: orderId.current,
    //           checked: 0,
    //           timestamp_chat: timestamp_chat,
    //         },
    //       ]);


    //       socket.current.emit("send-msg", {
    //         msgId: msgId.current,
    //         to: currentChat.id,
    //         from: userid,
    //         msg: "แนบใบเสร็จชำระเงินแล้ว",
    //         timestamp_chat,
    //         step_id: currentStepId.current,
    //         step_name: currentStepName.current,
    //         od_id: chat_order_id,
    //         checked: 0,
    //         current_time: currentDate,
    //         isSystemMsg: true
    //       });

    //       //ไปขั้นตอนใหม่แล้วคือขั้นชำระเงินขั้นแรก
    //       await axios.post(`${host}/messages/addmsg`, {
    //         from: userid,
    //         to: currentChat.id,
    //         step_id: currentStepId.current,
    //         message: "แนบใบเสร็จชำระเงินแล้ว",
    //         od_id: chat_order_id,
    //         checked: 0,
    //       })

    //       socket.current.emit("update-timeline", {
    //         to: currentChat.id,
    //         od_id: chat_order_id,
    //         nowCurId: currentStepId.current
    //       })
    //       Swal.fire("อัปโหลดสลิปแล้ว", "", "success");
    //       return true
    //     }
    //   });
  }
  
  // function submitSlip(step_id, step_name) {
  //   return new Promise((resolve) => {
  //     Swal.fire({
  //       title: `อัปโหลดใบเสร็จชำระเงินนี้หรือไม่${msgId.current}`,
  //       showCancelButton: true,
  //       confirmButtonText: "ตกลง",
  //       cancelButtonText: "ปิด",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire("อัปโหลดสลิปแล้ว", "", "success");
  //         resolve(true);
  //       } else {
  //         resolve(false);
  //       }
  //     });
  //   });
  // }

  //ยอมรับสลิป = ขั้นตอนชำระเงิน
  function approveSlip(step_id, step_name, time) {
    Swal.fire({
      title: `ยอมรับใบเสร็จชำระเงินนี้หรือไม่`,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "ยอมรับ",
      cancelButtonText: "ยกเลิก",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          socket.current.emit("send-msg", {
            to: currentChat.id,
            from: userid,
            msg: `ตรวจสอบใบเสร็จชำระเงินแล้ว ${!step_name?.includes('2') ? 'การชำระเงินครึ่งแรกสำเร็จ' : 'การชำระเงินครึ่งหลังสำเร็จ'}`,
            timestamp_chat,
            step_id: step_id,
            step_name: step_name,
            od_id: chat_order_id,
            status: "a",
            checked: 1,
            isSystemMsg: true,
            current_time: currentDate
          });
          console.log(currentStepId.current)
          await axios.post(`${host}/messages/addmsg`, {
            from: userid,
            to: currentChat.id,
            step_id: step_id,
            message: `ตรวจสอบใบเสร็จชำระเงินแล้ว ${!step_name?.includes('2') ? 'การชำระเงินครึ่งแรกสำเร็จ' : 'การชำระเงินครึ่งหลังสำเร็จ'}`,
            od_id: chat_order_id,
            status: "a",
            checked: 1,
          })
          updateMsg()
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              to: currentChat.id,
              from: userid,
              status: "a",
              isSystemMsg: true,
              current_time: currentDate,
              step_name: step_name,
              step_id: step_id,
              message: `ตรวจสอบใบเสร็จชำระเงินแล้ว ${!step_name?.includes('2') ? 'การชำระเงินครึ่งแรกสำเร็จ' : 'การชำระเงินครึ่งหลัง'}`,
              od_id: chat_order_id,
              checked: 1,
              timestamp_chat: timestamp_chat
            },
          ]);

          const result = await axios.post(
            `${host}/messages/updatestep`,
            {
              step_id: step_id,
              od_id: chat_order_id,
            }
          );
          currentStepId.current = result.data.step_id;
          currentStepName.current = result.data.step_name;
          msgId.current = result.data.msgId;
          socket.current.emit("update-timeline", {
            to: currentChat.id,
            od_id: chat_order_id,
            nowCurId: currentStepId.current
          })

          Swal.fire("ยอมรับสลิปแล้ว", "", "success");
        }
      });
  }

  //ไม่ยอมรับสลิป = ขั้นตอนชำระเงิน
  function rejectSlip(step_id, step_name, time) {
    Swal.fire({
      title: `ปฏิเสธใบเสร็จชำระเงินนี้หรือไม่`,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          socket.current.emit("send-msg", {
            to: currentChat.id,
            from: userid,
            msg,
            timestamp_chat,
            step_id: step_id,
            od_id: chat_order_id,
            checked: 1,
            current_time: currentDate
          });
          console.log(currentStepId.current)
          await axios.post(`${host}/messages/addmsg`, {
            from: userid,
            to: currentChat.id,
            step_id: step_id,
            message: "ยกเลิกใบเสร็จชำระเงินแล้ว",
            od_id: chat_order_id,
            status: "e",
            checked: 1,
          })
          currentStepId.current = result.data.step_id;
          currentStepName.current = result.data.step_name;
          msgId.current = result.data.msgId;
          updateMsg()

          console.log("เก้ทสแตทปจบ", currentStepId.current)
          setMessages((prevMessages) => [
            ...prevMessages,
            { isSystemMsg: true, current_time: currentDate, step_name: stepName, step_id: step_id, message: "ยกเลิกใบเสร็จชำระเงินแล้ว", od_id: orderId.current, checked: 0, timestamp_chat: timestamp_chat },
          ]);
          Swal.fire("ยกเลิกสลิปแล้ว", "", "success");
        }
      });
  }

  //*---------------------------------------------------------------------

  const handleSendImage = async (image) => {
    const formData = new FormData();
    formData.append("from", userid);
    formData.append("to", currentChat.id);
    formData.append("image", image);
    console.log(formData);
    await axios
      .post(`${host}/messages/addmsg`, formData, {})
      .then((response) => {
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
          { fromSelf: true, message: msg, timestamp_chat: timestamp_chat },
        ]);
      });
  };

  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [previewUrl, setPreviewUrl] = useState("");

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

  const [fullImgOpened, setFullImgOpened] = useState(false)
  const [src, setSrc] = useState("")

  const handleFullImg = (imgsrc) => {
    console.log("คลิกฟังชันโชว์", imgsrc)
    setFullImgOpened(prevState => !prevState)
    setSrc(imgsrc)
  }
  const [showOderDetailModal, setShowOrderDetailModal] = useState(false);
  const handleOdModal = () => {
    setShowOrderDetailModal(prevState => !prevState)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    getAllSteps()
    setIsModalOpen(true);
    currentStepName?.current?.includes('ภาพ') && setValue(currentStepId?.current)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setPage("0")
  };

  const [page, setPage] = useState("0")
  function handlePage(pagenumber) {
    setPage(pagenumber)
  }

  const [isChecked, setIsChecked] = useState({ tou: false, price: false })

  function handleIsChecked(event) {
    const name = event.target.name
    setIsChecked({ ...isChecked, [name]: event.target.checked });
    console.log(name, event.target.checked)
  }

  const [value, setValue] = useState();
  const [stepName, setStepName] = useState();
  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    const { value, step_name } = e.target;
    // ทำสิ่งที่คุณต้องการกับ value และ step_id
    console.log('Selected Step Name:', value);
    console.log('Selected Step ID:', step_name);
    setValue(value);
    setStepName(step_name);
  };


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancelPreview = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  // console.log('msgId.current : ', msgId.current);
  const onFinish = async (values) => {
    // event.preventDefault();
    Swal.fire({
      title: "ส่ง" + currentStepName?.current + "หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {

      if (result.isConfirmed) {
        axios.post(`${host}/messages/addmsg`, {
          from: userid,
          to: currentChat.id,
          step_id: value,
          message: `ส่ง${currentStepName.current}แล้ว`,
          od_id: chat_order_id,
          checked: 0,
        }).then(async() => {
          console.log('ทำงาน');
          await getCurrentStep()
          console.log(msgId.current)
          const formData = new FormData();
          fileList.forEach((file) => {
            formData.append("image_file", file.originFileObj);
          });
          axios
            .post(`${host}/upload-img/progress/${msgId.current}`, formData, {
              headers: {
                Authorization: "Bearer " + token,
                "Content-type": "multipart/form-data",
              },
            }).then((response) => {
              const data = response.data;
              console.log("data ",data);
              if (data.status === 'ok') {
                console.log(data.att_img_path);
                socket.current.emit("send-msg", {
                  img : data.att_img_paths == undefined ? data.att_img_path : data.att_img_paths,
                  msgId: msgId.current,
                  to: currentChat.id,
                  from: userid,
                  msg: `ส่ง${currentStepName.current}แล้ว`,
                  timestamp_chat,
                  step_id: value,
                  step_name: currentStepName.current,
                  od_id: chat_order_id,
                  checked: 0,
                  isSystemMsg: true,
                  current_time: currentDate
                });
                // console.log(currentStepId.current)
                //ใส่ไอดีแชทให้ตอนแสดงผลให้ตัวเอง
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    //เอาพาธมาใส่ตรงนี้
                    img : data.att_img_paths == undefined ? data.att_img_path : data.att_img_paths,
                    msgId: msgId.current,
                    to: currentChat.id,
                    from: userid,
                    message: `ส่ง${currentStepName.current}แล้ว`,
                    timestamp_chat,
                    step_id: value,
                    step_name: currentStepName.current,
                    od_id: chat_order_id,
                    checked: 0,
                    status: null,
                    isSystemMsg: true,
                    current_time: currentDate
                  },
                ]);
                Swal.fire("ส่งภาพแล้ว", "", "success");
                handleCancel()
                setFileList([])
      
              } else {
                alert('ไม่ทำงาน')
              }
            })
        })


      }

    })
    
    //เอาสเตตัสปจบ.มา+เอาไอดีของแชทที่ดึงออกมาด้วย
   

  }


  // const disableBtn = useRef(0)
  // const wipStepLength = useRef(0)

  const [allEBtn,setAllEBtn] = useState(0)

  function enabledBtn() {
    setAllEBtn(allEBtn+1)
    
  }
  // -------------------------------------------------qrgen-----------------------------------------------
  const [qrCode, setQrCode] = useState("sample");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState();
  const [accName, setAccName] = useState();

  const getPayment = () => {
    axios .get(`${host}/getPayment/order/${chat_order_id}`).then((response) => {
      const data = response.data;
      console.log(data.PaymentData[0]);
      if (data.status === 'ok'){
        const payData = data.PaymentData[0];
        setAmount(payData.od_first_pay)
        setPhoneNumber(payData.urs_promptpay_number)
        setAccName(payData.urs_account_name)
        

        setQrCode(generatePayload(payData.urs_promptpay_number, { amount }));
      } else {
        console.log('error');
      }
    })
  }
  


  return (
    <>
        {/* <div>
          <QRCode value={qrCode} />
        </div> */}
      <ImgFullscreen src={src} opened={fullImgOpened} handleFullImg={handleFullImg} acceptRequest={acceptRequest} />
      {showOderDetailModal ? <ChatOrderDetail myId={userid} isBriefOpen={isBriefOpen} handleBrief={handleBrief} currentStep={curStepId} messages={messages} currentStepName={currentStepName.current} allSteps={allSteps} orderDetail={orderDetail} handleOdModal={handleOdModal} showOderDetailModal={showOderDetailModal} /> : null}

      <Modal title="" open={isModalOpen} footer="" onCancel={handleCancel} width={500} style={{ maxWidth: "1000px" }}>
        {/* <ChatAddModal /> */}
        <div className="form-order">
          {page == "0" && <>
            <p className="h5">ส่งรูปภาพ</p>
            <button className="add-item" onClick={() => handlePage("1")}>
              <div className="icon-div"><Icon.Image /></div>
              <p className="text">แนบไฟล์ภาพ</p>
            </button>
            {orderDetail?.artist_id == userid &&
              <><p className="h5">เกี่ยวกับออเดอร์</p>
                <button className="add-item" onClick={() => handlePage("2")}>
                  <div className="icon-div"><Icon.Upload /></div>
                  <p className="text">ส่งความคืบหน้าของงาน</p>
                </button>
                <button className="add-item" onClick={() => handlePage("3")} >
                  <div className="icon-div"><Icon.Briefcase /></div>
                  <p className="text">เปลี่ยนแปลงประเภทการใช้และราคา<Icon.Info /></p>
                </button></>}


          </>}
          {page == "1" &&
            <>
              <form
                id="sendImage"
                onClick={() => document.querySelector(".input-field").click()}
                className="dragNdrop"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onSubmit={(event) => sendChat(event)}
                style={{ width: "100%", marginTop: "1rem" }}
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
              <Button variant="danger" onClick={handleCancel}>
                Close
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                form="sendImage"
                onClick={handleCancel}
              >
                Send
              </Button>
            </>}
          {page == "2" &&
            <>
              <p className="h5">ส่งความคืบหน้าของงาน</p>
              <Radio.Group value={value}>
                <Space direction="vertical">
                  {allSteps.map((step) => {
                    if (!step.step_name.includes("ภาพ")) {
                      // enabledBtn()
                      return null;
                    }
                    return (
                      <Radio value={step.step_id} key={step.step_id} disabled={(currentStepId.current !== step.step_id) || (currentStepId.current == step.step_id && step.wip_sent != null)} step_name={step.step_name}>
                        ส่ง{step.step_name} {currentStepId.current == step.step_id && step.wip_sent != null && '(ส่งภาพแล้วรอการอนุมัติ)'}
                      </Radio>
                    )
                  })}

                </Space>
              </Radio.Group>


              {/* ---------------------- */}
              <Form
                form={form}
                layout="vertical"
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                  final: 3,
                }}
              >

                <Upload
                  // {...props}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImage}
                  />
              </Modal>
              <Flex justify="flex-end">
                <Button htmlType="submit" size="large" type="primary" shape="round" disabled={value == null} >ส่งความคืบหน้างาน</Button>
              </Flex>
                
              </Form>
            </>
          }
          {page == "3" &&
            <>
              <p className="h4">เปลี่ยนแปลงประเภทการใช้และราคา</p>
              <div><p>ประเภทการใช้งานปัจจุบัน : Personal use</p>
                <p>ราคาปัจจุบัน : 200 บาท</p></div>
              <form action="/action_page.php">
                <div className="form-item">
                  <div>
                    <input type="checkbox" id="tou" name="tou" value="tou" checked={isChecked.tou} onChange={handleIsChecked} />
                    <label className="ms-2" for="tou">เปลี่ยนประเภทการใช้งาน</label>
                  </div>
                  {isChecked.tou && <><div className="tou-radio-btn-group">
                    <div><input type="radio" id="Personal" name="type-of-use" value="Personal" />
                      <label className="ms-1" for="Personal">Personal use<span>(ใช้ส่วนตัว)</span></label></div>
                    <div><input type="radio" id="License" name="type-of-use" value="License" />
                      <label className="ms-1" for="License">License<span>(มีสิทธิ์บางส่วน)</span></label></div>
                    <div><input type="radio" id="Exclusive" name="type-of-use" value="Exclusive" />
                      <label className="ms-1" for="Exclusive">Exclusive right<span>(ซื้อขาด)</span></label></div>
                  </div>
                    หมายเหตุ : <input></input>
                  </>}
                </div>
                <div className="form-item mt-2">
                  <div><input type="checkbox" id="price" name="price" value="price" checked={isChecked.price} onChange={handleIsChecked} />
                    <label className="ms-2" for="price">เปลี่ยนราคา</label></div>
                  {isChecked.price && <><input />หมายเหตุ : <input></input></>}
                </div>
                <button className="orderSubmitBtn">ส่งคำขอ</button>
              </form>
            </>
          }
        </div>
      </Modal>
      <div className="chat-header">
        <div className="chat-name">
          <img src={currentChat.urs_profile_img}></img>
          <div>
            {chat_order_id != 0 && <>
              <p>{orderDetail?.cms_name} : {orderDetail?.pkg_name}</p>
              {orderDetail?.artist_id == userid ? <p>สั่งโดย {orderDetail?.customer_name}</p> : <p>นักวาด {orderDetail?.artist_name}</p>}
            </>}
            {chat_order_id == 0 && <>
              <p>{currentChat.urs_name}</p>
            </>}
          </div>
        </div>

        {chat_order_id != 0 && <><div className="status-chat-header">
          <p>คิวที่ {orderDetail?.od_q_number}</p>
          <p>{currentStepName?.current?.includes("แนบสลิป") || currentStepName?.current?.includes("ภาพ") ?
            orderDetail?.artist_id == userid && 'รอ' //ถ้ามีคำว่าสลิปและเราเป็นนักวาด ให้ใส่คำว่ารอ แต่ถ้าไม่มีคำว่าสลิป และเราไม่ใช่นักวาด ให้ใส่คำว่ารอ
            : orderDetail?.artist_id !== userid && 'รอ'}{currentStepName?.current?.includes("ภาพ") && 'อนุมัติ'}{currentStepName?.current}</p>
        </div>
          <button className="menu-icon-chat" onClick={handleOdModal}><Icon.Menu className='' /></button></>}

      </div>

      <Scrollbars>

        <div className="chat">
          {messages.map((message, index) => {
            return (
              <>
                {message.isSystemMsg ?
                  <>
                    <Flex ref={scrollRef} justify="center" key={message.msgId}>
                      <OrderSystemMsg
                        message={message}
                        acceptRequest={acceptRequest}
                        approveProgress={approveProgress} editProgress={editProgress} delProgress={delProgress}
                        setPrice={setPrice}
                        submitSlip={submitSlip}
                        approveSlip={approveSlip} rejectSlip={rejectSlip}
                        orderDetail={orderDetail}
                        myId={userid}
                        handleBrief={handleBrief}
                        qrCode ={qrCode}
                        phoneNumber ={phoneNumber}
                        amount ={amount}
                        accName ={accName}
                      />
                    </Flex>
                  </>
                  : <>
                    {
                      message.fromSelf ? (
                        <>
                          <div className="user-message" ref={scrollRef} key={uuidv4()}>
                            <div className="my-message">
                              <div>
                                {message.message?.split("images")[0] ===
                                  `${host}/` ? (
                                  // <img src={message.message} width={100} />
                                  <div className="att-image" style={{ cursor: "pointer" }} onClick={() => handleFullImg(message.message)}><img src={message.message} /></div>
                                ) : (
                                  <p className="message">{message.message}</p>
                                )}
                                {/* <p className="time-sent">02.12</p> */}
                                <p className="time-sent">

                                  {new Date(message.created_at).toLocaleString("th-TH", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }) !== "Invalid Date" ? (
                                    <>
                                      {new Date(message.created_at).toLocaleString("th-TH", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </>
                                  ) : (
                                    message.timestamp_chat
                                  )}

                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="user-message" ref={scrollRef} key={uuidv4()}>
                            <div className="their-message">
                              <div>
                                {/* <div>{message.message}</div> */}
                                {message.message?.split("images")[0] ===
                                  `${host}/` ? (
                                  <div className="att-image" style={{ cursor: "pointer" }} onClick={() => handleFullImg(message.message)}><img src={message.message} /></div>
                                ) : (
                                  <p className="message">{message.message}</p>
                                )}
                                {/* <p className="time-sent">02.12</p> */}
                                <p className="time-sent">
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
                                </p>
                              </div>
                            </div>
                          </div>

                        </>
                      )}
                  </>
                }
              </>
            )
          })}
          <div ref={chatbottom}></div>
        </div>
      </Scrollbars>

      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <div className="chat-sender">
          <Button shape="round" type="primary" icon={<PlusOutlined />}
            onClick={showModal}
            style={{ aspectRatio: "1/1", width: "48px", height: "48px", backgroundColor: "#222222" }}
          ></Button>
          <Input
            type="text"
            placeholder="พิมพ์ข้อความ..."
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">
            <Icon.Send className="send-icon" />
          </button>
        </div>
      </form>

      <Modal title="รายละเอียดการจ้าง" footer='' open={isBriefOpen} onCancel={handleBrief}>
        <Flex vertical gap="small">
          <div>
            <p className="h6">ประเภทการใช้งาน</p>
            <p>{orderDetail?.tou}</p> 
            {/* {console.log(orderDetail)} */}
          </div> 
          <div>
            <p className="h6">จุดประสงค์การใช้ภาพ</p>
            <p>{orderDetail?.od_use_for}</p>
          </div>
          <div>
            <p className="h6">รายละเอียด</p>
            <p>{orderDetail?.od_detail}</p>
          </div>
        </Flex>


      </Modal>


    </>
  );
}
