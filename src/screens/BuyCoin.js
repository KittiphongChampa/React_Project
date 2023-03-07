
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import BuyCoinItem from "../components/BuyCoinItem";
import { Table, Tabs, Tab } from 'react-bootstrap';
// import ImportScript from "../components/ImportScript";


const theme = createTheme();
const title = 'เติมเหรียญ';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }


export default function SignIn() {


    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <div className='body' style={{ backgroundImage: "url('mainmoon.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>

                <Navbar />
                <div className="container">
                    <div className="buycoin-clearpage">
                        <div className="buycoin-con">
                            <h1 className="text-center">{title} </h1>
                            <Tabs
                                defaultActiveKey="buycoin"
                                id="justify-tab"
                                className="mb-4 mt-4"
                                justify
                            >
                                <Tab eventKey="buycoin" title="เติมด้วยบัตรเครดิต?">

                                    <div className="buycoin-content">

                                        <BuyCoinItem src="a_coin.png" coin="300" pay="300" />
                                        <BuyCoinItem src="a_coin.png" coin="400" pay="400" />
                                        <BuyCoinItem src="a_coin.png" coin="1300" pay="1300" />
                                        <BuyCoinItem src="a_coin.png" coin="1300" pay="1300" />

                                    </div>

                                </Tab>
                                <Tab eventKey="usecoin" title="เติมด้วย??">
                                    <div className="buycoin-content">

                                        <BuyCoinItem src="a_coin.png" coin="300" pay="300" />
                                        <BuyCoinItem src="a_coin.png" coin="400" pay="400" />
                                        <BuyCoinItem src="a_coin.png" coin="300" pay="300" />
                                        <BuyCoinItem src="a_coin.png" coin="300" pay="300" />

                                    </div>

                                </Tab>
                                {/* <Tab eventKey="longer-tab" title="Loooonger Tab">
                                </Tab>
                                <Tab eventKey="contact" title="Contact" disabled>
                                </Tab> */}
                            </Tabs>




                        </div>
                    </div>
                </div>
            </div>


        </ThemeProvider>
    );
}
