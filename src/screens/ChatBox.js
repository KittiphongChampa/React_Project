
import React, { useState, useEffect, useRef, createElement } from "react";
import * as Icon from 'react-feather';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
// import "../css/recent_index.css";
// import '../styles/index.css';
import '../styles/main.css';
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from './Profile';
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import CmsItem from "../components/CmsItem";
import ImgSlide from './../components/ImgSlide';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ggIcon from '@mui/icons-material';
import { Grid } from '@mui/material/Grid';

import Switch from 'react-switch';


const title = 'รายละเอียด cms';
// const bgImg = { backgroundImage: "url('mainmoon.jpg')", backgroundSize: " cover", backgroundOpacity: "0.5" }
const body = { backgroundImage: "url('seamoon.jpg')" }

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
            <div>{props.message}</div>
            {/* <p className="time-sent">10.55 น.</p> */}
        </div>
    </div>;
}





export default function ChatBox() {
    const chat = useRef(null);


    const message = 'Contrary to popular belsssssssssssssssssssssadfe   grgegief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3'

    const [messages, setMessages] = useState([]);
    const [chatlist, setChatlist] = useState();
    const [currentChat, setCurrentChat] = useState();


    useEffect(() => {
        chat.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentChat]);


    const toBottom = () => {
        setMessages(prevMessages => [...prevMessages, <ChatMessage message={message} chatType="2" />]);

    };

    function menuChat(event, menu) {
        let oldSelected = document.querySelector('button.selected')
        oldSelected.classList.remove('selected')
        event.target.classList.add('selected')
        if (menu == 'order') {
            setChatlist(<><div /><p>ออเดอร์จ้า</p><div /></>)
        }
        else if (menu == 'private') {
            setChatlist(<><div /><p>ข้อความส่วนตัว</p><div /></>)
        } else {
            setChatlist(<><div /><p>ทั้งหมด</p><div /></>)

        }
    }

    function UserChat(props) {

        // ถ้า idในตัวแปร = id ให้มันแสดงคลาส selected



        return <>
            <div className={"chat-item " + (currentChat == props.id ? "selected" : "")} onClick={props.onClick} id={props.id}>
                <img src="b3.png"></img>
                <div>
                    {!isToggled && <><p className="order">ออเsssssดอร์ xssssssxxxx</p>
                        <p className="message">ข้อควsssssssssssssssssss</p>
                        <p className="time"><span className="stat">00:12 น.</span></p></>}


                    {isToggled && <><p className="order filterd">xxxx</p>
                        <p className="message filterd">bust-up full color..</p>
                        <p className="time filterd"> <span className="q">คิวที่1</span><span className="stat">รอชำระเงิน</span></p></>}

                </div>
            </div>
            <div className="qq">
                <div className={currentChat == props.id ? "arrow" : ""} />
            </div>
        </>;
    }

    const chatSelected = (id) => {
        setCurrentChat(id)
        console.log('chat user ืำงาน')
    }


    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(prevState => !prevState);
    };

    function filter() {
        let allOrderChat = document.querySelectorAll('.')

        allOrderChat.forEach((chat) => {
            chat.style.display = 'none'
        });

        let show = document.querySelectorAll('.filterd')

        show.forEach((chat) => {
            chat.style.display = 'block'
        });
    }

    function SelectedChat(props) {




        return <>
            <div className="chat-header">
                <div className="chat-name">
                    <img src="b3.png"></img>
                    <div><p>Full color by boobii : bust-up full color</p><p>สั่งโดยxxxx</p></div>
                </div>
                <div className="status-chat-header">
                    <p>คิว1</p><p>รอจ่ายเงิน</p>
                </div>
                <p className="menu-icon-chat"><Icon.Menu className='' /></p>
            </div>
            <div className="chat" >
                <div className="time-message">10.54 น.</div>
                <div className="system-message">ข้อความระบบ</div>
                <ChatMessage message={message} chatType="1" />
                <ChatMessage message={message} chatType="2" />
                <ChatMessage message="ฮิ" chatType="1" />
                <ChatMessage message="ฮุ" chatType="1" />
                <div className="system-message">ข้อความระบบ</div>
                <div className="system-message">ข้อความระบบ</div>
                {messages}
                <div ref={chat}></div>

            </div >

            <div className="chat-sender">
                <Icon.Plus className='plus-icon' /><input type="text" placeholder="พิมพ์ข้อความ..."></input><button onClick={toBottom}><Icon.Send className='send-icon' /></button>
            </div>
        </>
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <NavbarUser />
            <div className="chatbox-container">

                {/* -----ดิฟ1 ฝั่งรายชื่อ ------*/}
                <div className="aside-chatbox">
                    <div className="menu-chat-grid">
                        {/* <div></div> */}
                        <div className="menu-chat">
                            <button onClick={(event) => menuChat(event, 'all')} className="selected"> ทั้งหมด</button>
                            <button onClick={(event) => menuChat(event, 'order')}> ออเดอร์</button>
                            <button onClick={(event) => menuChat(event, 'private')}> ส่วนตัว</button>

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
                            <p className="ms-2 text-white">เปิดดูคิวและสถานะ</p></div>
                    </div>
                    {/* <div></div> */}

                    <div className="chat-list">
                        {chatlist}
                        <UserChat id="1" onClick={() => chatSelected('1')} />
                        <UserChat id="2" onClick={() => chatSelected('2')} />
                        <UserChat id="3" onClick={() => chatSelected('3')} />
                    </div>
                </div>


                {/* -----ดิฟ2  กดแล้วให้เปลี่ยนตรงนี้------*/}
                <div className="chat-room">
                    {currentChat ? <SelectedChat /> : <p>ไม่มีแชทปจบ</p>}
                </div>

            </div >
        </>
    );
}


