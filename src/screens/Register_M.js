
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";


const theme = createTheme();
const title = 'สมัครสมาชิก';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }




export default function SignIn() {

    
    return (
        <div className="body-con">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />


            <div className='body' style={body}>

                {/* <NavbarUser /> */}
                <div class="container">
                    <div class="login-soloCard">
                        <div class="login-col-img" >
                            <img class="login-img" src="ภาพตัด.png" alt="" />
                        </div>
                        <div class="login-col-text">
                            <div class="input-login-box">
                                <h1>{title} </h1>
                                <form>

                                    <label class="onInput">ทดลอง</label>
                                    <div className="verify-email">
                                        <input class="defInput" />
                                        <button type='submit'>ส่งรหัสยืนยัน</button>
                                    </div>


                                </form>
                                <form>
                                    <DefaultInput headding='ใส่รหัสยืนยัน' type='text' />
                                    <div class="text-align-center">
                                        <button class="lightblue-btn" type="submit" disabled>ยืนยันอีเมล</button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
