
import React, { useState, useEffect, useRef } from "react";
import "../css/indexx.css";
import "../css/allbutton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";
import { Table, Tabs, Tab } from 'react-bootstrap';
import * as Icon from 'react-feather';
import * as ggIcon from '@mui/icons-material';

import { Dropdown, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { SelectPicker } from 'rsuite';



import SettingAside from '../components/SettingAside';


const title = 'ประวัติการใช้เหรียญ';

export default function Dashboard() {

    // const items = [
    //     <Dropdown.Item key={1}>New File</Dropdown.Item>,
    //     <Dropdown.Item key={2}>New File with Current Profile</Dropdown.Item>,
    //     <Dropdown.Item key={3}>Download As...</Dropdown.Item>,
    //     <Dropdown.Item key={4}>Export PDF</Dropdown.Item>,
    //     <Dropdown.Item key={5}>Export HTML</Dropdown.Item>,
    //     <Dropdown.Item key={6}>Settings</Dropdown.Item>,
    //     <Dropdown.Item key={7}>About</Dropdown.Item>
    // ];


    const data = ['เดือนทั้งหมด', 'เรียง', 'ปีทั้งหมด', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
        item => ({ label: item, value: item })
    );

    const selectStyle = { color: "pink" }
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />
            <div className="setting-container">
                <SettingAside onActive='1' />
                <div className="setting-content-box">
                    <div className="settingCard dashboard">
                        <h2 className="setting-headding">แดชบอร์ด</h2>
                        <div className="income-summary">
                            <div>
                                <p><span>2</span><span>สำเร็จแล้ว</span></p>
                                <Icon.ShoppingCart className='' />
                            </div>
                            <div>
                                <p><span>200</span><span>รายได้</span></p>
                                <Icon.DollarSign className='' />
                            </div>
                            <div>
                                <p><span>1</span><span>ยกเลิก</span></p>
                                <Icon.XSquare className='' />
                            </div>
                            <div>
                                <p><span>???</span><span>???</span></p>
                                <Icon.DollarSign className='' />
                            </div>
                        </div>
                        <div className="filter">
                            <SelectPicker data={data} searchable={false} cleanable={false} defaultValue='เดือนทั้งหมด' />
                            <SelectPicker className="ms-2" data={data} searchable={false} cleanable={false} defaultValue='ปีทั้งหมด' />
                            <SelectPicker className="ms-2" data={data} searchable={false} cleanable={false} defaultValue='เรียง' />
                            {/* <Dropdown title="เดือนทั้งหมด" placement="bottomEnd">
                                {items}
                            </Dropdown>
                            <Dropdown title="ปีทั้งหมด" placement="bottomEnd">
                                {items}
                            </Dropdown> */}

                        </div>
                        <table className="income">
                            <tr>
                                <td>
                                    <p className="price">+500 THB</p>
                                    <p>จากคอมมิชชัน xxxxxx แพ็กเกจ xxxxx</p>
                                </td>
                                <td>
                                    <p>จ้างโดย user123</p>
                                    <p>xx/xx/xxxx xx:xx น.</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="price">+500 THB</p>
                                    <p>จากคอมมิชชัน xxxxxx แพ็กเกจ xxxxx</p>
                                </td>
                                <td>
                                    <p>จ้างโดย user123</p>
                                    <p>xx/xx/xxxx xx:xx น.</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}

