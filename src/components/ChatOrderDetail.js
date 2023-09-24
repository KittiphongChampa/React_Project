
import React, { useState, useEffect, useRef, createElement } from "react";
import * as Icon from 'react-feather';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import '../styles/main.css';
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ggIcon from '@mui/icons-material';

import Switch from 'react-switch';
import { Progress, Divider } from 'rsuite';
import 'rsuite/styles/index.less';
import TextareaAutosize from "react-textarea-autosize";
import ImgFullscreen from '../function/openFullPic'


export default function ChatOrderDetail(props) {

    const odModalRef = useRef();
    const briefModalRef = useRef();
    const historyModalRef = useRef();
    const fullImgRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!odModalRef.current.contains(event.target)) {
                !formModalOpened && !historyModalOpened && props.handleOdModal()
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    const [formModalOpened, setFormModalOpened] = useState(false)
    const [historyModalOpened, setHistoryModalOpened] = useState(false)

    function HistoryModal(){
        return (
            <>
                <div className="modal cms-detail" ref={historyModalRef}>
                    <div className="form-order-card">
                        <div className="close-tab"><button onClick={openHistoryModal}><Icon.X /></button></div>
                        <div className="form-order">
                            <h1 className="h4">ประวัติการดำเนินการและการแก้ไข</h1>
                            <table className="history-order-detail">
                                <tr>
                                    <td>วันนี้ 09.10 น.</td>
                                    <td>นักวาดA ระบุราคาคอมมิชชัน 200 บาท</td>
                                </tr>
                                <tr>
                                    <td>วันนี้ 08.59 น.</td>
                                    <td>ลูกค้าA อนุมัติภาพร่างแล้ว</td>
                                </tr>
                                <tr>
                                    <td>วันนี้ 08.40 น.</td>
                                    <td>นักวาดA ส่งภาพร่างแล้ว</td>
                                </tr>
                                <tr>
                                    <td>วันนี้ 08.20 น.</td>
                                    <td>แจ้งแก้ไขครั้งที่ 1 (1/3) : ยิ้มลืมตาและไม่อ้าปาก</td>
                                </tr>
                                <tr>
                                    <td>วันนี้ 08.00 น.</td>
                                    <td>นักวาดA ส่งภาพร่างแล้ว</td>
                                </tr>
                                <tr>
                                    <td>เมื่อวานนี้ 23.20 น.</td>
                                    <td>นักวาดA รับรีเควสแล้ว</td>
                                </tr>
                                
                            </table>
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const FormModal = (props) => {
        const [attImgComponents, setAttImgComponents] = useState([])

        function addNewAttImg(props) {
            setAttImgComponents([...attImgComponents, { text: "", pic: "" }])
            console.log(attImgComponents)
        }

        function removeAttImg(componentKey) {
            const update = attImgComponents.filter((_, i) => i !== componentKey);
            setAttImgComponents(update)
        }

        const handleChangeText = (index, newText) => {
            const updatedComponents = attImgComponents.map((component, i) => {
                if (index === i) {
                    return { ...component, text: newText };
                }
                return component;
            });
            setAttImgComponents(updatedComponents);
        };
        // function openFormModal() {
        //     setFormModalOpened(prevState => !prevState)
        // }

        // function openHistoryModal() {
        //     setFormModalOpened(prevState => !prevState)
        // }

        const [fullImgOpened, setFullImgOpened] = useState(false)
        const [src, setSrc] = useState("")

        const handleFullImg = (imgsrc) => {
            console.log("คลิกฟังชันโชว์", imgsrc)
            setFullImgOpened(prevState => !prevState)
            setSrc(imgsrc)

        }


        return <>
            <ImgFullscreen src={src} opened={fullImgOpened} handleFullImg={handleFullImg} />
            <div className="modal cms-detail" ref={briefModalRef}>
                <div className="form-order-card">
                    <div className="close-tab"><button onClick={openFormModal}><Icon.X /></button></div>
                    <div className="form-order">
                        <h1 className="h4">รายละเอียดคำขอจ้าง</h1>
                        {/* <p className="selected-packgage">Full color by boobii : Bust-up full color เริ่มต้น 500 P</p> */}
                        <div className="form-item">
                            <label>ประเภทการใช้งาน</label>  Personal use (ใช้ส่วนตัว)
                        </div>
                        <div className="form-item">
                            <label>จุดประสงค์การใช้ภาพ</label> จะนำไป print เป็น poster ให้เป็นของขวัญวันเกิดเพื่อน
                        </div>
                        <div className="form-item">
                            <label>รายละเอียด</label>ผู้หญิงตาสีน้ำตาลอ่อน ผมยาวสีดำประบ่าใส่แว่นทรงกลมสีชมพู มีผิวขาวอุ้มแมวส้มใส่วิก ผู้หญิงใส่เสื้อยืดคอกลมสีขาวมองกล้องและยิ้มสดใส พื้นหลังมีลูกโป่งตัวอักษร Happy Birthday
                        </div>

                        {/* <AttImgInput/> */}
                        <div className="form-item">
                            <label>ภาพประกอบ</label>
                            <div className="att-img-item mt-2 mb-2">
                                <div className="number"></div>
                                <div onClick={() => handleFullImg("../เหมียวเวห์.jpg")} className="small-show-att-img" style={{ backgroundImage: "url(../เหมียวเวห์.jpg)" }}></div>
                                <div className="desc-box">
                                    <label style={{ fontWeight: "400" }}>คำอธิบายเพิ่มเติม</label> แมวส้มใส่วิก ขอหน้าตาแบบนี้เป๊ะๆเลยค่ะไม่ต้องเปลี่ยนอะไร
                                </div>
                            </div>
                            <div className="att-img-item mt-2 mb-2">
                                <div className="number"></div>
                                <div onClick={() => handleFullImg("../ท่าแมว.jpg")} className="small-show-att-img" style={{ backgroundImage: "url(../ท่าแมว.jpg)" }}></div>
                                <div className="desc-box">
                                    <label style={{ fontWeight: "400" }}>คำอธิบายเพิ่มเติม </label> ท่าอุ้มแมว ส่วนพื้นหลังสีอะไรก็ได้ค่ะ สีไหนเข้าก็เอาสีนั้น
                                </div>
                            </div>
                            <div className="att-img-item mt-2 mb-2">
                                <div className="number"></div>
                                <div onClick={() => handleFullImg("../ทรงผม.jpg")} className="small-show-att-img" style={{ backgroundImage: "url(../ทรงผม.jpg)" }}></div>
                                <div className="desc-box">
                                    <label style={{ fontWeight: "400" }}>คำอธิบายเพิ่มเติม</label>
                                    ทรงผมผู้หญิง
                                </div>
                            </div>
                            <div className="att-img-item mt-2 mb-2">
                                <div className="number"></div>
                                <div onClick={() => handleFullImg("../ลูกโป่ง.jpg")} className="small-show-att-img" style={{ backgroundImage: "url(../ลูกโป่ง.jpg)" }}></div>
                                <div className="desc-box">
                                    <label style={{ fontWeight: "400" }}>คำอธิบายเพิ่มเติม</label>
                                    ลูกโป่งที่อยู่พื้นหลัง เอาสีอะไรก็ได้ที่เข้ากับพื้นหลัง
                                </div>
                            </div>

                            {/* {attImgComponents.map((component, index) => (

                                <div key={index} className="att-img-item mt-2 mb-2">
                                    <div className="number"></div>
                                    <div className="small-show-att-img" style={{ backgroundImage: "url(เหมียวเวห์.jpg)" }}></div>
                                    <div className="desc-box">
                                        <label style={{ fontWeight: "400" }}>คำอธิบายเพิ่มเติม</label>
                                        <input placeholder="เช่น ส่วนที่อยากให้ปรับนอกเหนือจากรูปที่แนบมา " className="txtarea-input" type="text" value={component.text}
                                            onChange={(e) => handleChangeText(index, e.target.value)} />
                                    </div>
                                    <button className="remove-img-item" onClick={() => removeAttImg(index)}><Icon.X /></button>
                                </div>
                            ))} */}
                        </div>

                        {/* <button className="addNewAttImgBtn" onClick={addNewAttImg}><Icon.Plus />เพิ่มภาพประกอบ</button>
                        <button className="orderSubmitBtn">ส่งคำขอขอจ้าง</button> */}
                    </div>
                </div>
            </div>
        </>
    }

    function openFormModal() {
        setFormModalOpened(prevState => !prevState)
    }

    function openHistoryModal() {
        setHistoryModalOpened(prevState => !prevState)
    }



    return (
        <>
            {formModalOpened ? <FormModal /> : null}
            {historyModalOpened ? <HistoryModal /> : null}
            <div className="backdrop-modal-area" ref={odModalRef} >
                <div className="od-modal-card">
                    <div className="od-headder">
                        <img src="เหมียวเวห์.jpg" />
                        <div>
                            <p>Full color by boobi</p>
                            <p>by boobi</p>
                        </div>
                    </div>
                    <div className="od-all-status">
                        <p className="od-q">คิวที่ 1</p>
                        <p className="od-stat">รอชำระเงิน</p>
                    </div>

                    <p>01:23:58</p>


                    <div className="od-edit-brief">
                        <button onClick={openFormModal}>ดูบรีฟ</button>
                        <button onClick={openHistoryModal}>ดูประวัติการดำเนินการ</button>
                        {/* <Icon.Info className="ms-2" /> */}
                    </div>
                    <div className="od-quota-grid">
                        <p className="quota-headding">ระยะเวลาทำงาน</p>
                        <p className="quota-amount">2 day</p>
                        <p className="quota-headding">ระยะเวลาทำงาน</p>
                        <p className="quota-amount">2 day</p>
                        <p className="quota-headding">ประเภทงาน</p>
                        <p className="quota-amount">Personal use</p>
                    </div>

                    <div className="od-progress-check">
                        <div className="progress-bar">
                        </div>
                        <p>รับรีเควส</p>
                        <p>ส่งภาพร่าง</p>
                        <p>คิดราคา</p>
                        <p>ชำระเงินครึ่งแรก</p>
                        <p>ส่งภาพเส้นเปล่า</p>
                        <p>ส่งภาพสีพื้น</p>
                        <p>ชำระเงินครึ่งหลัง</p>
                        <p>ส่งภาพ final</p>
                        <p>รอตรวจสอบภาพ</p>
                        <p>รีวิว</p>
                    </div>

                </div>
            </div>

        </>
    );
}


