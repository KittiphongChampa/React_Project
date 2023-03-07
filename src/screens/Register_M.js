
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect,useRef } from "react";

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import Navbar from "../components/Navbar";


const theme = createTheme();
const title = 'สมัครสมาชิก';




export default function SignIn() {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <div class='body' style={{ backgroundImage: "url('mainmoon.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>

                    <Navbar />
                    <div class="container">
                        <div class="login-clearpage">
                            <div class="">
                                <img class="login-img" src="ภาพตัด.png" alt="" />
                            </div>
                            <div class="login-col-text">
                                <div class="input-login-box">
                                    <h1>{title} </h1>
                                    <form>
                                    <DefaultInput headding='อีเมล' type='email' ref={emailRef } />
                                    <DefaultInput headding='ใส่รหัสยืนยัน' type='text' ref={passRef } />
                                        <div class="text-align-center">
                                            <button class="lightblue-btn" type="submit">ยืนยันอีเมล</button>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
        </ThemeProvider>
    );
}
