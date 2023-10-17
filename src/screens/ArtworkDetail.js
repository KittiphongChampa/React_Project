import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest } from "../components/Navbar";
import * as Icon from 'react-feather';
import { useState } from "react";
import { Input, Radio, Space,  Tag } from 'antd';
// import ReportModal from "../modal/ReportModal";
import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
// import { } from 'antd';
import ImgFullscreen from '../components/openFullPic'

export default function ArtworkDetail() { 


    const [isOpened, setIsOpened] = useState(false)
    function handleModal() {
        setIsOpened(preveState => !preveState)
        // alert(isOpened)
    }

    const [src, setSrc] = useState(null)

    const handleFullImg = (imgsrc) => {
        console.log("คลิกฟังชันโชว์", imgsrc)
        setSrc(imgsrc)

    }

    return (
        <>
            {src!=null  && <ImgFullscreen src={src} handleFullImg={handleFullImg} />}
            <div className="body-con">
                <NavbarUser />
                <div className="body-lesspadding" style={{ backgroundColor: "#F4F1F9" }}>
                    <div className="container">
                        <div className="unnamedcard">
                            <div className="img-col" onClick={() => handleFullImg("/f-b.png")}>
                                <img src="/f-b.png"/>
                            </div>

                            <div className="desc-col">
                                <div className="artwork-headder">
                                    <div className="artist-profile">
                                        <img src="AB1.png"></img>
                                    </div>
                                    <div className="artist-name">
                                        <p className="name">บู้บี้</p>
                                        <p className="time">30 นาทีที่แล้ว</p>
                                    </div>
                                    <div className="report-btn"><button onClick={handleModal}><Icon.Flag /></button></div>
                                </div>
                                <div className="desc">
                                    <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                                </div>
                                <div className="topic-header">
                                    <p>หัวข้อ</p>
                                </div>
                                <div className="topic-items">
                                    <Tag>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
                                    </Tag>
                                    <Tag>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
                                    </Tag>
                                    <Tag>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
                                    </Tag>
                                    <Tag>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
                                    </Tag>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* {isOpened &&
                    <ReportModal handleModal={handleModal} />
                } */}
            </div>
        </>
    )
}