import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "../css/indexx.css";
import "../css/allinput.css";
import "../css/allbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import SettingAside from "../components/SettingAside";
import ProfileImg from "../components/ProfileImg";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import ChangePasswordModal from "../modal/ChangePasswordModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import TextareaAutosize from "react-textarea-autosize";
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as alertData from "../alertdata/alertData";

const title = "ตั้งค่าโปรไฟล์";
const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

export default function SettingProfile() {
  const [form_data, setForm_data] = useState(false);
  const Close_form_data = () => setForm_data(false);
  const editprofile_data = () => setForm_data(true);

  // let test = String(userdata.urs_name);
  // let t = String(userdata.urs_bio)

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
    watch,
  } = useForm({
    // defaultValues: {
    //     username: watchUsername,
    //     bio: watchBio,
    // }
  });

  const token = localStorage.getItem("token");

  // let userdata = []
  const [userdata, setUserdata] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [bankname, setBankname] = useState("");
  const [bankuser, setBankuser] = useState("");
  const [banknum, setBanknum] = useState("");

  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
    setPreviewUrl(URL.createObjectURL(image));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/profile");
      }
    } else {
      navigate("/login");
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
          setName(data.users[0].urs_name);
          setBio(data.users[0].urs_bio);
          setBankuser(data.users[0].urs_bank_name);
          setBankname(data.users[0].urs_bank_accname);
          setBanknum(data.users[0].urs_bank_number);
          // userdata= data.users[0];
        } else if (data.status === "error") {
            toast.error(data.message, toastOptions);
        } else {
            toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };
  const profileupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    await axios
      .patch("http://localhost:3333/profile/update", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Update Success");
          window.location = "/setting-profile";
        } else {
          //   toast.error(data.message, toastOptions);
        }
      });
  };

  const watchBio = watch("bio", String(userdata.urs_bio));
  const watchUsername = watch("username", String(userdata.urs_name));

  const [hide, setHide] = useState("none");

  const editProfile = () => {
    const bio = document.getElementById("bio");
    bio.removeAttribute("disabled");
    bio.style.borderColor = "black";

    const username = document.getElementById("username");
    username.removeAttribute("disabled");
    username.style.borderColor = "black";

    let editProfileBtn = document.getElementById("editProfileBtn");
    let sendDataBtn = document.getElementById("sendDataBtn");
    editProfileBtn.style.display = "none";
    sendDataBtn.style.display = "block";
    setHide("block");
  };

  const addProfileImg = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var file = e.target.files[0];
    };
    input.click();
  };

  const [showPsswordModal, setShowPsswordModal] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const [showCoverModal, setShowCoverModal] = useState(null);

  const openPassModal = () => {
    const PasswordModal = (
      <ChangePasswordModal  setShowPsswordModal={setShowPsswordModal} />
    );
    setShowPsswordModal(PasswordModal);
  };


  const openProfileModal = () => {
    const ProfileModal = (
      <ChangeProfileImgModal profile={userdata.urs_profile_img} setShowProfileModal={setShowProfileModal} />
    );
    setShowProfileModal(ProfileModal);
  };

  const openCoverModal = () => {
    const CoverModal = (
      <ChangeCoverModal profile={userdata.urs_profile_img} setShowCoverModal={setShowCoverModal} />
    );
    setShowCoverModal(CoverModal);
  };

  const openColorInput = () => {
    const btnElementClass =
      document.getElementsByClassName("submit-color-btn")[0].classList;
    btnElementClass.add("show-btn");
  };

  const UserDelete = () => {
    Swal.fire({ ...alertData.deleteAccountConfirm }).then((result) => {
      if (result.isConfirmed) { 
        const tested = "";
        axios
          .put("http://localhost:3333/delete_account", tested,{
            headers: {
              Authorization: "Bearer " + token
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              Swal.fire({ ...alertData.deleteAccountIsConfirmed }).then(() => {
                // window.location.reload(false);
                localStorage.removeItem("token");
                window.location = "/welcome";
              });
            } else if (data.status === "error") {
              toast.error(data.message, toastOptions);
            } else {
              toast.error("ไม่พบผู้ใช้งาน", toastOptions);
            }
          });
          }
    })
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {showPsswordModal}
      {showProfileModal}
      {showCoverModal}

      {/* <Navbar /> */}
      <NavbarUser/>
      
      <div className="setting-container">
        <SettingAside onActive="profile" />
        <div className="setting-content-box">
          <div className="settingCard">
            <div>
              <h2 className="setting-headding">โปรไฟล์</h2>
            </div>
            <div className="in-setting-page">
              <form onSubmit={profileupdate}>
                <div className="setting-img-box text-align-center">
                  <div
                    className="setting-cover"
                    onClick={openCoverModal}
                    style={{ backgroundColor: "pink" }}
                  >
                    <div className="cover-hover">
                      <p className="fs-5">เปลี่ยนสีปก</p>
                    </div>
                  </div>
                  <ProfileImg
                    src={userdata.urs_profile_img}
                    onPress={openProfileModal}
                  />
                  <div className="submit-color-btn-area">
                    <button className="submit-color-btn" type="submit">
                      บันทึกข้อมูล
                    </button>
                  </div>
                </div>

                <div>
                  <label class="onInput">ชื่อผู้ใช้</label>
                  <TextareaAutosize
                    className="txtarea"
                    id="username"
                    maxlength="50"
                    disabled
                    {...register("username", { maxLength: 50 })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p
                    className="text-align-right"
                    style={{ display: `${hide}` }}
                  >
                    {watchUsername.length}/50
                  </p>

                  <label class="onInput">คำอธิบายตัวเอง</label>
                  <TextareaAutosize
                    className="txtarea"
                    id="bio"
                    maxlength="350"
                    disabled
                    {...register("bio", { maxLength: 350 })}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <p
                    className="text-align-right"
                    style={{ display: `${hide}` }}
                  >
                    {watchBio.length}/350
                  </p>
                </div>
                <div className="text-align-center" id="sendDataBtn">
                  <button className="gradiant-btn" type="submit">
                    บันทึกข้อมูล
                  </button>
                  <button className="cancle-btn" type="button">
                    ยกเลิก
                  </button>
                </div>
              </form>
              <div className="text-align-center" id="editProfileBtn">
                <button className="edit-profile-btn" onClick={editProfile}>
                  แก้ไขโปรไฟล์
                </button>
              </div>
            </div>
          </div>

          <div className="settingCard">
            <div>
              <h2 className="setting-headding">อีเมลและรหัสผ่าน</h2>
            </div>
            <div className="in-setting-page">
              <div>
                <p className="onInput">อีเมล</p>
                <p>
                {userdata.urs_email}{" "}
                  <button className="change-email gradient-border-btn">
                    <p>เปลี่ยนอีเมล</p>
                  </button>
                </p>
                <p className="onInput">รหัสผ่าน</p>
                <button
                  className="change-pass gradient-border-btn"
                  onClick={openPassModal}
                >
                  <p>เปลี่ยนรหัสผ่าน</p>
                </button>
              </div>
            </div>
          </div>

          
          <div className="settingCard" style={{border:"none",padding:"0"}}>
            <Button variant="outline-danger" className="text-align-center" onClick={UserDelete}>ลบบัญชีผู้ใช้</Button>
          </div>
                
                {/* <p className="onInput">อีเมล</p>
                <p>
                {userdata.urs_email}{" "}
                  <button className="change-email gradient-border-btn">
                    <p>เปลี่ยนอีเมล</p>
                  </button>
                </p>
                <p className="onInput">รหัสผ่าน</p>
                <button
                  className="change-pass gradient-border-btn"
                  onClick={openPassModal}
                >
                  <p>เปลี่ยนรหัสผ่าน</p>
                </button> */}

        </div>
      </div>
    </>
  );
}
