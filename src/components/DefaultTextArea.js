import "../css/allinput.css";
import TextareaAutosize from 'react-textarea-autosize';
import React, { forwardRef } from "react";


const DefaultTextArea = forwardRef((props, ref) => {
    return (
        <>
            <p class="onInput">{props.headding}</p>
            <TextareaAutosize className="txtarea" id="bio"
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                ref={ ref} />
        </>
    )
    
})


export default DefaultTextArea;

