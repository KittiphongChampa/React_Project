
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
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
import Navbar from "../components/Navbar";
import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from './Profile';

const title = 'ลืมรหัสผ่าน';
const bgImg = ""
const body = { backgroundColor: "pink" }


export default function ForgetPassword() {


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <div class="body-lesspadding " style={body}>
                <div className="cover">
                    <div className="container sss">
                        <div className="user-profile-area">
                            <div className="user-col-profile"></div>
                            <div className="user-col-about">
                                <div className="user-about-menu"></div>
                                <div className="user-about-content"></div>
                            </div>
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
