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
import CmsItem from "../components/CmsItem";

const host = "http://localhost:3333";
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
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const { id } = useParams();
  const [userdata, setUserdata] = useState([]);
  const [follow, setFollow] = useState([]);
  const [myFollower, setFollowIds] = useState([]);
  const [myFollowerData, setMyFollowerData] = useState([]);
  
  const [showCoverModal, setShowCoverModal] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(null);
  // const [loading, setLoading] = useState(false);

  const [myCommission, setMyCms] = useState([]);
  const [profileMenuSelected, setprofileMenuSelected] = useState('cms')

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
    getUserCms();
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
      .get(`${host}/profile/${id}`, {
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

  const getUserCms = async () => {
    await axios.get(`${host}/userCommission/${id}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt_token,
        },
    }).then((response) => {
        const myCms = response.data;
        setMyCms(myCms.commissions);
    })
  };

  function menuProfile(event, menu) {
      let oldSelected = document.querySelector('.sub-menu.selected')
      oldSelected.classList.remove('selected')
      event.target.classList.add('selected')
      setprofileMenuSelected(menu)
  }

  const eventfollow = async () => {
    try {
      await axios.post(
        `${host}/follow`, {id} ,{
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
        `${host}/unfollow/${id}`,{
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
    axios .post(`${host}/openFollower`, formData,{
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
                <button className="sub-menu selected" onClick={(event) => menuProfile(event, 'cms')}>คอมมิชชัน</button>
                <button className="sub-menu" onClick={(event) => menuProfile(event, 'gallery')}>แกลลอรี่</button>
                <button className="sub-menu" onClick={(event) => menuProfile(event, 'review')}>รีวิว</button>
                {profileMenuSelected === "cms" ? <AllCms myCommission={myCommission} userID={userdata.id} /> : null}
                {profileMenuSelected === "gallery" ? <AllArtworks /> : null}
                {profileMenuSelected === "review" ? <AllReviews /> : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}


function AllCms(props) {
  const { myCommission, userID } = props;
  const handleLinkClick = (cms_id) => {
      const clickstreamData = {
      userID: userID,
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
  return <>
      <p className="h3 mt-3 mb-2">คอมมิชชัน</p>
      <div class="content-items">
          {myCommission.map(mycms => (
              <div key={mycms.cms_id} style={{display:"flex"}}>
              <Link to={`/cmsdetail/${mycms.cms_id}`} onClick={() => handleLinkClick(mycms.cms_id)}>
                  <CmsItem src={mycms.ex_img_path} headding={mycms.cms_name} price="100" desc={mycms.cms_desc}/>
              </Link>
              </div>
          ))}
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