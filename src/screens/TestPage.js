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

const ChangeProfileImgModal = forwardRef((props, ref) => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, reset } = useForm();

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
        const cancleBtn = document.getElementById("modalArea2").classList
        cancleBtn.remove("open")
        reset()
    }

    return (

        <div className="container">
            <div className="form-modal">
                <div className="text-align-right close-btn" onClick={closeModal}><Icon.X /></div>
                <div className="form-area">
                    <form onSubmit={handleSubmit(submitChangeProfileForm)}>
                        <h2 className="text-align-center">เปลี่ยนภาพโปรไฟล์</h2>

                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" />
                            <label class="input-group-text" for="inputGroupFile02">Upload</label>
                        </div>




                        <label class="onInput">hhhh</label>
                        <input
                            type="text"
                            {...register("test", { required: true })}
                            className={`defInput ${errors.test ? "border-danger" : ""}`} />
                        {errors.test && errors.test.type === "required" && (<p class="validate-input"> ไม่ด้ายยย</p>)}

                        <div className="text-align-center">
                            <button className={`gradiant-btn ${!isValid ? "disabled-btn" : ""}`} type="submit" disabled={!isValid}>บันทึก</button>
                            <button className="cancle-btn" type="button" onClick={closeModal}>ยกเลิก</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    )
})



export default ChangeProfileImgModal;

