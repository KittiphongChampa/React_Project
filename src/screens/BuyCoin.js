
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import "../css/indexx.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import BuyCoinItem from "../components/BuyCoinItem";
import EditDeleteCoinItem from "../components/EditDeleteCoinItem";
import { Table, Tabs, Tab } from 'react-bootstrap';
import AddEditDeleteCoinModal from './../modal/AddEditDeleteCoinModal';

const title = 'เติมเหรียญ';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }



export default function SignIn() {

    const [modal, setModal] = useState("")

    const modalChangeCoinRef = useRef(null)

    const openModal = () => {
        // const modalChangePassRefElement = modalChangeCoinRef.current;
        // const modalChangePassClass = modalChangePassRefElement.classList
        // modalChangePassClass.add("open")
        const modalComponent = <AddEditDeleteCoinModal ref={modalChangeCoinRef} setModal={setModal} value="ค่าเก่า"/>
        setModal(modalComponent)
        console.log("ทำงาน")

    }


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {modal}


            {/* <AddEditDeleteCoinModal ref={modalChangeCoinRef} /> */}


            <div className='body' style={{ backgroundImage: "url('mainmoon.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
                <Navbar />


                <div className="container">
                    <div className="buycoin-soloCard">

                        <h1 className="text-center">{title} </h1>
                        {/* <button onClick={openModal}>เปิดโมดอล</button> */}
                        <button class="gradiant-outline-btn" onClick={openModal}>
                            <div class="in-dradiant-outline-btn"><Icon.PlusCircle /> เพิ่มแพ็กเกจเติมเงิน</div>
                        </button>
                        <div className="buycoin-content">
                            {/* <BuyCoinItem src="a_coin.png" coin="300" pay="300" />
                            <BuyCoinItem src="a_coin.png" coin="400" pay="400" />
                            <BuyCoinItem src="a_coin.png" coin="400" pay="400" /> */}
                            <EditDeleteCoinItem src="a_coin.png" coin="300" pay="300" />
                            <EditDeleteCoinItem src="a_coin.png" coin="300" pay="300" />
                            <EditDeleteCoinItem src="a_coin.png" coin="300" pay="300" />
                            <EditDeleteCoinItem src="a_coin.png" coin="300" pay="300" />
                            <EditDeleteCoinItem src="a_coin.png" coin="300" pay="300" />

                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}
