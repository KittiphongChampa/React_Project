

import React, { useState, useEffect, useRef, createElement } from "react";
import * as Icon from 'react-feather';
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
// import ChatOrderDetail from '../components/ChatOrderDetail'
import Scrollbars from 'react-scrollbars-custom';
import { Pagination, Toggle, SelectPicker, TagPicker, InputNumber } from 'rsuite';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';




export default function OrderOverview() {
    const sortdate = ['สัปดาห์นี้', 'เดือนนี้', 'ปีนี้', 'ทุกปี', 'กำหนดเอง'].map(
        item => ({ label: item, value: item })
    );

    const sortby = ['วันที่ส่งคำขอจ้าง ↑', 'วันที่ส่งคำขอจ้าง ↓', 'ราคาคอมมิชชัน ↑', 'ราคาคอมมิชชัน ↓', 'ราคารวม ↑', 'ราคารวม ↓', 'ราคาแก้ไข ↑', 'ราคาแก้ไข ↓'].map(
        item => ({ label: item, value: item })
    );

    const [sortbyValue, setSortbyValue] = useState('วันที่ส่งคำขอจ้าง ↓')
    const [sortdateValue, setSortdateValue] = useState('ทุกปี')

    let layout = ['total', '-', 'pager', 'skip']


    const dataa = [
        { q: 1, od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "02:01:12 น.", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "ภาพ final" },
        { q: 2, od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "-", edit: "0/3", edit_price: "-", amount_price: "-", customer: "babi", progress: "รับรีเควสแล้ว" },
        { q: 3, od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "-", edit: "0/3", edit_price: "-", amount_price: "-", customer: "ณัฐนันท์", progress: "รับรีเควสแล้ว" },
        { q: 4, od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "-", edit: "0/3", edit_price: "-", amount_price: "-", customer: "Boobi", progress: "รับรีเควสแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Natthapat", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Nanta", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Natpimon M", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Natthapat", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Nanta", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Natpimon M", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" }, { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Natthapat", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Nanta", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Natpimon M", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "1/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "4/3", edit_price: "+100", amount_price: "600", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
        { q: "-", od_id: "OD123420011", cms: "XXXXXXX", during_time: 2, left_time: "-", price: "500", edit: "0/3", edit_price: "-", amount_price: "500", customer: "Boobi", progress: "เสร็จแล้ว" },
    ];
    const itemsPerPage = 10;

    const [activePage, setActivePage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);
    const [dataToShow, setDataToShow] = useState(dataa.slice(startIndex, endIndex))

    useEffect(() => {
        const newStartIndex = (activePage - 1) * itemsPerPage;
        const newEndIndex = newStartIndex + itemsPerPage;
        const newDataToShow = dataa.slice(newStartIndex, newEndIndex);

        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
        setDataToShow(newDataToShow);
        console.log(activePage, newStartIndex, newEndIndex)

    }, [activePage]);

    const [profileMenuSelected, setprofileMenuSelected] = useState('cms')

    function handleMenu(event, menu) {
        let oldSelected = document.querySelector('.sub-menu.selected')
        oldSelected.classList.remove('selected')
        event.target.classList.add('selected')
        setprofileMenuSelected(menu)
    }

    const [showDetail, setShowDetail] = useState('')

    function openDetail(key) {
        showDetail === key ? setShowDetail('') : setShowDetail(key)
    }

    // const handleKeyDown = (event) => {
    //     console.log('A key was pressed', event.keyCode);
    // };

    // useEffect(() => {
    //     window.addEventListener('click', handleKeyDown);
    //     // cleanup this component
    //     return () => {
    //         window.removeEventListener('click', handleKeyDown);
    //     };
    // }, []);
    document.querySelectorAll('.watermarked').forEach(function (el) {
        el.dataset.watermark = (el.dataset.watermark + ' ').repeat(300);
    });


    return (
        <>

            <Helmet>
                {/* <title>{title}</title> */}
            </Helmet>
            <div className="artist-mn-container">
                <div className="headding">
                    <h1>รายการจ้าง</h1>
                </div>
                {/* <div class="watermarked" data-watermark="howbloggerz">
                    <img src="../boo.jpg" />
                </div> */}
                {/* <div className="image-container">
                    <img src="../boo.jpg" alt="Your Image" className="image" />
                </div> */}
                <div className="artist-mn-card">
                    <Scrollbars>
                        <button className="sub-menu selected" onClick={(event) => handleMenu(event, 'cms')}>ทั้งหมด</button>
                        <button className="sub-menu" onClick={(event) => handleMenu(event, 'gallery')}>รอรับรีเควส</button>
                        <button className="sub-menu" onClick={(event) => handleMenu(event, 'review')}>กำลังดำเนินการ</button>
                        <button className="sub-menu" onClick={(event) => handleMenu(event, 'review')}>เสร็จสิ้น</button>
                        <button className="sub-menu" onClick={(event) => handleMenu(event, 'review')}>ยกเลิกแล้ว</button>
                        <div className="filter">
                            {sortdateValue === "กำหนดเอง" && <DateRangePicker appearance="default" placeholder="วันที่ส่งคำขอจ้างเริ่มต้น : วันที่ส่งคำขอจ้างสิ้นสุด" style={{ width: 250 }} />}
                            <SelectPicker data={sortdate} value={sortdateValue} onChange={setSortdateValue} searchable={false} cleanable={false} style={{ width: 120 }} defaultValue='ทุกปี' />
                            <SelectPicker data={sortby} value={sortbyValue} onChange={setSortbyValue} searchable={false} cleanable={false} defaultValue='วันที่ส่งคำขอจ้าง ↓' />
                        </div>



                        <table className="overview-order-table">
                            <tr className="table-head">
                                <th className="number">ลำดับ</th>
                                <th className="q">คิวที่</th>
                                <th>ไอดีออเดอร์</th>
                                <th>คอมมิชชัน:แพ็คเกจ</th>
                                {/* <th>ระยะเวลา(วัน)</th> */}
                                {/* <th>เวลาที่เหลือ<Icon.Info /></th> */}
                                <th>ราคาคมช.</th>
                                {/* <th>แก้ไข(ครั้ง)</th> */}
                                {/* <th>ราคาแก้ไข(บาท)</th> */}
                                {/* <th>รวม(บาท)</th> */}
                                <th>ผู้จ้าง</th>
                                <th>ความคืบหน้า</th>
                            </tr>

                            {dataToShow.map((item, index) => (
                                <>

                                    <tr className="order-data-row" key={index + 1 + startIndex} id={index + 1 + startIndex} onClick={() => openDetail(index + 1 + startIndex)}>
                                        <td>{index + 1 + startIndex}</td>
                                        <td>{item.q}</td>
                                        <td>{item.od_id}</td>
                                        <td>{item.cms}</td>
                                        <td>{item.price}</td>
                                        <td>{item.customer}</td>
                                        <td>{item.progress}</td>
                                    </tr>
                                    {showDetail === index + 1 + startIndex && <tr className="tr-detail">
                                        <td colspan="12">
                                            <div>
                                                <p>วันที่ส่งคำขอจ้างส่งคำขอจ้าง : <span>xxxxxx</span></p>
                                                <p>ระยะเวลา : <span>xxxxxx</span></p>
                                                <p>เวลาที่เหลือ : <span>{item.left_time}</span></p>
                                                <p>แก้ไข(ครั้ง) : <span>xxxxxxxxx</span></p>
                                                <p>ราคาแก้ไข : <span>xxxxxxxxx</span></p>
                                                <p>รวมราคา : <span>xxxxxxxxx</span></p>

                                            </div>
                                        </td>
                                    </tr>}
                                </>
                            ))}


                        </table>

                        <Pagination
                            layout={layout}
                            size='md'
                            prev={true}
                            next={true}
                            first={true}
                            last={true}
                            ellipsis={true}
                            boundaryLinks={true}
                            total={dataa.length}
                            limit={itemsPerPage}
                            maxButtons={5}
                            activePage={activePage}
                            onChangePage={setActivePage}
                        />


                    </Scrollbars>
                </div>

            </div>
        </>

    )
}