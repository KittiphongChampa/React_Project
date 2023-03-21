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

const ChangeProfileImgModal = (props) => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isDirty, isValid }, reset } = useForm();

    const submitChangeProfileForm = (data) => {
        Swal.fire({ ...alertData.changeProfileImgConfirm }).then((result) => {
            if (result.isConfirmed) {
                console.log()
                Swal.fire({ ...alertData.changeProfileImgIsConfirmed }).then(() => {
                    window.location.reload(false);
                })
            }
        })
    }

    const closeModal = () => {
        const closeBtn = document.getElementsByClassName("form-modal")[0]
        closeBtn.classList.add("closing")

        setTimeout(() => {
            props.setShowProfileModal(null);
            closeBtn.remove("closing")
        }, 300);
    }



    return (
        <div className="modal-area" id="modalArea2">
            <div className="container">
                <div className="form-modal">
                    <div className="text-align-right close-btn" onClick={closeModal}><Icon.X /></div>
                    <div className="form-area">
                        <form onSubmit={handleSubmit(submitChangeProfileForm)}>
                            <h2 className="text-align-center">เปลี่ยนภาพโปรไฟล์</h2>
                            <div class="input-group mb-1 mt-5">
                                <input {...register("profileImg", { required: true })}
                                    type="file" class="form-control" id="inputGroupFile02" />
                                {/* <label class="input-group-text" for="inputGroupFile02">Upload</label> */}
                                {errors.profileImg && errors.test.type === "required" && (<p class="validate-input"> กรุณากรอกฟิลด์นี้</p>)}
                            </div>
                            <div className="text-align-center">
                                <button className={`gradiant-btn ${!isValid ? "disabled-btn" : ""}`} type="submit" disabled={!isValid}>บันทึก</button>
                                <button className="cancle-btn" type="button" onClick={closeModal}>ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ChangeProfileImgModal;

