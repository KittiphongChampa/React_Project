
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import * as Icon from 'react-feather';

import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";
import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from './Profile';

import UserList from "../components/UserList";
import Report from "../components/Report";
import AdminMenuAside from "../components/AdminMenuAside";

const title = 'จัดการแอดมิน';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function AdminManagement() {

    const [mainMenu,setMainMenu] = useState('2')

    function handleMenu(menu) {
        setMainMenu(menu)  
    }


    return (
        <div className="body-con">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarAdmin />
            <div className="chatbox-container">
                <div className="aside-chatbox">
                    <AdminMenuAside onActive="profile" />
                    
                </div>
                <div className="chat-room" style={{padding:"1.3rem 3rem"}}>
                    {mainMenu == '1' ? <UserList /> : mainMenu == '2' ? <Report/> : null}
                    {/* <UserList /> */}
                    


                </div>
            </div>
            {/* <div class="body-lesspadding" style={body}>
                <div className="container">

                    <div class="white-page container">

                        <h1 className="text-align-center">การจัดการแอดมิน</h1>
                        <div style={{ border: "1px solid gray", borderRadius: "200px", padding: "0.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                            <button className="sub-menu " >ทั้งหมด</button>
                            <button className="sub-menu" >การรายงาน</button>
                            <button className="sub-menu">โพสต์ที่ถูกสั่งลบ</button>
                            <button className="sub-menu selected">รายชื่อผู้ใช้</button>
                        </div>
                        
                        <div className="all-user-head">
                            <h2>รายชื่อผู้ใช้</h2>
                            <div>
                                <button><Icon.Plus/> เพิ่มแอดมิน</button>
                                <input type="text" style={{borderRadius:"200px",border:"1px solid gray"}} placeholder=" ค้นหา..."></input>
                            </div>
                        </div>
                        <div className="user-item-area">
                            <UserBox src="b3.png" username="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" userid="aaaa" />
                            <UserBox src="b3.png" username="aa" userid="aaaa" />
                            <UserBox src="b3.png" username="aa" userid="aaaa" />
                            <UserBox src="b3.png" username="aa" userid="aaaa" />
                            <UserBox src="b3.png" username="aa" userid="aaaa" />
                            <UserBox src="b3.png" username="aa" userid="aaaa" />


                        </div>
                    </div>
                </div>
            </div> */}



        </div>
    );
}
