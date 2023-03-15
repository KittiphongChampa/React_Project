import "../css/allinput.css";
import { useForm } from "react-hook-form"
import inputSetting from "../function/function";
import NewInput from "../components/NewInput";
import ReactDOM from 'react-dom';

import "../css/allinput.css";
import TextareaAutosize from 'react-textarea-autosize';
import React, { forwardRef } from "react";

const AddEditDeleteCoinModal = forwardRef((props, ref) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const func = {
        register: register,
        errors: errors
    }

    const submitChangePassForm = (data) => {
        console.log(data)
        console.log("มา")
        alert("ส่งข้อมูลเรียบร้อย")
        window.location.reload(false);
    }

    const closeModal = () => {
        const cancleBtn = document.getElementById("modalArea").classList
        cancleBtn.remove("open")
        reset()
    }
    return (
        <div className="modal-area" id="modalArea" ref={ref}>
            <div className="container">
                <div className="form-modal">
                    <div className="text-align-right close-btn" onClick={closeModal}>X</div>
                    <div className="form-area">
                        <form onSubmit={handleSubmit(submitChangePassForm)}>
                            <h2 className="text-align-center">เพิ่มแพ็กเกจเติมเงิน</h2>
                            <NewInput inputSetting={inputSetting('now-password', 'coin ที่ได้', "number", null, true)}
                                {...func} />
                            <NewInput inputSetting={inputSetting('new-password', 'ราคา', "number", null, true)}
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
})



export default AddEditDeleteCoinModal;

