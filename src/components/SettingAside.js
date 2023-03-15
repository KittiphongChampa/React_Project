import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import "../css/indexx.css";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import * as ggIcon from '@mui/icons-material';





const SettingAside = () => {
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    return (
        <div class="setting-menu">
            <h2>การตั้งค่า</h2>
            <div><Icon.User /><span>โปรไฟล์</span><Link to="/setting-profile">profile</Link></div>
            
            <div><ggIcon.CurrencyExchange /><span><Link to="/setting-coin" >ประวัติการใช้เหรียญ</Link></span></div>
            <div><Icon.User /><span>ถอนเงิน</span></div>
            <div><Icon.Trash2 /><span>ลบบัญชีผู้ใช้งาน</span></div>
        </div>
    )
}

export default SettingAside;