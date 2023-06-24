import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
// import Profile from './Profile';
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import CmsItem from "../components/CmsItem";


const title = 'หน้าแรก';
const bgImg = "";
const body = { backgroundImage: "url('seamoon.jpg')" }

export default function Index() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [urs_token, setUrs_token] = useState();
  console.log(userdata);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:3333/index", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
          setUrs_token(data.urs_token);
        } else if (data.status === "no_access") {
          alert(data.message);
          navigate("/admin");
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    // <div className="Index">
    //   <h1>
    //     Welcome,
    //     {userdata.id + " " + userdata.urs_email + " " + userdata.urs_name}
    //   </h1>
    //   <img src={userdata.urs_profile_img} style={{width: "50px", height: "50px", borderRadius:"50px"}}/>
    //   <h3>เหรียญที่มี : {urs_token}</h3>
    //   <Button variant="contained" onClick={() => navigate("/buycoin")}>
    //     ซื้อเหรียญ
    //   </Button>
    //   <Button variant="contained" onClick={() => navigate("/userprofile")}>
    //     จัดการโปรไฟล์
    //   </Button>
    //   <Button variant="contained" onClick={() => navigate("/setting-coin")}>
    //     ดูประวัติการเติมเงิน
    //   </Button>
    //   <br/><br/><br/><br/>
    //   <Button variant="contained" onClick={() => navigate("/editprofile")}>
    //     จัดการโปรไฟล์-เทส
    //   </Button>
    //   <Button variant="contained" onClick={() => navigate("/transaction")}>
    //     ประวัติการเติมเงิน-เทส
    //   </Button>
    //   {userdata.urs_type === 3 && (
    //     <>
    //     <Button variant="contained" onClick={() => navigate("/packagetoken")}>
    //       Package Token
    //     </Button>
    //     <Button variant="contained" onClick={() => navigate("/alluser")}>
    //       AllUser
    //     </Button>
    //     </>
    //   )}
    //   <br/><br/>
    //   <Button variant="contained" onClick={handleLogout}>
    //     Logout
    //   </Button>
    // </div>
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavbarUser />
      <div class="body-nopadding" style={body}>
        <div className="container">
          <div class="search-container">
            <div class="search-box">
              <button>
                <Icon.Search className="nav-icon" />
              </button>
              <input type="text" placeholder="ค้นหาคอมมิชชัน, นักวาด, หัวข้อ" />
            </div>
            <div class="popular-topic">
              <p>หัวข้อยอดนิยม :</p>
              <a href="">semi-real</a>
              <a href="">chibi</a>
              <a href="">landscape</a>
            </div>
          </div>

          <div className=" content-container user-profile-contentCard">
            <div class="content-type">
              <button className="sub-menu selected">ทั้งหมด</button>
              <button className="sub-menu">คอมมิชชัน</button>
              <button className="sub-menu">แกลลอรี่</button>
              <button className="sub-menu">นักวาด</button>
              <button className="sub-menu">หัวข้อ</button>
            </div>
            <div class="content-box">
              <div class="content-top">
                <h2>คอมมิชชันล่าสุด</h2>
              </div>
              <div class="content-items">
                <CmsItem />
                <CmsItem />
                <CmsItem />
                <CmsItem />
                <CmsItem />
                <CmsItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
