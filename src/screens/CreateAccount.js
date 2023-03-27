
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import {NavbarUser,NavbarAdmin,NavbarHomepage} from "../components/Navbar";
import ProfileImg from "../components/ProfileImg";
// import ImportScript from "../components/ImportScript";



const theme = createTheme();
const title = 'สร้างบัญชี';







export default function CreateAccount() {
    // const fileSelector = document.getElementById('file-selector');
    // fileSelector.addEventListener('change', (event) => {
    //     const fileList = event.target.files;
    //     console.log(fileList);
    // });
    const addProfileImg = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            var file = e.target.files[0];
        }
        input.click();
    }


    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <div className='body' style={{ backgroundImage: "url('mainmoon.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>

                <NavbarUser />
                <div className="container">
                    <div className="createaccount-soloCard">
                        <div className="createaccount-col-text">

                            <h1 className="text-center">{title} </h1>
                            <ProfileImg src="b3.png" onPress={addProfileImg} />
                            <p className="text-center">รูปโปรไฟล์</p>
                            <form>
                                <DefaultInput headding='อีเมล' type='email' />
                                <DefaultInput headding='ชื่อผู้ใช้' type='text' />
                                <DefaultInput headding='รหัสผ่าน' type='text' />
                                <DefaultInput headding='ยืนยันรหัสผ่าน' type='text' />
                                <div className="text-align-center">

                                    <button className="gradiant-btn" type="submit">ยืนยันการสร้างบัญชี</button>
                                    <button className="lightblue-btn" type="cancle">ยกเลิก</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </ThemeProvider>
    );
}
