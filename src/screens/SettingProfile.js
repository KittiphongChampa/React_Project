
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allinput.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import SettingAside from '../components/SettingAside';
import ProfileImg from "../components/ProfileImg";
import DefaultTextArea from "../components/DefaultTextArea";
import {NavbarUser,NavbarAdmin,NavbarHomepage} from "../components/Navbar";
import ChangePasswordModal from "../modal/ChangePasswordModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import TextareaAutosize from 'react-textarea-autosize';
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
const title = 'สร้างบัญชี';



export default function SettingProfile() {
    const bioValue = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error explicabo minima excepturi tempore beatae, blanditiis dolorum fuga odit libero necessitatibus ducimus repudiandae porro natus dicta qui laboriosam aperiam iste.'
    const usernameValue = 'User123'
    const usernameRef = useRef(null);
    const bioRef = useRef(null);
    const modalChangePassRef = useRef(null);
    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, reset, watch } = useForm();
    const bio = watch("bio", "")
    const username = watch("username", "")
    const [hide, setHide] = useState("none")




    // const func = {
    //     register: register,
    //     errors: errors
    // }

    const editProfile = () => {
        const bio = document.getElementById("bio")
        bio.removeAttribute("disabled");
        bio.style.borderColor = 'black';


        const username = document.getElementById("username")
        username.removeAttribute("disabled");
        username.style.borderColor = 'black';

        // const usernameRefElement = usernameRef.current;
        // usernameRefElement.removeAttribute("disabled");
        // usernameRefElement.style.borderColor = 'black';

        // const bioRefElement = bioRef.current;
        // bioRefElement.removeAttribute("disabled");
        // bioRefElement.style.borderColor = 'black';

        let editProfileBtn = document.getElementById('editProfileBtn')
        let sendDataBtn = document.getElementById('sendDataBtn')
        editProfileBtn.style.display = 'none'
        sendDataBtn.style.display = 'block'
        setHide("block")
    }


    const addProfileImg = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            var file = e.target.files[0];
        }
        input.click();
    }

    // const [bioValue, setBioValue] = useState(bio);
    // const [usernameValue, setUsernameValue] = useState(username);

    // const [bioLenghtValue, setbioLenghtValue] = useState(null);
    // const [usernameLenghtValue, setUsernameLenghtValue] = useState(null);

    // const text = watch("text", "");


    // const inputValue = (event) => {
    //     setbioLenghtValue(event.target.bioValue);
    //     setUsernameLenghtValue(event.target.usernameValue);

    // };

    const submitChangePassForm = (data) => {
        console.log(data)
        console.log("มา")
    }

    const [showPsswordModal, setShowPsswordModal] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(null)
    const [showCoverModal, setShowCoverModal] = useState(null)

    const openPassModal = () => {
        const PasswordModal = <ChangePasswordModal setShowPsswordModal={setShowPsswordModal} />
        setShowPsswordModal(PasswordModal)
    }

    const openProfileModal = () => {
        const ProfileModal = <ChangeProfileImgModal setShowProfileModal={setShowProfileModal} />
        setShowProfileModal(ProfileModal)

    }

    const openCoverModal = () => {
        const CoverModal = <ChangeCoverModal setShowCoverModal={setShowCoverModal} />
        setShowCoverModal(CoverModal)

    }

    const openColorInput = () => {
        const btnElementClass = document.getElementsByClassName("submit-color-btn")[0].classList
        btnElementClass.add('show-btn')
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {showPsswordModal}
            {showProfileModal}
            {showCoverModal}

            <NavbarUser />
            <div className="setting-container">
                <SettingAside onActive='profile' />
                <div className="setting-content-box">

                    <div className="settingCard">
                        <div>
                            <h2 className="setting-headding">โปรไฟล์</h2>
                        </div>
                        <div className="in-setting-page">
                            <form>
                                <div className="setting-img-box text-align-center">
                                    <div className="setting-cover" onClick={openCoverModal} style={{ backgroundColor: "pink" }}>
                                        <div className="cover-hover"><p className="fs-5">เปลี่ยนสีปก</p></div>
                                        {/* <input className="" type="color" id="color-input" onClick={openColorInput} /> */}
                                    </div>
                                    <ProfileImg src="add-image.png" onPress={openProfileModal} />
                                    <div className="submit-color-btn-area" >
                                        <button className="submit-color-btn" type="submit">บันทึกข้อมูล</button>
                                    </div>

                                </div>

                                <div>
                                    <label class="onInput">ชื่อผู้ใช้</label>
                                    <TextareaAutosize className="txtarea" id="username" maxlength="50" disabled
                                        {...register("username", { maxLength: 4 })} />
                                    <p className="text-align-right" style={{ display: `${hide}` }}>{username.length}/50</p>

                                    <label class="onInput">คำอธิบายตัวเอง</label>
                                    <TextareaAutosize className="txtarea" id="bio" maxlength="350" disabled
                                        {...register("bio", { maxLength: 4, })} />
                                    <p className="text-align-right" style={{ display: `${hide}` }}>{bio.length}/350</p>



                                    {/* <DefaultTextArea headding="ชื่อผู้ใช้"
                                        id="username"
                                        value={usernameValue}
                                        onChange={inputValue}
                                        ref={usernameRef}
                                        disabled={true} />
                                    <DefaultTextArea headding="คำอธิบายตัวเอง"
                                        id="bio"
                                        value={bioValue}
                                        onChange={inputValue}
                                        ref={bioRef}
                                        disabled={true} /> */}
                                </div>
                                <div className="text-align-center" id='sendDataBtn'>
                                    <button className="gradiant-btn" type="submit">บันทึกข้อมูล</button>
                                    <button className="cancle-btn" type="cancle">ยกเลิก</button>
                                </div>
                            </form>
                            <div className="text-align-center" id='editProfileBtn'>
                                <button className="edit-profile-btn" onClick={editProfile}>แก้ไขโปรไฟล์</button>
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
                                {/* <button class="button">I'm A Button!</button> */}
                                <p>aaaa@gmail.com <button className="change-email gradient-border-btn" ><p>เปลี่ยนอีเมล</p></button></p>
                                <p className="onInput">รหัสผ่าน</p>
                                <button className="change-pass gradient-border-btn" onClick={openPassModal}><p>เปลี่ยนรหัสผ่าน</p></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

