
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/alltab.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { Table, Tabs, Tab } from 'react-bootstrap';



import SettingAside from '../components/SettingAside';


const title = 'ประวัติการใช้เหรียญ';

export default function SettingCoin() {

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <div className="setting-container">
                <SettingAside onActive='1' />
                <div className="setting-content-box">
                    <div className="common-setting-page">
                        <div>
                            <h2 className="setting-headding">ประวัติการเติมเหรียญและใช้เหรียญ</h2>
                            <Tabs
                                defaultActiveKey="buycoin"
                                id="justify-tab"
                                className="mb-4 mt-4"
                                justify
                            >
                                <Tab eventKey="buycoin" title="ประวัติการเติมเหรียญ">
                                    <p className="text-align-right">ตัวกรอง</p>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>จำนวนเหรียญ</th>
                                                <th>จำนวนเงิน</th>
                                                <th>วัน/เดือน/ปี</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>300</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>400</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                            
                                        </tbody>
                                    </Table>

                                </Tab>
                                <Tab eventKey="usecoin" title="ประวัติการใช้เหรียญ">
                                    ช้ไปเท่านี้เลยจ้าๆๆๆ

                                </Tab>
                                {/* <Tab eventKey="longer-tab" title="Loooonger Tab">
                                </Tab>
                                <Tab eventKey="contact" title="Contact" disabled>
                                </Tab> */}
                            </Tabs>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
