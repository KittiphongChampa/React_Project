import "../css/allinput.css";
import { useForm } from "react-hook-form"
import inputSetting from "../function/function";
import NewInput from "../components/NewInput";
import ReactDOM from 'react-dom';

import "../css/allinput.css";
import TextareaAutosize from 'react-textarea-autosize';
import React, { forwardRef, useEffect, useState } from "react";


const AddEditDeleteCoinModal = forwardRef((props, ref) => {
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();

    // const func = {
    //     register: register,
    //     errors: errors,
    //     setValue: setValue
    // }

    const submitChangePassForm = (data) => {
        console.log(data)
        console.log("มา")
        alert("ส่งข้อมูลเรียบร้อย")
        // window.location.reload(false);
    }

    const closeModal = () => {
        const cancleBtn = document.getElementById("formModal")
        // cancleBtn.style.animation = 'none';
        cancleBtn.classList.add("closing")
        // props.setModal(null)
        // reset()
        // cancleBtn.onanimationend = () => {
        //     props.setModal(null);
        //     console.log("work");
        //     cancleBtn.remove("closing")
        // };
        // props.setModal(null);
        // cancleBtn.remove("closing")

        setTimeout(() => {
            props.setModal(null);
            cancleBtn.remove("closing")
        }, 300);
    }

    const [aValue, setAValue] = useState(props.value);

    useEffect(() => {
        setValue("name", aValue)
        console.log(props.value)
        setAValue("นี่คือค่าใหม่")
        console.log(`เอฟเฟคทำงานและได้ ${aValue}`);
    }, []);

    return (
        <div className="modal-area" id="modalArea" ref={ref}>
            <div className="container">
                <div className="form-modal openning" id="formModal">
                    <div className="text-align-right close-btn" onClick={closeModal}>X</div>
                    <div className="form-area">
                        <form onSubmit={handleSubmit(submitChangePassForm)}>
                            <h2 className="text-align-center">เพิ่มแพ็กเกจเติมเงิน</h2>
                            <input
                                {...register("name", { required: true })} type="text" />
                            {/* <NewInput inputSetting={inputSetting('coin', 'coin ที่ได้', "number", null, true)}
                                {...func} />
                            <NewInput inputSetting={inputSetting('price', 'ราคา', "number", null, true)}
                                {...func} /> */}
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

