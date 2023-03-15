import "../css/allinput.css";
import { useForm } from "react-hook-form"
import inputSetting from "../function/function";
import NewInput from "../components/NewInput";
import ReactDOM from 'react-dom';

import "../css/allinput.css";
import TextareaAutosize from 'react-textarea-autosize';
import React, { forwardRef } from "react";
import axios from "axios";
import { useEffect } from 'react';

const AddEditDeleteCoinModal = forwardRef((props, ref) => {
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();




  
    let headding = props.headding;

    const func = {
        register: register,
        errors: errors,
        setValue: setValue
    }

    const submitChangePassForm = async(data) => {
        console.log(data)
        // alert("ส่งข้อมูลเรียบร้อย")
        const coins = data.coins;
        const price = data.price;
        const package_Id = props.package_Id;
        console.log(package_Id);
        if (headding==="เพิ่มแพ็กเกจเติมเงิน") {
            await axios
            .post("http://localhost:3333/packagetoken/add", {
                coins,
                price,
            })
            .then((response) => {
              const data = response.data;
              if (data.status === "ok") {
                alert(data.message);
                window.location = "/editcoin";
              } else {
                alert(data.message);
                window.location = "/editcoin";
              }
            });   
        } else {
            await axios
            .patch(`http://localhost:3333/packagetoken/update/${package_Id}`, {
                coins,
                price,
            })
            .then((response) => {
                const data = response.data;
                if (data.status === "ok") {
                alert(data.message);
                window.location = "/editcoin";
                } else {
                alert(data.message);
                window.location = "/editcoin";
                }
            });
        }
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
                            <h2 className="text-align-center">{headding}</h2>
                            <NewInput inputSetting={inputSetting('coins', 'coin ที่ได้', "number", null, true) }
                                {...func} defaultValue={props.coinValue} />
                            <NewInput inputSetting={inputSetting('price', 'ราคา', "number", null, true)}
                                {...func} defaultValue={props.priceValue}/>

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
