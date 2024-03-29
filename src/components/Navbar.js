import axios from "axios";
import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import { useState, useEffect, useRef } from 'react';
import * as ggIcon from '@mui/icons-material';
import { useNavigate, Link } from "react-router-dom";
import { io } from "socket.io-client";

import { host } from "../utils/api";

const NavbarUser = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef();
    const [userdata, setUserdata] = useState([]);

    // ส่วนของการแสดงผล noti
    const [notifications, setNotifications] = useState([]);
    const [openNoti, setOpenNoti] = useState(false);
    const socket = useRef();
    useEffect(() => {
        if (userdata) {
            socket.current = io(`${host}`);
            socket.current.emit("add-user", userdata.id);
            socket.current.on('getNotification', (data) => {
                setNotifications((prev) => [...prev, data.data]);
            })
        }
    }, [socket, userdata]);

    const displayNotification = ( data ) => {
        if (data.msg === 'รับคำขอจ้าง') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} </span>
                    </a>
                </div>
            );
        } else if (data.msg === 'ไม่รับคำขอจ้าง') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at} </span>
                    </a>
                </div>
            );
        } else if (data.msg === 'ได้ส่งภาพร่าง') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'แจ้งเตือนการชำระเงินครั้งที่ 1') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'แจ้งเตือนการชำระเงินครั้งที่ 2') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'ได้ส่งผลงานแล้ว') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'ส่งคำขอจ้าง') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'โปรดตั้งราคางาน') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'ได้ชำระเงินครั้งที่ 1 แล้ว') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        } else if (data.msg === 'ได้ชำระเงินครั้งที่ 2 แล้ว') {
            return (
                <div key={data.order_id}>
                    <a href={`/chatbox?id=${data.sender_id}&od_id=${data.order_id}`}>
                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} {data.created_at}</span>
                    </a>
                </div>
            );
        }
    };

    const handleRead = () => {
        // setNotifications([]);
        setOpenNoti(false);
    };
    
    
    // console.log('urs_type '+userdata.urs_type);

    useEffect(() => {
        getUser();
        let handler = (event) => {
            if (!dropdownRef.current.contains(event.target)) {
                setOpen(false)
                // console.log(dropdownRef.current);
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [])
    const token = localStorage.getItem("token");
    const getUser = async () => {
        await axios
            .get(`${host}/index`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                const data = response.data;
                if (data.status === "ok") {
                    setUserdata(data.users[0]);
                }
                axios.get(`${host}/noti/getmsg`,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }).then((response) => {
                    const data = response.data;
                    console.log(data);
                    setNotifications(data.dataNoti);
                })
                // const getNotidata = axios.get(
                //     `${host}/noti/getmsg`, {
                //         headers: {
                //             Authorization: "Bearer " + token,
                //         },
                //     }
                // )
                // setNotifications(getNotidata.data)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        navigate("/welcome");
    };


    return (
        <div class="nav-box" >
            <nav class="nav-container">
                <div class="inline-nav">
                    <a href="/"><Icon.Home className='nav-icon' /></a>
                    <a href="#"><Icon.Search className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    {/* <a href="#"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a> */}
                    {/* โค้ดการแสดงผลการแจ้งเตือน ให้มิ้นท์แก้ใหม่ */}
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => setOpenNoti(!openNoti)}>
                            <Icon.Bell className='nav-icon' />
                            {notifications.length > 0 && (
                                <div className="counter">{notifications.length}</div>
                            )}
                        </button>
                        <div className={`dropdown-area ${openNoti ? 'open' : 'close'}`} >
                            <div className="notifications">
                                {/* {notifications.map(data => (
                                    <div key={data.reportId}>
                                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} </span>
                                    </div>
                                ))} */}
                                {notifications.map((n) => displayNotification(n))}
                                <button className="nButton" onClick={handleRead}>
                                    Mark as read
                                </button>
                            </div>
                        </div>
                    </div>

                    <a href="/chatbox"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    {/* <a href="/manage-commission"><Icon.PlusSquare className='nav-icon' /></a>  */}
                    {userdata.urs_type === 1 ? (
                        <>
                            <a href="/manage-commission"><Icon.PlusSquare className='nav-icon' /></a>
                        </>
                    ) : (
                        <></>
                    )}
                
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }}
                        // style={{ backgroundImage: "url(mainmoon.jpg)" }}
                        >
                            <img src={userdata.urs_profile_img} style={{ width: "45px", height: "45px", borderRadius: "45px" }} />
                        </button>
                        <div className={`dropdown-area ${open ? 'open' : 'close'}`} >
                            <a href="/profile" className="in-dropdown"><Icon.User className='nav-icon mx-2' />โปรไฟล์ของฉัน</a>
                            <a href="/setting-profile" className="in-dropdown"><Icon.Settings className='nav-icon mx-2' />ตั้งค่าโปรไฟล์</a>
                            {userdata.urs_type === 1 ? (
                                <>
                                    <a href="/artistmanagement/dashboard" className="in-dropdown"><ggIcon.GridView className='nav-icon mx-2' />Dashborad</a>
                                    <a href="/chatbox" className="in-dropdown"><Icon.MessageCircle className='nav-icon mx-2' />แชทและออเดอร์</a>
                                </>
                            ) : (
                                <>
                                    <a href="/chatbox" className="in-dropdown"><Icon.MessageCircle className='nav-icon mx-2' />แชท</a>
                                </>
                            )}
                            <a href="#" className="in-dropdown"><Icon.HelpCircle className='nav-icon mx-2' />ช่วยเหลือ</a>
                            <a href="#" onClick={handleLogout} className="in-dropdown"><Icon.LogOut className='nav-icon mx-2' />ออกจากระบบ</a>
                            {/* <a href="/login" className="in-dropdown"><Icon.User className='nav-icon mx-2' />โปรไฟล์ของฉัน</a> */}
                            {/* <a href="/setting-profile" className="in-dropdown"><Icon.User className='nav-icon mx-2' />การตั้งค่า</a> */}
                            {/* <a href="/setting-coin" className="in-dropdown"><ggIcon.CurrencyExchange className='nav-icon mx-2' />ประวัติการซื้อ/ใช้เหรียญ</a> */}
                            {/* <a href="/chat" className="in-dropdown"><Icon.MessageCircle className='nav-icon mx-2' />แชทและออเดอร์</a> */}
                            {/* <a href="#" className="in-dropdown"><ggIcon.Payments className='nav-icon mx-2' />ถอนเงิน</a> */}
                            {/* <a href="/buycoin" className="in-dropdown"><ggIcon.MonetizationOn className='nav-icon mx-2' />เติมเหรียญ</a> */}
                            {/* <a href="#" className="in-dropdown"><Icon.HelpCircle className='nav-icon mx-2' />ช่วยเหลือ</a> */}
                            {/* <a href="#" onClick={handleLogout} className="in-dropdown"><Icon.LogOut className='nav-icon mx-2' />ออกจากระบบ</a> */}
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

const NavbarHomepage = (props) => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef();

    // useEffect(() => {
    //     let handler = (event) => {
    //         if (!dropdownRef.current.contains(event.target)) {
    //             setOpen(false)
    //             // console.log(dropdownRef.current);
    //         }
    //     }
    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     }
    // })

    return (
        <div class="nav-box" style={{ position: "fixed", backgroundColor: "transparent", border: "none" }}>
            <nav class="nav-container" >
                <div class="inline-nav inhomepage" >
                    <a href="#"><Icon.Search className='nav-icon' /></a>
                    <a href="#"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav inhomepage">
                    {/* <a href="#"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="#"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="#"><Icon.PlusSquare className='nav-icon' /></a> */}
                    {/* <div className="show-coin">
                        <p>300 C</p>
                    </div> */}
                    <a href="/login">เข้าสู่ระบบ</a>

                    {/* <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }} style={{ backgroundImage: "url(mainmoon.jpg)" }}>
                        </button>
                        <ul className={`dropdown-area ${open ? 'open' : 'close'}`} >
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                        </ul>
                    </div> */}

                </div>
            </nav>
        </div>
    )
}

