import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";
import { useState, useEffect, useRef } from 'react';
import * as ggIcon from '@mui/icons-material';

const NavbarUser = (props) => {

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
        <div class="nav-box" >
            <nav class="nav-container">
                <div class="inline-nav">
                    <a href="/firstpage"><Icon.Home className='nav-icon' /></a>
                    <a href="/homepage"><Icon.Search className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    <a href="/"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="/login_M"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="/userprofile"><Icon.PlusSquare className='nav-icon' /></a>
                    <div className="show-coin">
                        <p>300 C</p>
                    </div>
                    <div className="dropdown-nav" ref={dropdownRef}>
                        <button onClick={() => { setOpen(!open) }} style={{ backgroundImage: "url(mainmoon.jpg)" }}>
                        </button>
                        <div className={`dropdown-area ${open ? 'open' : 'close'}`} >
                            <a href="" className="in-dropdown"><Icon.User className='nav-icon mx-2' />ตั้งค่าโปรไฟล์</a>
                            <a href="" className="in-dropdown"><ggIcon.CurrencyExchange className='nav-icon mx-2' />ประวัติการใช้เหรียญ</a>
                            <a href="" className="in-dropdown"><Icon.MessageCircle className='nav-icon mx-2' />แชทและออเดอร์</a>
                            <a href="" className="in-dropdown"><ggIcon.Payments className='nav-icon mx-2' />ถอนเงิน</a>
                            <a href="" className="in-dropdown"><ggIcon.MonetizationOn className='nav-icon mx-2' />เติมเหรียญ</a>
                            <a href="" className="in-dropdown"><Icon.HelpCircle className='nav-icon mx-2' />ช่วยเหลือ</a>
                            <a href="" className="in-dropdown"><Icon.LogOut className='nav-icon mx-2' />ออกจากระบบ</a>
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
                    <a href="/"><Icon.Search className='nav-icon' /></a>
                    <a href="/"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav inhomepage">
                    <a href="/"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="/login_M"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="/userprofile"><Icon.PlusSquare className='nav-icon' /></a>
                    {/* <div className="show-coin">
                        <p>300 C</p>
                    </div> */}
                    <a href="/userprofile">เข้าสู่ระบบ</a>

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
        <div class="nav-box" >
            <nav class="nav-container">
                <div class="inline-nav">
                    <a href="/"><Icon.Search className='nav-icon' /></a>
                    <a href="/"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    <a href="/"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="/login_M"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="/userprofile"><Icon.PlusSquare className='nav-icon' /></a>
                    <div className="show-coin">
                        <p>300 C</p>
                    </div>
                    <div className="dropdown-nav" ref={dropdownRef}>
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
                    </div>

                </div>
            </nav>
        </div>
    )
}

export { NavbarUser, NavbarAdmin, NavbarHomepage };