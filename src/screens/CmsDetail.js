
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
// import "../css/recent_index.css";
// import '../styles/index.css';
import '../styles/main.css';
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from './Profile';
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import CmsItem from "../components/CmsItem";
import ImgSlide from './../components/ImgSlide';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ggIcon from '@mui/icons-material';


const title = 'รายละเอียด cms';
const bgImg = ""
const body = { backgroundImage: "url('seamoon.jpg')" }


export default function HomePage() {


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />

            <div className="background-blur" style={body}></div>

            <div class="body-lesspadding">
                <div className="container">
                    <div className="content-card">
                        <div>
                            <h1 className="me-3">full color Boobi</h1>
                            <p class="cms-status-detail">เปิด</p>
                        </div>
                        <div className="cms-artist-box">
                            <div id="cms-artist-profile">
                                <img src="AB1.png" alt="" />
                                <p>Boobi <span>4.0 </span><span><ggIcon.Star className='fill-icon' /></span></p>
                            </div>
                            <p id="cms-price" className="h4">เริ่มต้น X บาท</p> {/* ให้มันชิดขวา */}
                        </div>
                        <ImgSlide /> {/*  รอทำเป็น mixin */}
                        <p className="text-align-center mt-3 mb-3">รายละเอียดคมช. lorem ................................</p>
                        <div className="skill">
                            <div className="good-at">
                                <ul>
                                    <p>ถนัด</p>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                </ul>
                            </div>
                            <div className="bad-at">
                                <ul>
                                    <p>ถนัด</p>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                </ul>
                            </div>

                            <div className="not-accept">
                                <ul>
                                    <p>ถนัด</p>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                    <li><span>xxxxxxx</span></li>
                                </ul>

                            </div>

                        </div>
                        <div className="group-submenu">
                            <button className="sub-menu selected">ทั้งหมด</button>
                            <button className="sub-menu">คอมมิชชัน</button>
                            <button className="sub-menu">แกลลอรี่</button>
                            <button className="sub-menu">รีวิว</button>
                        </div>
                        <h2>เลือกแพ็กเกจ</h2>
                        <p className="text-align-right">ราคาสำหรับ personal use หากใช้ในเชิงอื่นอาจกำหนดราคาขึ้นมากกว่านี้</p>
                        <div className="select-package-item">
                            <div>
                                <h3>หัวข้อใหญ่</h3>
                                <p>ราคา</p>
                                <p>เนื้อหาXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX</p>
                            </div>
                            <div>
                                <p>ทำงานกี่วันบลาๆๆๆ</p>
                            </div>
                        </div>
                        <div className="select-package-item">
                            <div>
                                <h3>หัวข้อใหญ่</h3>
                                <p>ราคา</p>
                                <p>เนื้อหาXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX</p>
                            </div>
                            <div>
                                <p>ทำงานกี่วันบลาๆๆๆ</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>




        </>
    );
}
