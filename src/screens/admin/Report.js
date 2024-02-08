import * as Icon from 'react-feather';
// import UserBox from "../components/UserBox";
// import ReportItem from "../components/ReportItem";
import { Link, useParams } from 'react-router-dom';
import { Modal, Button, Input, Select, Space, Upload, Switch, Flex, Radio, Card } from 'antd';
import React, { useState, useEffect, useRef } from "react";
import ReportItem from "../../components/ReportItem";
import { CloseOutlined, LeftOutlined, HomeOutlined, UserOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../../alertdata/alertData";
import axios from "axios";
import { Helmet } from "react-helmet";

import { host } from "../../utils/api";

const title = "รายงาน";

export default function Report(props) {
    const jwt_token = localStorage.getItem("token");
    const { reportid } = useParams();
    const [reportDetail, setReportDetail] = useState()
    const [reportAll, setReportAll] = useState([])
    console.log(reportAll);
    useEffect(() => {
        setReportDetail(reportid)
        getReport()
    }, [reportid])

    const getReport = async() => {
        await axios.get(`${host}/allreport`, {
            headers: {
                Authorization: "Bearer " + jwt_token,
            },
        }).then((response) => {
            const data = response.data;
            if (data.status === 'ok') {
                setReportAll(data.results);
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {!reportDetail ?
                <>
                    <h1 className="">การรายงาน</h1>
                    <div className="all-user-head">
                    </div>
                    <div className="sub-menu-group mt-4">
                        <Link to="#" className="sub-menu selected"  >กำลังดำเนินการ</Link>
                        <Link to="#" className="sub-menu" >อนุมัติแล้ว</Link>
                        <Link to="#" className="sub-menu" >ลบแล้ว</Link>
                    </div>
                    <div className="report-item-area">
                        {/* <Link to="/admin/adminmanage/report/11"><ReportItem /></Link> */}

                        {/* ต้อง map */}
                        {reportAll.map((data) => (
                            <div key={data.sendrp_id}>
                                <Link to={`/admin/adminmanage/report/${data.sendrp_id}`}>
                                    <ReportItem 
                                        sendrp_header={data.sendrp_header}
                                        ex_img_path={data.ex_img_path}
                                        usr_reporter_id={data.usr_reporter_id}
                                        created_at={data.created_at}
                                    />
                                </Link>
                            </div>
                        ))}
                        
                    </div>
                </>
                :
                <>
                    <h1 className=""><Button className="icon-btn" size="large" type="text" icon={<LeftOutlined />} onClick={(e) => { e.stopPropagation(); window.location.href = '/admin/adminmanage/report'}}></Button>คอมมิชชั้นไอดีxxxxx</h1>
                    <Card className="mb-3 mt-3">
                        คอมมิชชันไม่ก็งานวาด
                        <p>ชื่อคอมมิช</p>
                        <Card className="reported-link" onClick={() => window.location.href="/admin/adminmanage/report"}>
                            <div className="reported-stuff">
                                <img src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop"></img>
                            </div>
                            <Link to={`/profile/`}>
                                <div id="cms-artist-profile">
                                    <img src="/AB1.png" alt="" />
                                    <p>username</p>
                                </div>
                            </Link>

                        </Card>

                        <Flex justify='center' gap="small">
                            <Button size="large" shape="round">เก็บคอมมิชชันนี้ไว้</Button>
                            <Button size="large" shape="round" danger>ลบคอมมิชชันนี้</Button>
                        </Flex>
                    </Card>
                    <p className="h6">รายงานที่เกี่ยวข้องกับคอมมิชชันนี้</p>
                    <div className="report-grid">

                        <Card>
                            <div className="report-content">
                                <Flex gap="1rem" vertical wrap="wrap">
                                    <Link to={`/profile/`}>
                                        <div id="cms-artist-profile">
                                            <img src="/AB1.png" alt="" />
                                            <p>แจ้งโดย xxxxx</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <p className="h6">หัวข้อที่มีการละเมิด: sy;-hvpjvp</p>
                                    </div>
                                    <div>
                                        <p className="h6">รายละเอียดที่มีการแจ้ง</p>
                                        <p>เบลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆๆๆๆๆลๆๆๆๆๆๆๆ</p>
                                    </div>
                                    <div>
                                        <p className="h6">ลิ้งค์ผลงานที่มีการลงมาก่อน</p>
                                        <p>บลาๆๆ</p>
                                    </div>
                                    <div>
                                        <p className="h6">อีเมลติดต่อกลับ</p>
                                        <p>email.ccccc</p>
                                    </div>
                                    <div>
                                        <p className="h6">คอมมิชชันหรืองานวาดที่ถูกรายงาน</p>
                                        <p>xxxxxxx</p>
                                    </div>
                                </Flex>
                                <Flex gap="small">
                                     {/* <Button size="large" shape="round">เก็บคอมมิชชันนี้ไว้</Button>
                                    <Button size="large" shape="round" danger>ลบคอมมิชชันนี้</Button> */}
                                </Flex>

                            </div>
                        </Card>
                        <Card>
                            <div className="report-content">
                                <Flex gap="1rem" vertical wrap="wrap" flex={1}>
                                    <Link to={`/profile/`}>
                                        <div id="cms-artist-profile">
                                            <img src="/AB1.png" alt="" />
                                            <p>แจ้งโดย xxxxx</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <p className="h6">หัวข้อที่มีการละเมิด: sy;-hvpjvp</p>
                                    </div>
                                    <div>
                                        <p className="h6">รายละเอียดที่มีการแจ้ง</p>
                                        <p>เบลๆๆๆๆๆๆๆๆๆๆลๆๆๆๆๆๆๆ</p>
                                    </div>
                                    <div>
                                        <p className="h6">ลิ้งค์ผลงานที่มีการลงมาก่อน</p>
                                        <p>บลาๆๆ</p>
                                    </div>
                                    <div>
                                        <p className="h6">อีเมลติดต่อกลับ</p>
                                        <p>email.ccccc</p>
                                    </div>
                                    <div>
                                        <p className="h6">คอมมิชชันหรืองานวาดที่ถูกรายงาน</p>
                                        <p>xxxxxxx</p>
                                    </div>
                                </Flex>
                                <Flex gap="small">
                                     {/* <Button size="large" shape="round">เก็บคอมมิชชันนี้ไว้</Button>
                                    <Button size="large" shape="round" danger>ลบคอมมิชชันนี้</Button> */}
                                </Flex>

                            </div>
                        </Card>
                        <Card>
                            <div className="report-content">
                                <Flex gap="1rem" vertical wrap="wrap">
                                    <Link to={`/profile/`}>
                                        <div id="cms-artist-profile">
                                            <img src="/AB1.png" alt="" />
                                            <p>แจ้งโดย xxxxx</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <p className="h6">หัวข้อที่มีการละเมิด: sy;-hvpjvp</p>
                                    </div>
                                    <div>
                                        <p className="h6">รายละเอียดที่มีการแจ้ง</p>
                                        <p>เบลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆลๆๆๆๆๆๆๆๆๆๆลๆๆๆๆๆๆๆ</p>
                                    </div>
                                    <div>
                                        <p className="h6">ลิ้งค์ผลงานที่มีการลงมาก่อน</p>
                                        <p>บลาๆๆ</p>
                                    </div>
                                    <div>
                                        <p className="h6">อีเมลติดต่อกลับ</p>
                                        <p>email.ccccc</p>
                                    </div>
                                    <div>
                                        <p className="h6">คอมมิชชันหรืองานวาดที่ถูกรายงาน</p>
                                        <p>xxxxxxx</p>
                                    </div>
                                </Flex>
                                <Flex gap="small">
                                    {/*  {/* <Button size="large" shape="round">เก็บคอมมิชชันนี้ไว้</Button>
                                    <Button size="large" shape="round" danger>ลบคอมมิชชันนี้</Button> */} 
                                </Flex>

                            </div>
                        </Card>
                    </div>

                </>}
            {/* ในกรณีที่มีการลบโพสต์แล้วรายงานที่เกี่ยวข้องจะขึ้นว่าถูกลบแล้วทั้งหมด */}
        </>
    )
}

// // import * as Icon from 'react-feather';
// // import UserBox from "../components/UserBox";
// import ReportItem from "../../components/ReportItem";
// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from "react";

// export default function Report(props) {
//     const jwt_token = localStorage.getItem("token");
//     useEffect(() => {
//         // if (localStorage.getItem("token")) {
//         //   if (window.location.pathname === "/login") {
//         //     navigate("/admin/alluser");
//         //   }
//         // } else {
//         //   navigate("/login");
//         // }
//         // getData();
//     }, []);

//     return (
//         <>


//             <h1 className="">การรายงาน</h1>
//             {/* <div style={{ border: "1px solid gray", borderRadius: "200px", padding: "0.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
//                 <button className="sub-menu " >ทั้งหมด</button>
//                 <button className="sub-menu" >การรายงาน</button>
//                 <button className="sub-menu">โพสต์ที่ถูกสั่งลบ</button>
//                 <button className="sub-menu selected">รายชื่อผู้ใช้</button>
//             </div> */}


//             <div className="all-user-head">
//                 {/* <h3>รายชื่อผู้ใช้ (4)</h3> */}
//                 {/* <div>
//                     <button><Icon.Plus /> เพิ่มแอดมิน</button>
//                     <input type="text" style={{ borderRadius: "200px", border: "1px solid gray" }} placeholder=" ค้นหา..."></input>
//                 </div> */}
//             </div>
//             <div className="sub-menu-group mt-4">
//                 <Link to="/homepage" id="foryou" className="sub-menu selected"  >กำลังดำเนินการ</Link>
//                 <Link to="/homepage/commissions" id="commissions" className="sub-menu" >อนุมัติแล้ว</Link>
//                 <Link to="/homepage/gallery" id="gallery" className="sub-menu" >ลบแล้ว</Link>
//             </div>
//             <div className="report-item-area">
//                 <ReportItem src="/monlan.png"  />
//             </div>

//         </>
//     )
// }