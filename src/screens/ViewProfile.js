import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import axios from "axios";
import { useNavigate, useParams, Link, useLocation  } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from "../yunscreens/ProfileTest";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal";
// import { Button } from 'react-bootstrap/Button';
import Button from "react-bootstrap/Button";

const title = "ViewProfile";
const bgImg = "";
const body = { backgroundColor: "#F4F1F9" };

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function ViewProfile() {
  const jwt_token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [follow, setFollow] = useState([]);
  const [myFollower, setFollowIds] = useState([]);

  const [myFollowerData, setMyFollowerData] = useState([]);
  

  const [showCoverModal, setShowCoverModal] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   if (window.location.pathname === "/login") {
    //     navigate("/profile")
    //   }
    // } else {
    //   navigate("/login")
    // }
    // getUser();

    // setLoading(true);
    getUserProfile();
  }, [myFollower]);

  // const getUser = async () => {
  //     await axios
  //       .get("http://localhost:3333/profile", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       })
  //       .then((response) => {
  //         const data = response.data;
  //         if (data.status === "ok") {
  //           setUserdata(data.users[0]);
  //         } else if (data.status === "no_access") {
  //             alert(data.message);
  //             navigate('/admin');
  //         } else {
  //         //   toast.error("ไม่พบผู้ใช้งาน", toastOptions);
  //         }
  //       });
  // };

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
          setFollow(data.message);
          setFollowIds(data.followerIds);
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };

  const eventfollow = async () => {
    try {
      await axios.post(
        "http://localhost:3333/follow", {id} ,{
          headers: {
            Authorization: "Bearer " + jwt_token,
          },
        }
      ).then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          // window.location.reload(false);
        }else {
          toast.error("เกิดข้อผิดพลาด", toastOptions);
        }
      })
    } catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น
    }
  };

  const eventUnfollow = async () => {
    try {
      await axios.delete(
        `http://localhost:3333/unfollow/${id}`,{
          headers: {
            Authorization: "Bearer " + jwt_token,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          // window.location.reload(false);
        }else {
          toast.error("เกิดข้อผิดพลาด", toastOptions);
        }
      })
    }catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น
    }
  }

  const Chat = () => {
    console.log(userdata.id);
  } 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adminParam = queryParams.get('admin');

  useEffect(() => {
    // ทำอะไรก็ตามที่คุณต้องการกับ adminParam ที่ได้มา
  }, [adminParam]);

  const openFollower = () => {
    const formData = new FormData();
    formData.append("myFollower", myFollower);
    axios .post("http://localhost:3333/openFollower", formData,{
        headers: {
            Authorization: "Bearer " + jwt_token,
        },
    }).then((response) => {
        const data = response.data;
        setMyFollowerData(data.results)
    })
  }


  
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {showCoverModal}
        {showProfileModal}
        {/* <Navbar /> */}

        {adminParam === null ? (
          <NavbarUser />
        ) : (
          <NavbarAdmin />
        )}


        <div class="body-nopadding" style={body}>
          <div className="cover-grid">
            <div
              className="cover"
              // onClick={openModal}
            >
              <div className="cover-color" style={{ backgroundColor: userdata.urs_cover_color }}></div>
            </div>
            <div className="container profile-page">
              <div className="user-profile-area">
                <div className="user-col-profile">
                  <ProfileImg
                    src={userdata.urs_profile_img}
                    type="show"
                    // onPress={() => openModal("profile")}
                  />
                  {/* <ProfileImg src="b3.png" type="show" onPress={() => openModal("profile")} /> */}
                  <p className="username-profile fs-5">{userdata.urs_name}</p>
                  <p className="follower-profile">follower</p>
                  {adminParam === null ? (
                    <div className="group-btn-area">
                      {follow === "no_follow" ? (
                          <button className="follow-btn" onClick={eventfollow}>ติดตาม</button>
                      ) : (
                          <button className="follow-btn" onClick={eventUnfollow}>เลิกติดตาม</button>
                      )}

                      <a href={`/chatbox?id=${userdata.id}`}>
                      {/* <Link to={{ pathname: "/chatbox", state: { data: id } }}> */}
                        <button className="follow-btn" onClick={Chat}>แชท</button>
                      {/* </Link> */}
                      </a>

                    </div>
                  ) : (
                    <></>
                  )}
                  
                  <p className="bio-profile">{userdata.urs_bio}</p>
                </div>
                <div className="user-col-about">
                  <div className="user-about-menu">
                    <button className="sub-menu selected">overview</button>
                    <button className="sub-menu">about me</button>
                  </div>
                  <div className="user-about-content">
                    <div className="user-about-review mb-4">
                      <p className="fs-3">4.0</p> <p>จาก 5 รีวิว</p>
                    </div>
                    <div className="user-about-text">
                      <div>
                        <p>ผู้ติดตาม {myFollower.length} <button onClick={openFollower}>ดู</button></p>
                        <div>
                          {myFollowerData.map(data => (
                              <a key={data.id} href={`/profile/${data.id}`} style={{display : "flex"}}>
                                  <img src={data.urs_profile_img} style={{width: "30px"}}/>
                                  <p>{data.urs_name}</p>
                              </a>
                          ))}
                        </div>
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
      </>
    );
}
