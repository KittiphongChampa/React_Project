import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import "../css/indexx.css";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';


const SettingAside = () => {

    return (
        <div class="setting-menu">
            <h2>การตั้งค่า</h2>
            <div><Icon.User /><span>โปรไฟล์</span><Link to="/setting-profile">profile</Link></div>
            <div><Icon.User /><span>ถอนเงิน</span><Link to="/setting-coin" >coin</Link></div>
            <div><Icon.User /><i class="material-symbols-outlined">currency_exchange</i><span>ประวัติการใช้เหรียญ</span></div>
            <div><Icon.User /><span>โปรไฟล์</span></div>
            <div><Icon.Trash2 /><span>ลบบัญชีผู้ใช้งาน</span></div>
        </div>
    )
}

export default SettingAside;