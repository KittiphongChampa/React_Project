
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
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
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import CmsItem from "../components/CmsItem";
import { Link } from 'react-router-dom';

const title = 'ตั้งเป็นชื่อ user';
const bgImg = ""
const body = { backgroundImage: "url('seamoon.jpg')" }


export default function HomePage() {


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />
            <div class="body-nopadding" style={body}>
                <div className="container">
                    <div class="search-container">
                        <div class="search-box">
                            <button><Icon.Search className='nav-icon' /></button>
                            <input type="text" placeholder="ค้นหาบลาๆๆๆ" />
                        </div>
                        <div class="popular-topic">
                            <p>หัวข้อยอดนิยม :</p>
                            <a href="">semi-real</a>
                            <a href="">chibi</a>
                            <a href="">landscape</a>
                        </div>
                    </div>

                    <div className=" content-container user-profile-contentCard" >
                        <div class="content-type">
                            <button className="sub-menu selected">ทั้งหมด</button>
                            <button className="sub-menu">คอมมิชชัน</button>
                            <button className="sub-menu">แกลลอรี่</button>
                            <button className="sub-menu">รีวิว</button>
                        </div>
                        <div class="content-box">
                            <div class="content-top">
                                <h2>คอมมิชชันล่าสุด</h2>
                            </div>
                            <div class="content-items">
                                <Link to="/cmsdetail"><CmsItem /></Link>
                                <CmsItem />
                                <CmsItem />
                                <CmsItem />
                                <CmsItem />
                                <CmsItem />

                            </div>

                        </div>

                    </div>
                </div>


            </div>


        </>
    );
}
