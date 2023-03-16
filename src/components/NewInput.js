import "../css/allinput.css";
import React, { useState, useEffect } from "react";

export default function NewInput(props) {

    console.log(props.defaultValue)
    

    const name = props.inputSetting.name
    const headding = props.inputSetting.headding
    const type = props.inputSetting.type
    const pattern = props.inputSetting.pattern
    const errors = props.errors
    const setValue = props.setValue
    const required = props.inputSetting.required
    const disabled = props.inputSetting.disabled
    const minLength = props.inputSetting.minLength
    const maxLength = props.inputSetting.maxLength
    setValue(name, props.defaultValue);
    // useEffect(() => {
    //     setValue(name, props.defaultValue);
    // }, [setValue(name, props.defaultValue)]);
    
    let ErrorMin = `กรุณาใส่ตัวอักษรอย่างน้อย ${minLength} ตัว`
    let ErrorPattern =''
    let ErrorMax = `ใส่ตัวอักษรไม่เกิน ${minLength} ตัว`
    let ErrorReq = `กรุณากรอกข้อมูลฟิลด์นี้`

    

    if (name === "email") {
        ErrorPattern = "ใส่ตัวอักษรให้ครบ เช่น example@gmail.com"
    }
    else {
        ErrorPattern = "";
    }

    return (
        <>
            <label class="onInput">{headding}</label>
            <input disabled={disabled}
                type={type}
                {...props.register(name, { required: required, pattern: pattern, minLength: minLength, maxLength: maxLength })}
                className={`defInput ${errors[name] ? "border-danger" : ""}`} />
            {errors[name] && errors[name].type === "pattern" && (<p class="validate-input"> {ErrorPattern}</p>)}
            {errors[name] && errors[name].type === "required" && (<p class="validate-input"> {ErrorReq}</p>)}
            {errors[name] && errors[name].type === "minLength" && (<p class="validate-input"> {ErrorMin}</p>)}
            {errors[name] && errors[name].type === "maxLength" && (<p class="validate-input"> {ErrorMax}</p>)}
            {/* {errors[name] && errors[name].type === "maxLength" && (<p class="validate-input"> {ErrorMax}</p>)} */}
        </>
    )
}