
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Profile from './Profile';

const title = 'จัดการแอดมิน';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function ForgetPassword() {


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarAdmin />
            <div class="body-lesspadding container-fluid" style={body}>

                <div class="white-page container">

                    <h1 className="text-align-center">การจัดการแอดมิน</h1>
                    <p>ไว้ใส่เมนู</p>
                    <h2>รายชื่อผู้ใช้</h2>
                    <div className="user-item-area">
                        <UserBox src="b3.png" username="aa" userid="aaaa" />
                        <UserBox src="b3.png" username="aa" userid="aaaa" />
                        <UserBox src="b3.png" username="aa" userid="aaaa" />
                        <UserBox src="b3.png" username="aa" userid="aaaa" />
                        <UserBox src="b3.png" username="aa" userid="aaaa" />
                        <UserBox src="b3.png" username="aa" userid="aaaa" />


                    </div>
                </div>
            </div>


        </>
    );
}
