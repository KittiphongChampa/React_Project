import "../css/allinput.css";
import { useForm } from "react-hook-form"
import inputSetting from "../function/function";
import NewInput from "../components/NewInput";
import * as Icon from 'react-feather';
import ReactDOM from 'react-dom';

import "../css/allinput.css";
import TextareaAutosize from 'react-textarea-autosize';
import React, { forwardRef, useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import * as alertData from '../alertdata/alertData';
import ProfileImg from "../components/ProfileImg";

const openInputColor = () => {
    document.getElementById("color-input").click()
}

const ChangeCoverModal = forwardRef((props, ref) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const func = {
        register: register,
        errors: errors
    }

    const submitChangeCoverForm = (data) => {


        Swal.fire({ ...alertData.changeProfileImgConfirm }).then((result) => {
            if (result.isConfirmed) {
                console.log()
                Swal.fire({ ...alertData.changeProfileImgIsConfirmed }).then(() => {
                    console.log(va)
                    window.location.reload(false);
                })
            }
        })


    }

    const closeModal = () => {
        const cancleBtn = document.getElementById("modalArea").classList
        cancleBtn.remove("open")
        reset()
    }

    useEffect(() => {
        

    }, []);

    const [va, setva] = useState("ค่าดีฟ้อล");
    console.log(va)

    const newSet = () => {
        setva("ค่าใหม่")
        console.log(va)

    }



    return (
        <div className="modal-area" id="modalArea" ref={ref} onClick={props.onClick}>
            <div className="container">
                <div className="form-modal">
                    <div className="text-align-right close-btn" onClick={closeModal}><Icon.X /></div>
                    <div className="form-area">
                        <form onSubmit={handleSubmit(submitChangeCoverForm)}>
                            <h2 className="text-align-center">เปลี่ยนสีปก</h2>
                            <div className="setting-img-box text-align-center">
                                <div className="setting-cover">
                                    <input className="" type="color" id="color-input" style={{ cursor: "pointer" }} />
                                </div>
                                <ProfileImg src="add-image.png" type="only-show" />
                                <div className="submit-color-btn-area" >
                                    <button className="submit-color-btn" type="submit">บันทึกข้อมูล</button>
                                </div>

                            </div>
                            <div className="text-align-center">
                                <button className="gradiant-btn" type="submit" onClick={newSet}>บันทึก</button>
                                <button className="cancle-btn" type="button" onClick={closeModal}>ยกเลิก</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
})



export { ChangeCoverModal, openInputColor };


