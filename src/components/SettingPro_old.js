import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import "../css/indexx.css";
import React, { useState, useEffect } from "react";
import ProfileImg from "./ProfileImg";
import TextareaAutosize from 'react-textarea-autosize';


const SettingP = (props) => {

    const bio = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error explicabo minima excepturi tempore beatae, blanditiis dolorum fuga odit libero necessitatibus ducimus repudiandae porro natus dicta qui laboriosam aperiam iste.'
    const username = 'User123'

    const editProfile = () => {
        let bio = document.getElementById("bio");
        let username = document.getElementById("username");
        bio.removeAttribute("disabled");
        username.removeAttribute("disabled");
        bio.style.borderColor = 'black';
        let editProfileBtn = document.getElementById('editProfileBtn')
        let sendDataBtn = document.getElementById('sendDataBtn')
        editProfileBtn.style.display = 'none'
        sendDataBtn.style.display = 'block'

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
        <div className="common-setting-page">
            <div>
                <h2 className="setting-headding">โปรไฟล์</h2>
            </div>
            <div className="in-setting-page">
                <form>
                    <div className="text-align-center">
                        <ProfileImg src="AB1.png" onPress={addProfileImg} />
                        <input type="text" className="username-setting" id="username" disabled
                            value={usernameValue}
                            onChange={inputValue} />
                    </div>
                    <div>
                        <p className="on-input">คำอธิบายตัวเอง</p>
                        <TextareaAutosize className="txtarea" id="bio" disabled
                            value={bioValue}
                            onChange={inputValue} />
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

    )
}

export default SettingP;