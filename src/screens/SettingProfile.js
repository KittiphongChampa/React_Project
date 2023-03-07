
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useRef } from "react";

// ของข้อย

import "../css/indexx.css";
import "../css/allinput.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";


import SettingAside from '../components/SettingAside';
import ProfileImg from "../components/ProfileImg";
import DefaultTextArea from "../components/DefaultTextArea";
import { Form } from "react-router-dom";
const theme = createTheme();
const title = 'สร้างบัญชี';

export default function SettingProfile() {

    const bio = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error explicabo minima excepturi tempore beatae, blanditiis dolorum fuga odit libero necessitatibus ducimus repudiandae porro natus dicta qui laboriosam aperiam iste.'
    const username = 'User123'
    const usernameRef = useRef(null);
    const bioRef = useRef(null);




    const editProfile = () => {
        const usernameRefElement = usernameRef.current;
        usernameRefElement.removeAttribute("disabled");
        usernameRefElement.style.borderColor = 'black';

        const bioRefElement = bioRef.current;
        bioRefElement.removeAttribute("disabled");
        bioRefElement.style.borderColor = 'black';

        let editProfileBtn = document.getElementById('editProfileBtn')
        let sendDataBtn = document.getElementById('sendDataBtn')
        editProfileBtn.style.display = 'none'
        sendDataBtn.style.display = 'block'
    }



    const openColorPicker = () => {
        // const editCoverModal = document.getElementsByClassName("edit-cover-form-modal")[0]
        // editCoverModal.style.display = 'block'
        // const colorPicker = document.getElementById("color-input")
        // colorPicker.click()

        // const colorPicker = document.createElement("input");
        // colorPicker.type = "color";
        // colorPicker.click();
    }


    const cancleEditCover = () => {
        const editCoverModal = document.getElementsByClassName("edit-cover-form-modal")[0]
        editCoverModal.style.display = 'none'

    }

    const addProfileImg = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            var file = e.target.files[0];
        }
        input.click();
    }

    const [bioValue, setBioValue] = useState(bio);
    const [usernameValue, setUsernameValue] = useState(username);


    const inputValue = (event) => {
        setBioValue(event.target.bioValue);
        setUsernameValue(event.target.usernameValue);

    };
    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <div className="edit-cover-form-modal">

                <div className="container">
                    <div className="cover-form">
                        <from>
                            <div className="text-align-right close-btn">X</div>
                            <div className="setting-img-box text-align-center">
                                <div className="setting-cover">
                                    <input type="color" id="color-input" />
                                </div>

                                <ProfileImg src="b3.png" onPress={addProfileImg} />
                            </div>


                            <div className="text-align-center" id='changeColorCoverBtn'>
                                <button className="gradiant-btn" type="submit">บันทึกข้อมูล</button>
                                <button className="lightblue-btn" type="cancle" onClick={cancleEditCover}>ยกเลิก</button>
                            </div>
                        </from>
                    </div>
                </div>
            </div>
            <div className="setting-container">
                <SettingAside onActive='1' />
                <div className="setting-content-box">

                    <div className="common-setting-page">
                        <div>
                            <h2 className="setting-headding">โปรไฟล์</h2>
                        </div>
                        <div className="in-setting-page">
                            <form>
                                <div className="setting-img-box text-align-center">
                                    <div className="setting-cover">
                                        <input type="color" id="color-input" />
                                        <div onClick={openColorPicker}>
                                            <p>แก้ไขสีปก</p>
                                        </div>
                                    </div>
                                    <ProfileImg src="b3.png" onPress={addProfileImg} />
                                    <div className="boii" > <button className="boi" type="submit">บันทึกข้อมูล</button></div>

                                </div>

                                <div>

                                    <DefaultTextArea headding="ชื่อผู้ใช้"
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
                                        disabled={true} />
                                </div>
                                <div className="text-align-center" id='sendDataBtn'>
                                    <button className="gradiant-btn" type="submit">บันทึกข้อมูล</button>
                                    <button className="lightblue-btn" type="cancle">ยกเลิก</button>
                                </div>
                            </form>
                            <div className="text-align-center" id='editProfileBtn'>
                                <button className="edit-profile-btn" onClick={editProfile}>แก้ไขโปรไฟล์</button>
                            </div>
                        </div>
                    </div>

                    <div className="common-setting-page">
                        <div>
                            <h2 className="setting-headding">อีเมลและรหัสผ่าน</h2>
                        </div>
                        <div className="in-setting-page">

                            <div>
                                <p className="onInput">อีเมล</p>
                                <p>aaaa@gmail.com <button className="change-pass">เปลี่ยนอีเมล</button></p>
                                <p className="onInput">รหัสผ่าน</p>
                                <button className="change-pass">เปลี่ยนรหัสผ่าน</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ThemeProvider>
    );
}
