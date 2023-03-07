import "../css/allinput.css";
import React, { forwardRef } from "react";


// export default function DefaultInput(props) {
//     return (
//     <>
//         <p class="onInput">{props.headding}</p>
//         <input class="defInput" type={props.type} />
//     </>
//     )
// }


// import "../css/allinput.css";
// import TextareaAutosize from 'react-textarea-autosize';



const DefaultInput = forwardRef((props, ref) => {
    let verify = null;
    if (props.headding === 'อีเมล') {
        verify = <button>ส่งรหัสยืนยัน</button> 
    }
    return (
        <>
            <p class="onInput">{props.headding}</p>
            <input class="defInput" type={props.type} ref={ref} />
            {verify}

        </>
    )

})


export default DefaultInput;

