
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/indexx.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import Navbar from "../components/Navbar";
import BgBody from "../components/BgBody";


const theme = createTheme();
const title = 'เข้าสู่ระบบ';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }


export default function SignIn() {

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div class="body" style={body}>
                <Navbar />
                <div class="container">
                    <div class="login-clearpage">
                        <div class="">
                            <img class="login-img" src="ภาพตัด.png" alt="" />
                        </div>
                        <div class="login-col-text">
                            <div class="input-login-box">
                                <h1>เข้าสู่ระบบ </h1>
                                <form>
                                    <DefaultInput headding='อีเมล' type='email' />
                                    <DefaultInput headding='รหัสผ่าน' type='password' />


                                    <div class="text-align-right">
                                        <a href="">ลืมรหัสผ่าน</a>
                                    </div>
                                    <div class="text-align-center">
                                        <button class="lightblue-btn" type="submit">เข้าสู่ระบบ</button>
                                    </div>
                                </form>
                                <div class="text-align-center">
                                    <a href="">สมัครสมาชิก</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </ThemeProvider>
    );
}
