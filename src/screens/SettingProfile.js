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
import { host } from "../utils/api";

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
  } = useForm({});

  const token = localStorage.getItem("token");

  // let userdata = []
  const [userdata, setUserdata] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [bankAccName, setBankAccName] = useState("");
  const [ppNumber, setPpNumber] = useState("");
  const [cover, setCover] = useState("");
  const [editProfileBtn, setEditProfileBtn] = useState(true);
  const [editPromptpayBtn, setEditPromptpayBtn] = useState(true);

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
      .get(`${host}/profile`, {
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
          setCover(data.users[0].urs_cover_color);
          setBankAccName(data.users[0].urs_account_name);
          setPpNumber(data.users[0].urs_promptpay_number);

          // userdata= data.users[0];
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
  const profileupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    await axios
      .patch(`${host}/profile/update`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          // alert("Update Success");
          // window.location = "/setting-profile";
          Swal.fire({ ...alertData.success }).then(() => {
            window.location.reload(false);
          });
        } else {
          //   toast.error(data.message, toastOptions);
        }
      });
  };

  const bankupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bankAccName", bankAccName);
    formData.append("ppNumber", ppNumber);
    await axios
      .patch(`${host}/bank/update`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          // alert("Update Success");
          // window.location = "/setting-profile";
          Swal.fire({ ...alertData.success }).then(() => {
            window.location.reload(false);
          });
        } else {
          //   toast.error(data.message, toastOptions);
        }
      });
  };

  const [hide, setHide] = useState("none");

  const editProfile = () => {
    setEditProfileBtn(prevState => !prevState);
  };

  const editPromptpay = () => {
    setEditPromptpayBtn(prevState => !prevState);
  };

  const addProfileImg = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var file = e.target.files[0];
    };
    input.click();
  };

  // const [isShow, setIsShow] = useState(false);

  // const handleHidden = () => {
  //     setIsShow(prevState => !prevState);
  // };

  // const handleHide = () => {
  //   setIsShow(prevState => !prevState);
  //     // setHide("none");
  // };

  const [showPsswordModal, setShowPsswordModal] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const [showCoverModal, setShowCoverModal] = useState(null);

  const openPassModal = () => {
    const PasswordModal = (
      <ChangePasswordModal setShowPsswordModal={setShowPsswordModal} />
    );
    setShowPsswordModal(PasswordModal);
  };

  const openProfileModal = () => {
    const ProfileModal = (
      <ChangeProfileImgModal
        profile={userdata.urs_profile_img}
        setShowProfileModal={setShowProfileModal}
      />
    );
    setShowProfileModal(ProfileModal);
  };

  const openCoverModal = () => {
    const CoverModal = (
      <ChangeCoverModal
        profile={userdata.urs_profile_img}
        setShowCoverModal={setShowCoverModal}
      />
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
          .put(`${host}/delete_account`, tested, {
            headers: {
              Authorization: "Bearer " + token,
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
    });
  };

  return (
    <div className="body-con">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {showPsswordModal}
      {showProfileModal}
      {showCoverModal}

      {/* <Navbar /> */}
      <NavbarUser />

      <div className="setting-container">
        <SettingAside onActive="profile" />
        <div className="setting-content-box">
          <div className="settingCard">
            <div>
              <h2 className="setting-headding">โปรไฟล์</h2>
            </div>
            <div className="in-setting-page">
              <form onSubmit={profileupdate}>
                <div className="setting-img-box">
                  <div
                    className="setting-cover"
                    onClick={openCoverModal}
                    style={{ backgroundColor: cover }}
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
                    <button className="submit-color-btn" type="submit" >
                      บันทึกข้อมูล
                    </button>
                  </div>
                </div>

                {/* มีปัญหา */}
                <div>
                  <label class="onInput">ชื่อผู้ใช้</label>
                  <TextareaAutosize
                    className="txtarea"
                    id="username"
                    maxlength="50"
                    disabled={editProfileBtn}
                    style={{ border: !editProfileBtn && '1px solid black'}}
                    {...register("username", { maxLength: 50 })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p
                    className="text-align-right"
                    style={{ display: editProfileBtn? 'none' : 'block' }}
                  >
                    {name.length}/50
                  </p>

                  <label class="onInput">คำอธิบายตัวเอง</label>
                  <TextareaAutosize
                    className="txtarea"
                    id="bio"
                    maxlength="350"
                    disabled={editProfileBtn}
                    style={{ border: !editProfileBtn && '1px solid black'}}
                    {...register("bio", { maxLength: 350 })}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <p
                    className="text-align-right"
                    style={{ display: editProfileBtn? 'none' : 'block' }}
                  >
                    {/* {bio.length}/350 */}
                  </p>
                </div>

                <div className="" id="sendDataBtn" style={{ display:"flex",justifyContent: "center" }}>
                  {!editProfileBtn&& <><button className="gradiant-btn" type="submit">
                    บันทึกข้อมูล
                  </button>
                  <button className="cancle-btn" type="button" onClick={editProfile}>
                    ยกเลิก
                    </button></>}
                  {editProfileBtn && <button className="edit-profile-btn" onClick={editProfile}>
                  แก้ไขโปรไฟล์
                </button>}
                </div>
              </form>
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
                  {/* <button className="change-email gradient-border-btn">
                    <p>เปลี่ยนอีเมล</p>
                  </button> */}
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

          <div className="settingCard">
            <div>
                <h2 className="setting-headding">บัญชีพร้อมเพย์</h2>
            </div>
            <div className="in-setting-page">
                <form onSubmit={bankupdate}>
                  <div>
                      <label class="onInput">ชื่อบัญชีพร้อมเพย์</label>
                      <TextareaAutosize
                          className="txtarea"
                          id="bankAccName"
                          maxlength="50"
                          disabled={editPromptpayBtn}
                          style={{ border: !editPromptpayBtn && '1px solid black'}}
                          {...register("bankAccName", { maxLength: 50 })}
                          value={bankAccName}
                          onChange={(e) => setBankAccName(e.target.value)}
                      />
                      <p
                        className="text-align-right"
                        style={{ display: editPromptpayBtn? 'none' : 'block' }}
                      >
                        {bankAccName.length}/200
                      </p>
                    

                      <label class="onInput">เลขพร้อมเพย์</label>
                      <TextareaAutosize
                          className="txtarea"
                          id="ppNumber"
                          maxlength="350"
                          disabled={editPromptpayBtn}
                          style={{ border: !editPromptpayBtn && '1px solid black'}}
                          {...register("ppNumber", { maxLength: 50 })}
                          value={ppNumber}
                          onChange={(e) => setPpNumber(e.target.value)}
                      />
                      <p
                        className="text-align-right"
                        style={{ display: editPromptpayBtn? 'none' : 'block' }}
                      >
                        {ppNumber.length}/50
                      </p>

                  </div>
                  <div className="" id="sendDataBtn" style={{ display:"flex",justifyContent: "center" }}>
                    {!editPromptpayBtn&& <>
                      <button className="gradiant-btn" type="submit" >
                        บันทึกข้อมูล
                      </button>
                      <button className="cancle-btn" type="button" onClick={editPromptpay}>
                        ยกเลิก
                      </button> </>
                    }
                    {editPromptpayBtn && <button className="edit-profile-btn" onClick={editPromptpay}>
                      แก้ไขข้อมูลบัญชีธนาคาร
                    </button>}
                  </div>
                </form>
     
            </div>
          </div>

          <div className="settingCard" style={{ border: "none", padding: "0" }}>
            <Button
              variant="outline-danger"
              className="text-align-center"
              onClick={UserDelete}
            >
              ลบบัญชีผู้ใช้
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
