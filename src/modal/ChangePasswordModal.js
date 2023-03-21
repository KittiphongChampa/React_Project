import "../css/allinput.css";
import { useForm } from "react-hook-form"
import inputSetting from "../function/function";
import NewInput from "../components/NewInput";
import * as Icon from 'react-feather';
import ReactDOM from 'react-dom';

import "../css/allinput.css";
import TextareaAutosize from 'react-textarea-autosize';
import React, { forwardRef } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import * as alertData from '../alertdata/alertData';

const ChangePasswordModal = (props, ref) => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isDirty, isValid }, reset } = useForm();

    const func = {
        register: register,
        errors: errors,
        setValue: setValue
    }

    const submitChangePassForm = (data) => {
        // Swal.fire({
        //     title: 'Your title',
        //     text: 'Your message',
        //     icon: 'success',
        //     iconColor: 'pink',
        //     customClass: {
        //         popup: 'custom-alert',
        //     },
        // });


        Swal.fire({ ...alertData.changePassConfirm }).then((result) => {
            if (result.isConfirmed) {
                console.log()
                Swal.fire({ ...alertData.changePassIsConfirmed }).then(() => {
                    window.location.reload(false);
                })
            }
        })


    }

    const closeModal = () => {
        const closeBtn = document.getElementsByClassName("form-modal")[0]
        closeBtn.classList.add("closing")

        setTimeout(() => {
            props.setShowPsswordModal(null);
            closeBtn.remove("closing")
        }, 300);
    }


    return (
        <div className="modal-area" id="modalArea" >
            <div className="container">
                <div className="form-modal">
                    <div className="text-align-right close-btn" onClick={closeModal}><Icon.X /></div>
                    <div className="form-area">
                        <form onSubmit={handleSubmit(submitChangePassForm)}>
                            <h2 className="text-align-center">เปลี่ยนรหัสผ่านใหม่</h2>
                            <NewInput inputSetting={inputSetting('now-password', 'รหัสผ่านปัจจุบัน', "text", null, true)}
                                {...func} />
                            <NewInput inputSetting={inputSetting('new-password', 'รหัสผ่านใหม่', "text", null, true, 8)}
                                {...func} />
                            <NewInput inputSetting={inputSetting('verify-password', 'ยืนยันรหัสผ่านใหม่', "text", null, true)}
                                {...func} />
                            <div className="text-align-center">
                                <button className="gradiant-btn" type="submit">บันทึกข้อมูล</button>
                                <button className="cancle-btn" type="button" onClick={closeModal}>ยกเลิก</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}



export default ChangePasswordModal;

