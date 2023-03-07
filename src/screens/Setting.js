
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import React, { useState, useEffect, useRef } from "react";

// // ของข้อย

// import "../css/indexx.css";
// import "../css/allbutton.css";
// //import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Helmet } from "react-helmet";
// import TextareaAutosize from 'react-textarea-autosize';

// // import ImportScript from "../components/ImportScript";

// import SettingAside from '../components/SettingAside';
// import SettingProfile from '../components/SettingPro_old';
// import SettingCoin from '../components/SettingCoin_old'
// import SettingPassEmail from '../components/SettingPassEmail'
// import ProfileImg from "../components/ProfileImg";
// import { useParams } from 'react-router-dom';
// // import { Link } from "react-feather";

// const theme = createTheme();
// const title = 'สร้างบัญชี';

// export default function Setting(props) {
//     // const pageNumber = props.match.params.menuSettingPage;
//     const { menuSettingPage } = useParams();
//     let SettingPageComponent;

//     switch (menuSettingPage) {
//         case 'profile':
//             SettingPageComponent = <>
//                 <SettingProfile />
//                 <SettingPassEmail />
//             </>;
//             break;
//         case 'coin':
//             SettingPageComponent = <SettingCoin />;
//             break;
//         default:
//             SettingPageComponent = null;
//             break;
//     }
//     return (
//         <ThemeProvider theme={theme}>
//             <Helmet>
//                 <title>{title}</title>
//             </Helmet>
//             <div className="setting-container">
//                 <SettingAside onActive='1' />
//                 <div className="setting-content-box">
//                     {SettingPageComponent}
//                 </div>
//             </div>
//         </ThemeProvider>
//     );
// }
