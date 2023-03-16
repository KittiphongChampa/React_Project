import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function ViewProfile() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  console.log(userdata.usr_cover_img === '');

  const { id } = useParams();
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    await axios
      .get(`http://localhost:3333/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };

  return (
    <>
      <img src={userdata.usr_cover_img ? userdata.usr_cover_img : 'https://marketplace.canva.com/EAEtDohILoQ/1/0/1600w/canva-%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%94%E0%B8%AA%E0%B8%81%E0%B9%8C%E0%B8%97%E0%B9%87%E0%B8%AD%E0%B8%9B-%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%84%E0%B9%8C-%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%B2%E0%B8%94-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AD%E0%B8%B2%E0%B8%97%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C%E0%B8%95%E0%B8%81%E0%B8%94%E0%B8%B4%E0%B8%99-%E0%B8%A1%E0%B8%B5%E0%B8%A5%E0%B8%A7%E0%B8%94%E0%B8%A5%E0%B8%B2%E0%B8%A2-dn6mEVC-u5g.jpg'} className="mystyle"/>
      <img src={userdata.urs_profile_img} alt="Profile" className="myimg"/>
      <p>{userdata.urs_name}</p>
      <p>{userdata.urs_email}</p>
      <p>{userdata.urs_bio}</p>
    </>
  );
}
