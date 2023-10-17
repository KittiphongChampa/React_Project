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
import Dashboard from "./Dashboard";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ggIcon from '@mui/icons-material';
import Switch from 'react-switch';

// import ChatBoxUi from './Old_ChatBox'
import OrderOverview from '../components/OrderOverview'
import { Link, useParams, useLocation } from 'react-router-dom';


export default function ArtistManagement() {
    const { menu } = useParams();
    const location = useLocation();

    return (
        <div className="body-con">
            <Helmet>
                <title>a</title>
            </Helmet>
            {/* <ImgFullscreen />
            <div className="modall">aaaaaaaaaaaaaaaaaaaaa</div> */}

            <NavbarUser />
            <div style={{ display: "flex", height: "100%" }}>
                <div className="artist-aside-nav">
                    <Link to={`/artistmanagement/dashboard`} className="artist-nav" ><ggIcon.GridView /><p>แดชบอร์ด</p></Link>
                    <Link to={`/artistmanagement/orderoverview`} className="artist-nav"><Icon.List /><p>รายการจ้าง</p></Link>
                    <Link to={`/artistmanagement/chat`} className="artist-nav"><Icon.MessageCircle /><p>แชท</p></Link>
                    <Link to={`/artistmanagement/setting`} className="artist-nav"><Icon.Settings /><p>การตั้งค่า</p></Link>
                </div>
                {menu === "dashboard" ? <Dashboard/> : menu === "orderoverview" ? <OrderOverview /> : null}

            </div>
        </div>
    );



}