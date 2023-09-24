
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Icon from 'react-feather';

import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/homepage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";
import BgBody from "../components/BgBody";


const title = 'หน้าหลัก';
const bgImg = "url('seamoon.jpg')"
const body = {}

export default function SignIn() {

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarHomepage />
            <img class="homeBG" src="seamoon.jpg" />

            <div class="container-fluid" style={{ height: "100vh", padding: "6rem 0 0 0" }}>
                <img className="presenter" src="character.png" />
                <div className="box-container">
                    <div className="frame">
                        <div className="headding-box">
                            <h1 className="display-1">Service for Art Commissioning</h1>
                        </div>
                        <p className="fs-5">aaaaa</p>
                        <p className="fs-5">aaaaa</p>
                        <p className="fs-5">aaaaaa</p>
                        <p className="fs-5">aaaaa</p>
                        <button className="find-artist-btn">ตามหานักวาด<Icon.Search className='nav-icon mx-2' /></button>
                    </div>
                </div>
            </div>



        </>
    );
}
