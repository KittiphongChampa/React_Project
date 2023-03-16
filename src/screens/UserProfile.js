
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
// import Navbar from "../components/Navbar";
// import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from '../yunscreens/Profile';

const title = 'ตั้งเป็นชื่อ user';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function UserProfile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [userdata, setUserdata] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("token")) {
          if (window.location.pathname === "/login") {
            navigate("/profile")
          }
        } else {
          navigate("/login")
        }
        getUser();
    }, []);
    const getUser = async () => {
        await axios
          .get("http://localhost:3333/profile", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              setUserdata(data.users[0]);
            } else if (data.status === "error") {
            //   toast.error(data.message, toastOptions);
            } else {
            //   toast.error("ไม่พบผู้ใช้งาน", toastOptions);
            }
          });
      };


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {/* <Navbar /> */}
            <div class="body-lesspadding qwe" style={body}>

                <div className="cover-grid">
                    <div className="cover">color</div>
                    <div className="container px-5 profile-page">
                        <div className="user-profile-area">
                            <div className="user-col-profile">
                                <ProfileImg src={userdata.urs_profile_img} type="show" />
                                <p className="username-profile fs-5">{userdata.urs_name}</p>
                                <p className="follower-profile">follower</p>
                                <div className="group-btn-area">
                                    <button className="message-btn">แชท</button>
                                    <button className="follow-btn">ติดตาม</button>
                                </div>
                                <p className="bio-profile">{userdata.urs_bio}</p>
                            </div>
                            <div className="user-col-about">
                                <div className="user-about-menu">
                                    <p>overview</p>
                                    <p>about me</p>
                                </div>
                                <div className="user-about-content">
                                    <div className="user-about-review mb-4"><p className="fs-3">4.0</p> <p>จาก 5 รีวิว</p></div>
                                    <div className="user-about-text">
                                        <div>
                                            <p>งานสำเร็จแล้ว 10 งาน</p>
                                            <p>ใช้งานล่าสุดเมื่อ 12 ชั่วโมงที่แล้ว</p>
                                            <p>ตอบกลับภายใน 1 ชั่วโมง</p>
                                        </div>
                                        <div>
                                            <p>คอมมิชชัน เปิด</p>
                                            <p>คิวว่าง 1 คิว</p>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-profile-area-2">
                            ไไว้ใส่คอนเท้น
                        </div>
                    </div>

                </div>






                {/* <div class="container">
                    <div class="cover-img-relative">
                        <div class="profile-desc-box">
                            <div class="profile-img-profile-page">
                                <img src="b3.png" alt="" />
                            </div>
                            <div class="profile-desc-text">
                                <p class="profile-name">บู๋บี๋</p>
                                <p class="profile-follower">ผู้ติดตาม 0 คน</p>
                                <p class="profile-bio">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>


                                <button class="profile-chat-btn">แชท</button>
                                <button class="profile-follow-btn">ติดตาม</button>


                            </div>
                        </div>
                        <div class="common-profile-page">

                            <div class="profile-overview">
                                <p>รีวิว</p>
                                <p>งานที่เสร็จ</p>
                                <p>ใช้งานล่าสุด</p>
                            </div>

                        </div>

                        <div class="cover-img-box">
                            <div class="cover-img"></div>
                            <p>ว่าง</p>
                        </div>
                    </div>

                    <div class="content-type">
                        <a href="">ทั้งหมด</a><a href="">คอมมิชชัน</a><a href="">แกลอรี่</a>
                    </div>
                </div> */}
            </div>


        </>
    );
}