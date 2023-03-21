
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import Navbar from "../components/Navbar";
import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from './Profile';
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import CmsItem from "../components/CmsItem";

const title = 'ตั้งเป็นชื่อ user';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function HomePage() {


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <div class="body-nopadding" style={body}>
                <div className="container">
                    <div class="search-container">
                        <div class="search-box">
                            <input type="text" placeholder="ค้นหาบลาๆๆๆ" />
                        </div>
                        <div class="popular-topic">
                            <p>หัวข้อยอดนิยม :</p>
                            <a href="">xxxxxxx</a>
                            <a href="">xxxaaaaxxxx</a>
                            <a href="">xxxxxxx</a>
                        </div>
                    </div>

                    <div className=" content-container user-profile-contentCard">
                        <div class="content-type">
                            <a href="">ทั้งหมด</a><a href="">คอมมิชชัน</a><a href="">แกลอรี่</a>
                            <div>เอาไว้ใส่หัวข้อกับตัวกรอง</div>
                        </div>
                        <div class="content-box">
                            <div class="content-top">
                                <h2>คอมมิชชัน</h2>
                            </div>
                            <div class="content-items">
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
