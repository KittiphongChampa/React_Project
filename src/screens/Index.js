import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import "../styles/main.css";
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
import { wait } from "@testing-library/user-event/dist/utils";

const host = "http://localhost:3333";
const title = 'หน้าแรก';
const bgImg = "";
const body = { backgroundImage: "url('seamoon.jpg')" }

export default function Index() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
    getUser();
    getLatestCommission();
    getArtistCommission();
    getPopular();
  }, []);
  const token = localStorage.getItem("token");
  const getUser = async () => {
    await axios
      .get(`${host}/index`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
        } else if (data.status === "no_access") {
          alert(data.message);
          navigate("/admin");
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401 && error.response.data === "Token has expired") {
          // Handle token expired error
          alert("Token has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          // Handle other errors here
          console.error("Error:", error);
        }
      });
  };
  const [cmsLatests, setCmsLatest] = useState([]);
  const [cmsArtists, setCmsArtist] = useState([]);
  const [cmsPopular, setCmsPopular] = useState([]);
  console.log(cmsPopular);
  const getLatestCommission = async () => {
    await axios.get("http://localhost:3333/latestCommission", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const Cmslatest = response.data;
      setCmsLatest(Cmslatest.commissions)
    })
  }
  const getArtistCommission = async () => {
    await axios.get("http://localhost:3333/artistCommission", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const Cmsfollowing = response.data;
      setCmsArtist(Cmsfollowing.commissions);
    })
  }
  const getPopular = async () => {
    await axios.get("http://localhost:3333/popularCommission", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const Cmspopular = response.data;
      setCmsPopular(Cmspopular.commissions);
    })
  }
  const handleLinkClick = (cms_id) => {
    const clickstreamData = {
      userID: userdata.id,
      page_url: window.location.href+"cmsdetail/"+cms_id, // หรือใช้ URL ปัจจุบัน
      target_cms_id: cms_id, // ID ของคอมมิชชันที่ผู้ใช้คลิก
    };

    axios.post('http://localhost:3333/click', clickstreamData)
      .then(response => {
        console.log(response.data.message);
        // หลังจากบันทึก Clickstream เสร็จสิ้น คุณสามารถเรียกใช้การนำทางไปยังรายละเอียดคอมมิชชัน
        // โดยใช้ react-router-dom หรือวิธีการนำทางอื่น ๆ ตามที่คุณใช้
      })
      .catch(error => {
        console.error(error);
        // ในกรณีที่เกิดข้อผิดพลาดในการบันทึก Clickstream คุณสามารถจัดการตามที่เหมาะสม
      });
  };

  return (
    <div className="body-con">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />
            <div class="body-nopadding" style={body}>
                <div className="container">
                    <div class="search-container">
                        <div class="search-box-index">
                            <button><Icon.Search className='nav-icon' /></button>
                            <input type="text" placeholder="ค้นหาคิมมิชชัน แกลอรี่ นักวาด หัวข้อ..." />
                        </div>
                        <div class="popular-topic">
                            <p>หัวข้อยอดนิยม :</p>
                            <a href="">semi-real</a>
                            <a href="">chibi</a>
                            <a href="">landscape</a>
                        </div>
                    </div>

                    <div className=" content-container user-profile-contentCard" >
                        <div class="content-type">
                            <button className="sub-menu selected">สำหรับคุณ</button>
                            <button className="sub-menu">คอมมิชชัน</button>
                            <button className="sub-menu">แกลลอรี่</button>
                            <button className="sub-menu">นักวาด</button>
                            <button className="sub-menu">หัวข้อ</button>
                        </div>
                        <div class="content-box">
                            <div class="content-top">
                                <p className="h3">นักวาดที่คุณกำลังติดตาม</p>
                                <p>ดูทั้งหมด&gt;</p>
                            </div>
                            <div class="content-items">
                                
                            </div>
                        </div>
                        <div class="content-box">
                            <div class="content-top">
                                <p className="h3">ผลงานนักวาดที่กำลังติดตาม</p>
                                <p>ดูทั้งหมด&gt;</p>
                            </div>
                            <div class="content-items">

                            </div>
                        </div>

                        <div class="content-box">
                            <div class="content-top">
                                <p className="h3">คอมมิชชันล่าสุด</p>
                                <p>ดูทั้งหมด&gt;</p>
                            </div>
                            <div class="content-items">
                              {cmsLatests.map(cmsLatest => (
                                <div key={cmsLatest.cms_id} style={{display:"flex"}}>
                                  <Link to={`/cmsdetail/${cmsLatest.cms_id}`} onClick={() => handleLinkClick(cmsLatest.cms_id)} >
                                    <CmsItem src={cmsLatest.ex_img_path} headding={cmsLatest.cms_name} price="100" desc={cmsLatest.cms_desc}/>
                                  </Link>
                                </div>
                              ))}
                            </div>
                        </div>

                        <div class="content-box">
                            <div class="content-top">
                                <p className="h3">คอมมิชชันจากนักวาดที่ติดตาม</p>
                                <p>ดูทั้งหมด&gt;</p>
                            </div>
                        
                          <div class="content-items">
                            {cmsArtists.map(cmsArtstdata => (
                              <div key={cmsArtstdata.cms_id} style={{display:"flex"}}>
                                <Link to={`/cmsdetail/${cmsArtstdata.cms_id}`} onClick={() => handleLinkClick(cmsArtstdata.cms_id)}>
                                  <CmsItem src={cmsArtstdata.ex_img_path} headding={cmsArtstdata.cms_name} price="100" desc={cmsArtstdata.cms_desc}/>
                                </Link>
                              </div>
                            ))}
                          </div>
                       

                        </div>
                        <div class="content-box">
                            <div class="content-top">
                                <p className="h3">คอมมิชชันยอดนิยม</p>
                                <p>ดูทั้งหมด&gt;</p>
                            </div>
                            <div class="content-items">
                                {/* <Link to="/cmsdetail"><CmsItem src="monlan.png" headding="คอมมิชชัน SD" price="100" desc="คมช.เส้นเปล่า-ลงสีรับทุกสเกล สามารถเพิ่มตัวละครหรือเพิ่มพร็อพได้ โดยราคาขึ้นอยู่กับรายละเอียดที่เพิ่มเข้ามา" /></Link> */}
                                {/* {cmsPopular.map(cmsPop => (
                                  <div key={cmsPop.cms_id} style={{display:"flex"}}>
                                    <Link to={`/cmsdetail/${cmsPop.cms_id}`} onClick={() => handleLinkClick(cmsPop.cms_id)}>
                                      <CmsItem src={cmsPop.ex_img_path} headding={cmsPop.cms_name} price="100" desc={cmsPop.cms_desc}/>
                                    </Link>
                                  </div>
                                ))} */}
                            </div>
                        </div>

                    </div>
                </div>


            </div>


        </div>
  );
}
