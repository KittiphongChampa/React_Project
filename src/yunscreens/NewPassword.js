
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import NewInput from "../components/NewInput";
import inputSetting from "../function/function";


const title = 'เปลี่ยนรหัสผ่าน';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }



export default function NewPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const func = {
        register: register,
        errors: errors
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div class="body" style={body}>
                {/* <Navbar /> */}
                <NavbarUser />
                <div class="container">
                    <div class="login-soloCard">
                        <div class="">
                            <img class="login-img" src="ภาพตัด.png" alt="" />
                        </div>
                        <div class="login-col-text">
                            <div class="input-login-box">
                                <h1>{title} </h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <NewInput inputSetting={inputSetting('new-password', 'รหัสผ่านใหม่', "text", null, true, 8)}
                                        {...func} />
                                    <NewInput inputSetting={inputSetting('verify-password', 'ยืนยันรหัสผ่านใหม่', "text", null, true)}
                                        {...func} />
                                    <div class="text-align-center">
                                        <button class="lightblue-btn" type="submit">เปลี่ยนรหัสผ่าน</button>
                                        <button class="lightblue-btn" type="cancle">ยกเลิก</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
