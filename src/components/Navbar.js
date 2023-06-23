import axios from "axios";
import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import { useState, useEffect, useRef } from 'react';
import * as ggIcon from '@mui/icons-material';
import { useNavigate, Link } from "react-router-dom";


const NavbarUser = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef();
    const [userdata, setUserdata] = useState([]);
    const [urs_token, setUrs_token] = useState();
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
    },[])
    const getUser = async () => {
        const token = localStorage.getItem("token");
        await axios
          .get("http://localhost:3333/index", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              setUserdata(data.users[0]);
              setUrs_token(data.urs_token);
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
                    <a href="/"><Icon.Home className='nav-icon' /></a>
                    <a href="#"><Icon.Search className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    <a href="#"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="#"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="#"><Icon.PlusSquare className='nav-icon' /></a>
                    <div className="show-coin">
                        <p>{urs_token} P</p>
                    </div>
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }} 
                            // style={{ backgroundImage: "url(mainmoon.jpg)" }}
                        >
                            <img src={userdata.urs_profile_img} style={{width: "50px", height: "45px", borderRadius:"45px"}}/>
                        </button>
                        <div className={`dropdown-area ${open ? 'open' : 'close'}`} >
                            <a href="/profile" className="in-dropdown"><Icon.User className='nav-icon mx-2' />ตั้งค่าโปรไฟล์</a>
                            {userdata.urs_type === 1 ? (
                                <>
                                    <a href="#" className="in-dropdown"><ggIcon.GridView className='nav-icon mx-2' />Dashborad</a>
                                </>
                            ) : (
                                <></>
                            )}
                            <a href="/setting-coin" className="in-dropdown"><ggIcon.CurrencyExchange className='nav-icon mx-2' />ประวัติการซื้อ/ใช้เหรียญ</a>
                            <a href="/chat" className="in-dropdown"><Icon.MessageCircle className='nav-icon mx-2' />แชทและออเดอร์</a>
                            <a href="#" className="in-dropdown"><ggIcon.Payments className='nav-icon mx-2' />ถอนเงิน</a>
                            <a href="/buycoin" className="in-dropdown"><ggIcon.MonetizationOn className='nav-icon mx-2' />เติมเหรียญ</a>
                            <a href="#" className="in-dropdown"><Icon.HelpCircle className='nav-icon mx-2' />ช่วยเหลือ</a>
                            <a href="#" onClick={handleLogout} className="in-dropdown"><Icon.LogOut className='nav-icon mx-2' />ออกจากระบบ</a>
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

    useEffect(() => {
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
    })

    return (
        <div class="nav-box" style={{ backgroundColor: "transparent", border: "none" }}>
            <nav class="nav-container" >
                <div class="inline-nav inhomepage" >
                    <a href="#"><Icon.Search className='nav-icon' /></a>
                    <a href="#"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav inhomepage">
                    <a href="#"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="#"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="#"><Icon.PlusSquare className='nav-icon' /></a>
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
    const [admintoken, setAdmintoken] = useState();

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
    },[])

    const getAdmin = async () => {
        const token = localStorage.getItem("token");
        await axios
          .get("http://localhost:3333/admin", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setAdmindata(data.admins[0]);
                setAdmintoken(data.admintoken);
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
                    <a href="#"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="#"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="#"><Icon.PlusSquare className='nav-icon' /></a>
                    <div className="show-coin">
                        <p>{admintoken} P</p>
                    </div>
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }} 
                            // style={{ backgroundImage: "url(mainmoon.jpg)" }}
                        >
                            <img src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Isolated-Pic.png" style={{width: "45px", height: "45px", borderRadius:"50px"}}/>
                        </button>
                        <div className={`dropdown-area ${open ? 'open' : 'close'}`} >
                        <a href="/buycoin" className="in-dropdown"><ggIcon.MonetizationOn className='nav-icon mx-2' />เติมเหรียญ</a>
                            <a href="/admin/transaction" className="in-dropdown"><ggIcon.CurrencyExchange className='nav-icon mx-2' />ประวัติการซื้อเหรียญ</a>
                            <a href="/editcoin" className="in-dropdown"><ggIcon.MonetizationOn className='nav-icon mx-2' />จัดการเหรียญ</a>
                            <a href="#" onClick={handleLogout} className="in-dropdown"><Icon.LogOut className='nav-icon mx-2' />ออกจากระบบ</a>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export { NavbarUser, NavbarAdmin, NavbarHomepage };