import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import "../css/indexx.css";
import React, { useState, useEffect } from "react";
import ProfileImg from "../components/ProfileImg";
import TextareaAutosize from 'react-textarea-autosize';


const SettingPassEmail = (props) => {

    const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error explicabo minima excepturi tempore beatae, blanditiis dolorum fuga odit libero necessitatibus ducimus repudiandae porro natus dicta qui laboriosam aperiam iste.'
    let textarea = document.getElementsByClassName("txtarea");

    const editProfile = () => {
        let bio = document.getElementById("bio");
        let username = document.getElementById("username");
        bio.removeAttribute("disabled");
        bio.style.borderColor = 'black';
    }

    const addProfileImg = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            var file = e.target.files[0];
        }
        input.click();
    }
    const textareaHeight = textarea.scrollHeight
    const [value, setValue] = useState(`${lorem}`);
    const [height, setHeight] = useState(textareaHeight);


    const inputValue = (event) => {
        setValue(event.target.value);
    };


    return (
        <div className="common-setting-page">
            <div>
                <h2 className="setting-headding">อีเมลและรหัสผ่าน</h2>
            </div>
            <div className="in-setting-page">

                <div>
                    <p className="on-input">อีเมล</p>
                    <p>aaaa@gmail.com <button className="change-pass">เปลี่ยนอีเมล</button></p>
                    <p className="on-input">รหัสผ่าน</p>
                    <button className="change-pass">เปลี่ยนรหัสผ่าน</button>
                </div>
            </div>
        </div>

    )
}

export default SettingPassEmail;