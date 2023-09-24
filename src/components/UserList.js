import * as Icon from 'react-feather';
import UserBox from "../components/UserBox";


export default function UserList(props) {
    return (
        <>


            <h1 className="">การจัดการแอดมิน</h1>
            {/* <div style={{ border: "1px solid gray", borderRadius: "200px", padding: "0.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                <button className="sub-menu " >ทั้งหมด</button>
                <button className="sub-menu" >การรายงาน</button>
                <button className="sub-menu">โพสต์ที่ถูกสั่งลบ</button>
                <button className="sub-menu selected">รายชื่อผู้ใช้</button>
            </div> */}

            <div className="all-user-head">
                <h2>รายชื่อผู้ใช้ (10)</h2>
                <div>
                    <button><Icon.Plus /> เพิ่มแอดมิน</button>
                    <input type="text" style={{ borderRadius: "200px", border: "1px solid gray" }} placeholder=" ค้นหา..."></input>
                </div>
            </div>
            <div className="user-item-area">
                <UserBox src="b3.png" username="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" userid="aaaa" />
                <UserBox src="b3.png" username="aa" userid="aaaa" />
                <UserBox src="b3.png" username="aa" userid="aaaa" />
                <UserBox src="b3.png" username="aa" userid="aaaa" />
                <UserBox src="b3.png" username="aa" userid="aaaa" />
                <UserBox src="b3.png" username="aa" userid="aaaa" />


            </div>

        </>
    )
}