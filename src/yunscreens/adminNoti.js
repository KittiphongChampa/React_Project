import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { host } from "../utils/api";

export default function AdminNoti() {
  // รับแจ้งเตือนจาก server
  // const socket = useRef();

  // const token = localStorage.getItem("token");
  // const navigate = useNavigate();
  // const [admindata, setAdmindata] = useState([]); //แอดมินคนเดียว
  // const [adminIds, setAdminIDs] = useState([]); //แอดมินทั้งหมด

  // // ข้อมูลแอดมินคนเดียว
  // const getAdmin = async () => {
  //   await axios
  //     .get(`${host}/admin`, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((response) => {
  //       const data = response.data;
  //       if (data.status === "ok") {
  //         setAdmindata(data.admins[0]);
  //         // setAdmintoken(data.admintoken);
  //       } else if (data.status === "no_access") {
  //         console.log("no_access");
  //         alert(data.message);
  //         navigate("/");
  //       } else {
  //         localStorage.removeItem("token");
  //         navigate("/login");
  //       }
  //     })
  //     .catch((error) => {
  //       if (
  //         error.response &&
  //         error.response.status === 401 &&
  //         error.response.data === "Token has expired"
  //       ) {
  //         // Handle token expired error
  //         alert("Token has expired. Please log in again.");
  //         localStorage.removeItem("token");
  //         navigate("/login");
  //       } else {
  //         // Handle other errors here
  //         console.error("Error:", error);
  //       }
  //     });
  // };

  // // ข้อมูลแอดมินทั้งหมด
  // const getAllAdminIDs = async () => {
  //   await axios
  //     .get(`${host}/all-id-admin`,)
  //     .then((response) => {
  //       const data = response.data;
  //       setAdminIDs(data.adminIds);
  //     });
  // };

  // useEffect(() => {
  //   getAllAdminIDs()
  //   getAdmin()
  // }, []);

  // useEffect(() => {
  //   if (adminIds) {
  //     socket.current = io(`${host}`);
  //     socket.current.emit("add-all-admin", adminIds);
  //   }
  // }, [adminIds]);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on('adminNotification', (data) => {
  //       console.log('Admin notification:', data);
  //     });
  //   }
  // }, [socket.current])

  // console.log(socket.current);

  const [notimsg, setNotimsg] = useState([]);
  useEffect(() => {
    const socket = io(`${host}`);
    socket.on('adminNotification', (data) => {
      console.log('New report received:', data);
    })
  }, [])

  // useEffect(() => {
  //   getNotidata();
  // }, [notimsg])


  // const getNotidata = axios.post(
  //   `${host}/getnotimsg`,
  //   {
  //     from: data.users[0].id,
  //     to: currentChat.id,
  //   }
  // )
  // const getNotidata = axios.get(`${host}/getnotimsg`).then((response)=>{
  //   const data = response.data;
  //   setNotimsg(data.results);
  // })
  


  return (
    <div>
      <h1>test</h1>
    </div>
    
  )
}
