
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import * as Icon from 'react-feather';
import * as ggIcon from '@mui/icons-material';


// ของข้อย

import "../css/indexx.css";
import "../css/allbutton.css";
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarGuest } from "../components/Navbar";
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
    // const [role, setRole] = useState({rolename:null,roleSelect:false})
    const [roleName,setRoleName] =useState(null)

    const [roleSelected,setRoleSelected] = useState(false)
    const icon = {
        fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48",
    };

    function handleRole(role) {
        setRoleName(role)
        // alert(role)
    }

    function roleCheck() {
        setRoleSelected(!roleSelected)
    }




    return (
        <div className="body-con">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarGuest />



            <div className='body-lesspadding' style={{ backgroundImage: "url('mainmoon.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>


                <div className="container">
                    {roleSelected? <div className="createaccount-soloCard" >
                        <div className="card-header-tap">
                            <div><button><Icon.ArrowLeft className="go-back-icon" onClick={roleCheck} /></button></div>
                            <h1 className="text-center">{title} </h1>
                            <div></div>
                        </div>
                        <div className="createaccount-col-text">
                            <ProfileImg  onPress={addProfileImg} />
                            <p className="text-center">รูปโปรไฟล์</p>
                            <form>
                                <DefaultInput headding='อีเมล' type='email' disabled="disabled" value="hiyo123@gmail.com"/>
                                <DefaultInput headding='ชื่อผู้ใช้' type='text' />
                                <DefaultInput headding='รหัสผ่าน' type='text' />
                                <DefaultInput headding='ยืนยันรหัสผ่าน' type='text' />
                                { roleName=='artist' && <><DefaultInput headding='ชื่อบัญชีธนาคาร' type='text' />
                                    <DefaultInput headding='เลขพร้อมเพย์' type='text' /></>}
                                <div className="text-align-center">
                                    <button className="gradiant-btn" type="submit">ยืนยันการสร้างบัญชี</button>
                                    <button className="cancle-btn" type="cancle">ยกเลิก</button>
                                </div>
                            </form>

                        </div>
                    </div> : <>
                        <div className="createaccount-soloCard" >

                            <div className="card-header-tap">
                                <div><button><Icon.ArrowLeft className="go-back-icon"  /></button></div>
                                <h1 className="text-center">คุณเป็นใคร </h1>
                                <div></div>
                            </div>
                            <div className="roles-container">
                                    <div className={`role-item ${roleName == 'customer' && 'select'}`}>
                                        <button onClick={() => handleRole('customer')}><ggIcon.Person className="iconn" /></button>
                                    <p>ผู้ว่าจ้าง</p>
                                </div>
                                    <div className={`role-item ${roleName == 'artist' && 'select'}`}>
                                        <button onClick={()=>handleRole('artist')}><ggIcon.Palette className="iconn" /></button>
                                    <p>นักวาด</p>
                                </div>

                                </div>
                                <button className="lightblue-btn" onClick={roleCheck} disabled={roleName === null}>ถัดไป</button>


                        </div>


                    </>}
                </div>
            </div>


        </div>
    );
}
