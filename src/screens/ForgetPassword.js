
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import Navbar from "../components/Navbar";
import NewInput from "../components/NewInput";
import inputSetting from "../function/function";

const title = 'ลืมรหัสผ่าน';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }


export default function ForgetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const func = {
        register: register,
        errors: errors
    }

    const onSubmitForm1 = (data) => {
        console.log(data.email);
    }

    const onSubmitForm2 = (data) => {
        console.log(data.verify);
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div class="body" style={body}>
                <Navbar />
                <div class="container">
                    <div class="login-soloCard">
                        <div class="">
                            <img class="login-img" src="ภาพตัด.png" alt="" />
                        </div>
                        <div class="login-col-text">
                            <div class="input-login-box">
                                <h1>{title} </h1>
                                <form onSubmit={handleSubmit(onSubmitForm1)}>
                                    <NewInput inputSetting={inputSetting('email', 'อีเมล', "text", /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, true)}
                                        {...func} />
                                    <button type='submit'>ส่งรหัสยืนยัน</button>
                                </form>

                                <form onSubmit={handleSubmit(onSubmitForm2)}>
                                    <NewInput inputSetting={inputSetting('verify', 'รหัสยืนยัน', "text", null, false)}
                                        {...func} />
                                    <div class="text-align-center">
                                        <button class="lightblue-btn" type="submit">ตกลง</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
