// import * as Icon from 'react-feather';
// import UserBox from "../components/UserBox";
import ReportItem from "../../components/ReportItem";
import { Link } from 'react-router-dom';

export default function Report(props) {
    return (
        <>


            <h1 className="">การรายงาน</h1>
            {/* <div style={{ border: "1px solid gray", borderRadius: "200px", padding: "0.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                <button className="sub-menu " >ทั้งหมด</button>
                <button className="sub-menu" >การรายงาน</button>
                <button className="sub-menu">โพสต์ที่ถูกสั่งลบ</button>
                <button className="sub-menu selected">รายชื่อผู้ใช้</button>
            </div> */}


            <div className="all-user-head">
                {/* <h3>รายชื่อผู้ใช้ (4)</h3> */}
                {/* <div>
                    <button><Icon.Plus /> เพิ่มแอดมิน</button>
                    <input type="text" style={{ borderRadius: "200px", border: "1px solid gray" }} placeholder=" ค้นหา..."></input>
                </div> */}
            </div>
            <div className="sub-menu-group mt-4">
                <Link to="/homepage" id="foryou" className="sub-menu selected"  >กำลังดำเนินการ</Link>
                <Link to="/homepage/commissions" id="commissions" className="sub-menu" >อนุมัติแล้ว</Link>
                <Link to="/homepage/gallery" id="gallery" className="sub-menu" >ลบแล้ว</Link>
            </div>
            <div className="report-item-area">
                <ReportItem src="/mac-kaveh.jpg"  />
                <ReportItem src="/mac-kaveh.jpg"  />
                <ReportItem src="/monlan.png"  />
                {/* <ReportItem src="/mac-kaveh.jpg"  />


 */}            </div>

        </>
    )
}