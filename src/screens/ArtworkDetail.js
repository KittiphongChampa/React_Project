import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest } from "../components/Navbar";
import * as Icon from 'react-feather';
import { Input, Radio, Space,  Tag } from 'antd';
// import ReportModal from "../modal/ReportModal";
import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from "react";
// import { } from 'antd';
import ImgFullscreen from '../components/openFullPic'
import { useNavigate, Link, useParams, useLocation  } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";

const host = "http://188.166.218.38:3333";
// const host = "http://localhost:3333";

export default function ArtworkDetail() { 

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) { //หากมี token
            getUserdata()
            getAdminData()
        } else {
            
        }
        getArtworkData();
    },[])
    const getUserdata = async () => {
        await axios.get(`${host}/index`,{
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            const data = response.data;
            setUserdata(data.users[0])
        })
    }
    const getAdminData = async () => {

    }

    const artworkId = useParams();
    const getArtworkData = async() => {
        await axios.get(`${host}/gallerry/detail/${artworkId.id}`)
        .then((response) => {
            const data = response.data;
            setGallery(data.artworkData.gallery);
            setTopic(data.artworkData.topic);
        })
    };
    const [userdata, setUserdata] = useState([]);
    const [gallery, setGallery] = useState([])
    console.log(gallery);
    const [topic ,setTopic] = useState([])

    // เช็คว่าเป็น post ของตัวเองหรือไม่
    if (userdata.id === gallery.id) {
        console.log("เป็น post ของตัวเอง สามารถแก้ไข ลบ ได้");
    }

    const time = gallery.created_at;
    const date = new Date(time);
    const thaiDate = `${date.getDate()}/${date.getMonth() + 1}/${
        date.getFullYear() + 543
    }`;



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
                                <img src={gallery.ex_img_path}/>
                            </div>

                            <div className="desc-col">
                                <div className="artwork-headder">
                                    <div className="artist-profile">
                                        <img src={gallery.urs_profile_img}></img>
                                    </div>
                                    <div className="artist-name">
                                        <Link to={`/profile/${gallery.id}`}>
                                        <p className="name">{gallery.urs_name}</p>
                                        </Link>
                                        <p className="time">{thaiDate}</p>
                                    </div>
                                    <div className="report-btn"><button onClick={handleModal}><Icon.Flag /></button></div>
                                </div>
                                <div className="desc">
                                    <p>{gallery.artw_desc}</p>
                                </div>
                                <div className="topic-header">
                                    <p>หัวข้อ</p>
                                </div>
                                <div className="topic-items">
                                    {topic.map(data => (
                                        <Tag key={data.tp_id}>
                                            <a href={`#${data.tp_id}`}>{data.tp_name}</a>
                                        </Tag>
                                    ))}
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