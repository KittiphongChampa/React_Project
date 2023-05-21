
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import * as Icon from 'react-feather';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from '../yunscreens/Profile';
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";


import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
// import { Button } from 'react-bootstrap/Button';
import Button from "react-bootstrap/Button";

const title = 'Profile';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function UserProfile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [userdata, setUserdata] = useState([]);
    const [showCoverModal, setShowCoverModal] = useState(null)
    const [showProfileModal, setShowProfileModal] = useState(null)

    const [myFollower, setMyFollowerIds] = useState([]);
    const [iFollowing, setIFollowingsIds] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
          if (window.location.pathname === "/login") {
            navigate("/profile")
          }
        } else {
          navigate("/login")
        }
        getUser();
    }, [myFollower,iFollowing]);
    
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
              setMyFollowerIds(data.MyFollowerIds);
              setIFollowingsIds(data.IFollowingsIds);
            } else if (data.status === "no_access") {
                alert(data.message);
                navigate('/admin');
            } else {
            //   toast.error("ไม่พบผู้ใช้งาน", toastOptions);
            }
          });
    };
    
    const openModal = (modal) => {
        if (modal === "profile") {
            const ProfileModal = <ChangeProfileImgModal profile={userdata.urs_profile_img} setShowProfileModal={setShowProfileModal} />
            setShowProfileModal(ProfileModal)
        } else {
            const CoverModal = <ChangeCoverModal profile={userdata.urs_profile_img} setShowCoverModal={setShowCoverModal} />
            setShowCoverModal(CoverModal)
            // openInputColor()
        }
    }


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {showCoverModal}
            {showProfileModal}
            {/* <Navbar /> */}
            <NavbarUser/>
            <div class="body-nopadding" style={body}>

                <div className="cover-grid">
                    <div className="cover" onClick={openModal}>
                        <div className="cover-color"></div>
                        <div className="cover-hover"><p className="fs-5">เปลี่ยนสีปก</p></div>
                    </div>
                    <div className="container profile-page">
                        <div className="user-profile-area">
                            
                                <div className="user-col-profile">
                                    <ProfileImg src={userdata.urs_profile_img} type="show"
                                        onPress={() => openModal("profile")}
                                    />
                                    {/* <ProfileImg src="b3.png" type="show" onPress={() => openModal("profile")} /> */}
                                    <p className="username-profile fs-5">{userdata.urs_name}</p>
                                    <p className="follower-profile">follower</p>
                                    <div className="group-btn-area">
                                        {/* <button className="message-btn"><Icon.MessageCircle /></button>
                                        <button className="follow-btn">ติดตาม</button> */}
                                        <a href="/setting-profile"><button className="follow-btn" >แก้ไขโปรไฟล์</button></a>
                                    </div>
                                    <p className="bio-profile">
                                        {userdata.urs_bio}
                                    </p>
                                </div>
                                <div className="user-col-about">
                                    <div className="user-about-menu">
                                        <button className="sub-menu selected">overview</button>
                                        <button className="sub-menu">about me</button>
                                    </div>
                                    <div className="user-about-content">
                                        <div className="user-about-review mb-4"><p className="fs-3">4.0</p> <p>จาก 5 รีวิว</p></div>
                                        <div className="user-about-text">
                                            <div>
                                                <p>ผู้ติดตาม {myFollower.length}</p>
                                                <p>กำลังติดตาม {iFollowing.length}</p>
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
                        <div className="user-profile-contentCard">
                            <button className="sub-menu selected">ทั้งหมด</button>
                            <button className="sub-menu">คอมมิชชัน</button>
                            <button className="sub-menu">แกลลอรี่</button>
                            <button className="sub-menu">รีวิว</button>
                        </div>
                    </div>

                </div>

            </div>
            {/* <div class="body-lesspadding qwe" style={body}>

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
            </div> */}

            

        </>
    );
}