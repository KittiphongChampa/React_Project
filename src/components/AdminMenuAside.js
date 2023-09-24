import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import "../css/indexx.css";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import * as ggIcon from '@mui/icons-material';



const AdminMenuAside = (props) => {
    // <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    let profileActive = null
    let coinActive = null

    switch (props.onActive) {
        case "profile":
            profileActive = "active"
            console.log("profile active");
            break;
        case "coin":
            coinActive = "active"
            break;
        default:
            break;
    }



    return (
        <div className="setting-menu">
            {/* <h1 style={{ fontWeight: "200", color: "white", marginBottom: "1rem" }}>การตั้งค่าและความเป็นส่วนตัว</h1> */}
            <Link style={{ textDecoration: 'none' }} to="/setting-profile"><div className={profileActive}><Icon.User /><p>ภาพรวมระบบ</p></div></Link>
            <Link style={{ textDecoration: 'none' }} to="" ><div className={coinActive}><ggIcon.History /><p>การรายงาน</p></div></Link >
            <Link style={{ textDecoration: 'none' }} to="" ><div className={coinActive}><Icon.Lock /><p>จัดการผู้ใช้งาน</p></div></Link >
            <Link style={{ textDecoration: 'none' }} to="" ><div className={coinActive}><Icon.Lock /><p>เพิ่มแอดมิน</p></div></Link >
            {/* <Link style={{ textDecoration: 'none' }} to="/setting-coin" ><div ><Icon.User /><p>ถอนเงิน</p></div></Link> */}
            {/* <Link style={{ textDecoration: 'none' }} to="/setting-coin" ><div><Icon.Trash2 /><p>ลบบัญชีผู้ใช้งาน</p></div></Link> */}
        </div>
    )
}

export default AdminMenuAside;