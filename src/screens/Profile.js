
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
// import Profile from '../yunscreens/Profile';
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";


import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
// import { Button } from 'react-bootstrap/Button';
import Button from "react-bootstrap/Button";
import CmsItem from "../components/CmsItem";
import { Link } from 'react-router-dom';
import '../styles/main.css';

const title = 'Profile';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [userdata, setUserdata] = useState([]);
    const [showCoverModal, setShowCoverModal] = useState(null)
    const [showProfileModal, setShowProfileModal] = useState(null)

    const [myFollower, setMyFollowerIds] = useState([]);
    const [iFollowing, setIFollowingsIds] = useState([]);
    
    // console.log('myFollower : ',myFollower, 'iFollowing : ', iFollowing);

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
    // }, [myFollower,iFollowing]); //realtime follow

    // useEffect(() => {

    // },[])
    
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

    function menuProfile(event, menu) {
        let oldSelected = document.querySelector('.sub-menu.selected')
        oldSelected.classList.remove('selected')
        event.target.classList.add('selected')
        setprofileMenuSelected(menu)
    }
    
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

    const [profileMenuSelected, setprofileMenuSelected] = useState('cms')


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
                            {/* <button className="sub-menu selected" onClick={(event) => menuProfile(event, 'all')}>ทั้งหมด</button> */}
                            <button className="sub-menu selected" onClick={(event) => menuProfile(event, 'cms')}>คอมมิชชัน</button>
                            <button className="sub-menu" onClick={(event) => menuProfile(event, 'gallery')}>แกลลอรี่</button>
                            <button className="sub-menu" onClick={(event) => menuProfile(event, 'review')}>รีวิว</button>
                            {profileMenuSelected === "cms" ? <AllCms /> : null}
                            {profileMenuSelected === "gallery" ? <AllArtworks /> : null}
                            {profileMenuSelected === "review" ? <AllReviews /> : null}

                            {/* <div className="headding-seeall"><p className="h2">รีวิว</p> <p>ดูรีวิวทั้งหมด</p></div>
                            <div className="headding-seeall"><p className="h2">แกลอรี่</p> <p>ดูทั้งหมด</p></div> */}

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

function AllCms(props) {
    return <>
        <p className="h3 mt-3 mb-2">คอมมิชชัน</p>
        <div class="content-items">
            <Link to="/cmsdetail"><CmsItem src="AB1.png" price="100" headding="Chibi Style" desc="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/></Link>
            <Link to="/cmsdetail"><CmsItem src="Blaze_Taylor.png" price="500" headding="SD Style" desc="รับวาดรูปxxxx" /></Link>
            {/* <Link to="/cmsdetail"><CmsItem src="bird.png" price="100" headding="หัวข้อ3" desc="รับวาดรูปxxxx" /></Link> */}
            {/* <Link to="/cmsdetail"><CmsItem src="b3.png" price="100" headding="หัวข้อ4" desc="รับวาดรูปxxxx" /></Link> */}
        </div>

    </>
}

function AllArtworks(props) {
    return <>
        <p className="h3 mt-3 mb-2">แกลอรี่</p>
        <div className="profile-gallery">
            <img src="b3.png" />
            <img src="AB1.png" />
            <img src="mainmoon.jpg" />
            <img src="b3.png" />
            <img src="b3.png" />
        </div>
    </>
}

function AllReviews(props) {
    return <>
        <p className="h3 mt-3 mb-2">รีวิว</p>
    </>
}