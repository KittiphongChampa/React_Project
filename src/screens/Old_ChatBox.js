
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
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ggIcon from '@mui/icons-material';

import Switch from 'react-switch';

import ChatOrderDetail from '../components/ChatOrderDetail'
// import SimpleBar from 'simplebar-react';
import Scrollbars from 'react-scrollbars-custom';
// import 'simplebar/dist/simplebar.min.css';
import ChatAddModal from '../components/ChatAddModal'

import ImgFullscreen from '../function/openFullPic'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import * as alertData from '../alertdata/alertData';


const title = 'แชท';


function ChatMessage(props) {
    let chatType = ""
    if (props.chatType == '1') {
        chatType = "their-message"
    } else {
        chatType = "my-message"
    }
    //ใส่ด้วยว่าถ้าเวลาที่ส่งต่อกันน้อยกว่า 5 นาทีให้ใส่เวลา

    return <div className="user-message">
        <div className={chatType}>
            <div>
                <p className="message">{props.message}</p>
                <p className="time-sent">10.55 น.</p>
            </div>
            {/* <p className="time-sent">10.55 น.</p> */}
        </div>
    </div>;
}





export default function ChatBoxUI() {
    const chat = useRef(null);
    const message = 'Contrary to popular belsssssssssssssssssssssadfe   grgegief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3'
    const [messages, setMessages] = useState([]);
    const [chatlist, setChatlist] = useState();
    const [currentChat, setCurrentChat] = useState();
    const [showOderDetailModal, setShowOrderDetailModal] = useState(false);

    const handleOdModal = () => {
        setShowOrderDetailModal(prevState => !prevState)
    }

    function submitEdit() {
        Swal.fire({
            title: 'ระบุรายละเอียดที่แก้ไข',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            }, showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'ยืนยันการแก้ไขภาพร่างหรือไม่?',
                    // showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'ตกลง',
                    cancelButtonText: 'ยกเลิก',
                    // denyButtonText: `Don't save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire('Saved!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }
        })
    }


    useEffect(() => {
        chat.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentChat]);


    const toBottom = () => {
        setMessages(prevMessages => [...prevMessages, <ChatMessage message={message} chatType="2" />]);

    };

    function menuChat(event, menu, path) {
        // path!==null && history.push(`/artistmanagement/${path}`)
        let oldSelected = document.querySelector('button.selected')
        oldSelected.classList.remove('selected')
        event.target.classList.add('selected')
        if (menu == 'order') {
            setChatlist(<><div></div><p>ออเดอร์</p></>)
        }
        else if (menu == 'private') {
            setChatlist(<><div></div><p>ไพรเวท</p></>)
        } else {
            setChatlist()

        }
    }

    function UserChat(props) {

        return <>
            <div className={"chat-item " + (currentChat == props.id ? "selected" : "")} onClick={props.onClick} id={props.id}>
                <img src={props.src}></img>
                <div>
                    {!isToggled && <><p className="order">{props.username}</p>
                        <p className="message">{props.message}</p>
                        <p className="time"><span className="stat">{props.time}</span></p></>}


                    {isToggled && <><p className="order filterd">xxxx</p>
                        <p className="message filterd">bust-up full color..</p>
                        <p className="time filterd"> <span className="q">คิวที่1</span><span className="stat">รอชำระเงินครึ่งแรก</span></p></>}

                </div>
            </div>
            <div className="qq">
                <div className={currentChat == props.id ? "arrow" : ""} />
            </div>
        </>;
    }

    const chatSelected = (id) => {
        // if (showOderDetailModal) {
        //     handleOdModal()
        // } 
        setCurrentChat(id)
        console.log('chat user ืำงาน')
    }


    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(prevState => !prevState);
    };

    function ChatImg(props) {
        let chatType = ""
        if (props.chatType == '1') {
            chatType = "their-message"
        } else {
            chatType = "my-message"
        }

        return <div className="user-message" >
            <div className={chatType}>
                <div>
                    <div className="att-image" style={{ cursor: "pointer" }} onClick={() => handleFullImg(props.src)}><img src={props.src} /></div>
                    <p className="time-sent">10.55 น.</p>
                </div>
                {/* <p className="time-sent">10.55 น.</p> */}
            </div>
        </div>;
    }


    function SelectedChat(props) {


        return <>
            <div className="chat-header">
                <div className="chat-name">
                    <img src="../b3.png"></img>
                    <div>
                        <p>Full color by boobii : bust-up full color</p><p>สั่งโดยxxxx</p>
                    </div>
                </div>
                <div className="status-chat-header">
                    <p>คิว1</p><p>รอชำระเงินครึ่งแรก</p>
                </div>
                <button className="menu-icon-chat" onClick={handleOdModal}><Icon.Menu className='' /></button>
            </div>
            <Scrollbars>
                <div className="chat" >


                    <div className="time-message">10.54 น.</div>
                    <div className="system-message progress">

                        <p className="progress-headding h3">ภาพร่าง</p>
                        <div className="progress-img-container">
                            <div><img src="../ร่าง1.png" onClick={() => handleFullImg("../ร่าง1.png")} /></div>
                        </div>
                        <div className="btn-group">
                            <p>แก้ไขภาพร่าง (1/3)</p>
                        </div>
                    </div>

                    <ChatMessage message="เอายิ้มลืมตาค่ะ และยิ้มปิดปากค่ะ" chatType="1" />
                    <ChatMessage message="แก้ปค่นี้ใช่ไหมคะ" chatType="2" />
                    <ChatMessage message="ค่ะ" chatType="1" />
                    <div className="time-message">10.54 น.</div>
                    <div className="system-message"><p>แก้ไขภาพร่างครั้งที่ 1 (1/3) : ยิ้มลืมตาไม่อ้าปาก</p></div>

                    <div className="time-message">10.54 น.</div>
                    <div className="system-message progress">
                        <p className="progress-headding h3">ภาพร่าง</p>
                        <div className="progress-img-container">
                            <div><img src="../ร่าง2.png" onClick={() => handleFullImg("../ร่าง2.png")} /></div>
                        </div>
                        <div className="btn-group">
                            <button onClick={submitEdit}>แก้ไขภาพร่าง (1/3)</button>
                            <button>อนุมัติภาพร่าง</button>
                            <button className="remove-btn">ลบภาพร่าง</button>
                        </div>
                    </div>

                    <ChatMessage message="เอาแบบนี้ค่ะ" chatType="1" />
                    <div className="time-message">10.54 น.</div>
                    <div className="system-message"><p>อนุมัติภาพร่างแล้ว</p></div>
                    <div className="time-message">10.54 น.</div>

                    <div className="system-message announcement">
                        {/* <p className="h3">แก้ไขครั้งที่ 4 (4/3)</p> */}
                        <p>ระบุราคาคอมมิชชัน</p>
                        <input type="number" className="txtarea-input" placeholder="xxxxxxxxxxxxxxxx" />
                        <button>แจ้งราคา</button>
                    </div>

                    <div className="time-message">10.54 น.</div>
                    <div className="system-message announcement">
                        {/* <p className="h3">แก้ไขครั้งที่ 4 (4/3)</p> */}
                        <p>ชำระเงินครึ่งแรก</p>
                        <p>รูป qr code</p>
                        <p>....รอ xxxx ชำระเงิน....</p>
                    </div>


                    {/* <ChatImg src="../boo.jpg" chatType="1" />
                    <ChatImg src="../แต๋มคลั่ง.jpg" chatType="2" /> */}
                    <div className="time-message">10.54 น.</div>

                    <div className="system-message announcement">
                        {/* <p className="h3">แก้ไขครั้งที่ 4 (4/3)</p> */}
                        <p>แก้ไขภาพร่างครั้งที่ 4 (4/3) : xxxxx</p>
                        <input type="number" className="txtarea-input" placeholder="xxxxxxxxxxxxxxxx" />
                        <span><button>แจ้งราคา</button> <button>ยกเลิกการแก้ไข</button></span>
                    </div>
                    <div className="time-message">10.54 น.</div>
                    <div className="system-message announcement">
                        {/* <p className="h3">แก้ไขครั้งที่ 4 (4/3)</p> */}
                        <p>แจ้งเปลี่ยนแปลงราคา</p>
                        <p>200 =&gt; 250</p>
                        <p>เนื่องจาก เพิ่มพื้นหลัง</p>

                        <span><button>ยกเลิกการเปลี่ยนแปลงราคา</button></span>
                    </div>
                    {messages}
                    <div ref={chat}></div>



                </div >
            </Scrollbars>

            <div className="chat-sender">
                <Icon.Plus className='plus-icon' onClick={handleAddModel} /><input type="text" placeholder="พิมพ์ข้อความ..."></input><button onClick={toBottom}><Icon.Send className='send-icon' /></button>
            </div>
        </>
    }

    const [chatAddModel, setChatAddModel] = useState(false)

    const handleAddModel = () => {
        setChatAddModel(prevState => !prevState)
    }

    const [fullImgOpened, setFullImgOpened] = useState(false)
    const [src, setSrc] = useState("")

    const handleFullImg = (imgsrc) => {
        console.log("คลิกฟังชันโชว์", imgsrc)
        setFullImgOpened(prevState => !prevState)
        setSrc(imgsrc)

    }

    return (
        <>
            {/* <div style={{ width: "100vw", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}> */}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <ImgFullscreen src={src} opened={fullImgOpened} handleFullImg={handleFullImg} />

            {chatAddModel ? <ChatAddModal onClick={handleAddModel} /> : null}

            {/* -----ดิฟ1 ฝั่งรายชื่อ ------*/}
            <div className="aside-chatbox">
                <div className="headding">
                    <h1>Chat</h1>
                </div>
                <div className="menu-chat-grid">
                    <div className="menu-chat">
                        <button onClick={(event) => menuChat(event, 'all')} className="selected"> ทั้งหมด</button>
                        <button onClick={(event) => menuChat(event, 'order', 'order')}> ออเดอร์</button>
                        <button onClick={(event) => menuChat(event, 'private', 'private')}> ส่วนตัว</button>
                    </div>
                </div>
                <div className="toggle-button-div">
                    <div>
                        <Switch
                            checked={isToggled}
                            onChange={handleToggle}
                            onColor="#958EDC"
                            onHandleColor="#FFEAFB"
                            handleDiameter={24}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={24}
                            width={48}
                        />
                        <p className="ms-2 text-white">เปิดดูคิวและสถานะ</p>
                    </div>
                </div>
                {/* <div></div> */}

                <div className="chat-list">
                    {chatlist}
                    {/* <button ref={odModalRef}>ลอง</button>
                        {showOderDetailModal ?<p>open</p> : null} */}
                    <UserChat id="1" onClick={() => chatSelected('1')} message="ข้อความ" username="K.aa" src="../kaveh.png" time="15.00 น." />
                    <UserChat id="2" onClick={() => chatSelected('2')} message="ข้อความ" username="Alna" src="../boo.jpg" time="12.00 น." />
                    <UserChat id="3" onClick={() => chatSelected('3')} message="ข้อความ" username="Deera Alby" src="../Ares.png" time="10.00 น." />

                    <div className={"chat-item " + (currentChat == "8" ? "selected" : "")} onClick={SelectedChat} id="8">
                        <img src="../เหมียวเวห์.jpg"></img>
                        <div>
                            <><p className="order">aaa</p>
                                <p className="message">ข้อความ</p>
                                <p className="time"><span className="stat">18.00น.</span></p></>

                        </div>
                    </div>
                    <div className="qq">
                        <div className={currentChat == "8" ? "arrow" : ""} />
                    </div>
                </div>
            </div>


            {/* -----ดิฟ2  กดแล้วให้เปลี่ยนตรงนี้------*/}
            <div className="chat-room">
                {showOderDetailModal ? <ChatOrderDetail handleOdModal={handleOdModal} /> : null}

                {/* {currentChat ? <SelectedChat /> : <p>ไม่มีแชทปจบ</p>} */}

                <SelectedChat />

            </div>
            {/* </div >
            </div> */}
        </>
    );
}