const NavbarGuest = (props) => {
    return (
        <div class="nav-box" >
            <nav class="nav-container" >
                <div class="inline-nav" >
                    <a href="/"><Icon.Search className='nav-icon' /></a>
                    <a href="/"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    {/* <a href="/"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a> */}
                    {/* <a href="/login_M"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a> */}
                    {/* <a href="/userprofile"><Icon.PlusSquare className='nav-icon' /></a> */}
                    {/* <div className="show-coin">
                        <p>300 C</p>
                    </div> */}
                    <a href="/login">เข้าสู่ระบบ</a>

                    {/* <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }} style={{ backgroundImage: "url(mainmoon.jpg)" }}>
                        </button>
                        <ul className={`dropdown-area ${open ? 'open' : 'close'}`} >
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                            <li>ddd</li>
                        </ul>
                    </div> */}

                </div>
            </nav>
        </div>
    )
}

const NavbarAdmin = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef();
    const [admindata, setAdmindata] = useState([]);

    // ส่วนของการแสดงผล noti
    const [notifications, setNotifications] = useState([]);
    const [openNoti, setOpenNoti] = useState(false);

    useEffect(() => {
        const socket = io(`${host}`);
        socket.on('adminNotification', (data) => {
        //   console.log('New report received:', data);
          setNotifications((prev) => [...prev, data.data]);
        })
    }, [])

    const handleRead = () => {
        // setNotifications([]);
        setOpenNoti(false);
    };

    useEffect(() => {
        getAdmin();
        let handler = (event) => {
            if (!dropdownRef.current.contains(event.target)) {
                setOpen(false)
                // console.log(dropdownRef.current);
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [])

    const getAdmin = async () => {
        const token = localStorage.getItem("token");
        await axios
            .get(`${host}/admin`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                const data = response.data;
                if (data.status === "ok") {
                    setAdmindata(data.admins[0]);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        navigate("/welcome");
    };
    
    return (
        <div class="nav-box" >
            <nav class="nav-container">
                <div class="inline-nav">
                    <a href="#"><Icon.Search className='nav-icon' /></a>
                    <a href="/admin"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    {/* <a href="#"><Icon.Bell className='nav-icon' /></a> */}

                    {/* โค้ดการแสดงผลการแจ้งเตือน ให้มิ้นท์แก้ใหม่ */}
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => setOpenNoti(!openNoti)}>
                            <Icon.Bell className='nav-icon' />
                            {notifications.length > 0 && (
                                <div className="counter">{notifications.length}</div>
                            )}
                        </button>
                        <div className={`dropdown-area ${openNoti ? 'open' : 'close'}`} >
                            <div className="notifications">
                                {notifications.map(data => (
                                    <div key={data.reportId}>
                                        <span><img src={data.sender_img} style={{width:30}}/>{data.sender_name} {data.msg} </span>
                                    </div>
                                ))}
                                <button className="nButton" onClick={handleRead}>
                                    Mark as read
                                </button>
                            </div>
                        </div>
                    </div>

                    <a href="/admin/adminmanage/alladmin"><ggIcon.AdminPanelSettings className='nav-icon' /></a>
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }}>
                            <img src={admindata.admin_profile} style={{ width: "45px", height: "45px", borderRadius: "50px" }} />
                        </button>
                        <div className={`dropdown-area ${open ? 'open' : 'close'}`} >
                            {admindata.admin_type === 0 ? (
                                <>
                                    <a href="#" className="in-dropdown"><Icon.User className='nav-icon mx-2' />ตั้งค่าโปรไฟล์</a>
                                    <a href="/admin/adminmanage/alladmin" className="in-dropdown"><ggIcon.AdminPanelSettings className='nav-icon mx-2' />จัดการแอดมิน</a>
                                </>
                            ) : (
                                <></>
                            )}
                            <a href="/admin/adminmanage/alluser" className="in-dropdown"><ggIcon.Group className='nav-icon mx-2' />จัดการผู้ใช้งาน</a>
                            <a href="/admin/adminmanage/allcms" className="in-dropdown"><ggIcon.ImageSearch className='nav-icon mx-2' />ตรวจสอบรายงานรูปภาพ</a>
                            <a href="/admin/adminmanage/allfaq" className="in-dropdown"><Icon.HelpCircle className='nav-icon mx-2' />จัดการคำถามที่พบบ่อย</a>
                            <a href="#" onClick={handleLogout} className="in-dropdown"><Icon.LogOut className='nav-icon mx-2' />ออกจากระบบ</a>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest };