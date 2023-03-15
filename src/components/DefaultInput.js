import "../css/allinput.css";
// import React, { forwardRef } from "react";


export default function DefaultInput(props) {
    return (
    <>
        <label class="onInput">{props.headding}</label>
            <input class="defInput" type={props.type} />
            {/* <p class="validate-input">dddd</p> */}
    </>
    )
}


// import "../css/allinput.css";
// import TextareaAutosize from 'react-textarea-autosize';



// const DefaultInput = forwardRef((props, ref) => {
//     // let verify = null;
//     // if (props.headding === 'อีเมล') {
//     //     verify = <button>ส่งรหัสยืนยัน</button> 
//     // }
//     return (
//         <>
//             <p class="onInput">{props.headding}</p>
//             <input class="defInput" type={props.type} ref={ref} />

//         </>
//     )

// })


// export default DefaultInput;

