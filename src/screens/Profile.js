
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
import ArtistBox from '../components/ArtistBox'


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

const host = "http://188.166.218.38:3333";
// const host = "http://localhost:3333";

export default function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [userdata, setUserdata] = useState([]);
    const [showCoverModal, setShowCoverModal] = useState(null)
    const [showProfileModal, setShowProfileModal] = useState(null)

    const [myFollowerData, setMyFollowerData] = useState([]);
    const [IFollowerData, setIFollowerData] = useState([]);

    const [myCommission, setMyCms] = useState([]);
    const [myGallery, setMyGallery] = useState([]);
    
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
        getMyCms();
        getMyGallery();
    }, []);
    // }, [myFollower,iFollowing]); //realtime follow

    // useEffect(() => {},[])
    // const [myFollower, setMyFollower] = useState([])
    // console.log(myFollower);
    
    const getUser = async () => {
        await axios
          .get(`${host}/profile`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setUserdata(data.users[0]);
                axios .get(`${host}/openFollowing?iFollowing=${data.IFollowingsIds}`).then((response) => {
                    const data = response.data;
                    setIFollowerData(data.ifollowing)
                })
                axios .get(`${host}/openFollower?myFollower=${data.MyFollowerIds}`).then((response) => {
                    const data = response.data;
                    setMyFollowerData(data.myfollower)
                })
                
            } else if (data.status === "no_access") {
                alert(data.message);
                navigate('/admin');
            } else {
            //   toast.error("ไม่พบผู้ใช้งาน", toastOptions);
            }
          }).catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data === "Token has expired") {
                alert("Token has expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
              } else {
                console.error("Error:", error);
              }
          });
    };

    const getMyCms = async () => {
        await axios.get(`${host}/myCommission`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            const myCms = response.data;
            setMyCms(myCms.commissions);
        })
    };

    const getMyGallery = async () => {
        await axios.get(`${host}/myGallery`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            const data = response.data;
            setMyGallery(data.myGallery);
        })
    }

    function menuProfile(event, menu) {
        setprofileMenuSelected(menu)
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
        <div className="body-con">
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
                        <div className="cover-color" style={{ backgroundColor: userdata.urs_cover_color }}></div>
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
                                        <button className="sub-menu">overview</button>
                                        <button className="sub-menu">about me</button>
                                    </div>
                                    <div className="user-about-content">
                                        <div className="user-about-review mb-4"><p className="fs-3">4.0</p> <p>จาก 5 รีวิว</p></div>
                                        <div className="user-about-text">
                                            <div>
                                                <p>ผู้ติดตาม {myFollowerData.length} </p>
                                                <p>กำลังติดตาม {IFollowerData.length} </p>
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
                            <div className="user-profile-contentCard sub-menu-group">
                                <Link className="sub-menu selected" onClick={(event) => menuProfile(event, 'cms')}>คอมมิชชัน</Link>
                                <Link className="sub-menu" onClick={(event) => menuProfile(event, 'gallery')}>แกเลอรี</Link>
                                <Link className="sub-menu" onClick={(event) => menuProfile(event, 'review')}>รีวิว</Link>
                                <Link className="sub-menu" onClick={(event) => menuProfile(event, 'follower')}>ผู้ติดตาม</Link>
                                <Link className="sub-menu" onClick={(event) => menuProfile(event, 'following')}>กำลังติดตาม</Link>
                            </div>
                            {profileMenuSelected === "cms" ? <AllCms myCommission={myCommission} userID={userdata.id}/> : null}
                            {profileMenuSelected === "gallery" ? <AllArtworks myGallery={myGallery} /> : null}
                            {profileMenuSelected === "review" ? <AllReviews /> : null}
                            {profileMenuSelected === "follower" ? <Followers myFollowerData={myFollowerData}/> : null}
                            {profileMenuSelected === "following" ? <Followings IFollowerData={IFollowerData}/> : null}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function Followers(props) {
    const {myFollowerData} = props

    return <>
        <p className="h3 mt-3 mb-2">ผู้ติดตาม</p>
        {myFollowerData.map(data => (
            <a key={data.id} href={`/profile/${data.id}`}>
                <div className="artistbox-items">
                    <ArtistBox img={data.urs_profile_img} name={data.urs_name}/>
                </div>
            </a>
        ))}


    </>
}

function Followings(props) {
    const { IFollowerData } = props;

    return <>
        <p className="h3 mt-3 mb-2">กำลังติดตาม</p>   
        <div className="artistbox-items">
            {IFollowerData.map(data => (
                <a key={data.id} href={`/profile/${data.id}`}>
                    <ArtistBox img={data.urs_profile_img} name={data.urs_name}/>
                </a>
            ))}
        </div>
    </>
}

function AllCms(props) {
    const { myCommission, userID } = props;
    return <>
        <p className="h3 mt-3 mb-2">คอมมิชชัน</p>
        <div class="content-items">
            {myCommission.map(mycms => (
                <div key={mycms.cms_id} style={{display:"flex"}}>
                <Link to={`/cmsdetail/${mycms.cms_id}`}>
                    <CmsItem src={mycms.ex_img_path} headding={mycms.cms_name} price="100" desc={mycms.cms_desc}/>
                </Link>
                </div>
            ))}
        </div>
    </>
}

function AllArtworks(props) {
    const { myGallery } = props
    return <>
        <p className="h3 mt-3 mb-2">แกเลอรี</p>
        <div className="profile-gallery-container">
            {myGallery.map((data)=>(
                <div className="profile-gallery" key={data.artw_id}>
                    <img src={data.ex_img_path} />
                </div>
            ))}
            {/* <div className="profile-gallery">
                <img src="b3.png" />
                <img src="AB1.png" />
                <img src="mainmoon.jpg" />
                <img src="b3.png" />
                <img src="b3.png" />
            </div> */}
        </div>
    </>
}

function AllReviews(props) {
    return <>
        <p className="h3 mt-3 mb-2">รีวิว</p>
    </>
}