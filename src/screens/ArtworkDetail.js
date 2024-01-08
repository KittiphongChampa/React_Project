import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest } from "../components/Navbar";
import * as Icon from 'react-feather';
import { Select,Dropdown, Input, Radio, Space, Tag, Modal, Form, message, Button, Flex } from 'antd';
import React, { useState, useEffect, useRef } from "react";
import ReportModal from "../modal/ReportModal";
import { MoreOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ImgFullscreen from '../components/openFullPic'
import { useNavigate, Link, useParams, useLocation  } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";

import { host } from "../utils/api";

export default function ArtworkDetail() { 
    const {TextArea} = Input;
    const token = localStorage.getItem("token");
    const [reportModalIsOpened, setReportModalIsOpened] = useState(false)
    function handleReportModal() {
        setReportModalIsOpened(preveState => !preveState)
        setIsNext(false)
        setValue(null)
        // alert(isOpened)
    }

    const all_option = [
        { value: '1', label: 'Sequentail Art' },
        { value: '2', label: 'SD scale' },
        { value: '3', label: 'Traditional Art' },
        { value: '4', label: 'doodle Art' },
        { value: '5', label: 'Semi-realistic' },
        { value: '6', label: 'Realistic' },
        { value: '7', label: 'Pixel Art' },
        { value: '8', label: 'Vector' },
        { value: '9', label: 'Anime' },
        { value: '10', label: 'Digital Art' },
        { value: '11', label: 'Furry' },
        { value: '12', label: 'Cubism Art' },
        { value: '13', label: 'Isometric Art' },
        { value: '14', label: 'Midcentury Illustration' },
        { value: '15', label: 'Minimalism' },
        { value: '16', label: 'Mosaic Art' },
        { value: '17', label: 'Pop Art' },
        { value: '19', label: 'Sketchy Style Art' },
        { value: '20', label: 'Watercolor' },
    ]

    useEffect(() => {
        if (token) { //หากมี token
            getUserdata()
            // getAdminData()
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
    const [topic ,setTopic] = useState([])
    console.log(gallery);

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

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [value, setValue] = useState();
    const [isNext, setIsNext] = useState(false);

    function handleNext() {
        setIsNext(preveState => !preveState)
    }

    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFill = () => {
        form.setFieldsValue({
            url: 'https://taobao.com/',
        });
    };

    const [openEditForm, setOpenEditForm] = useState(false)
    
    // เช็คว่าเป็น post ของตัวเองหรือไม่
    let items = [];
    if (userdata.id === gallery.id) {
        items = [
            {
                label: <div onClick={() => setOpenEditForm(true)}>แก้ไข</div>,
                key: '1',
            },
            {
                label: <div onClick={delArtwork}>ลบ</div>,
                key: '2',
            },
        ];
    } else {
        items = [
        
            {
                label: <div onClick={handleReportModal}>รายงาน</div>,
                key: '0',
            }
        ];
    }
    

    const onEdit = (values) => {
        const formData = new FormData();
        formData.append("detail", values.detail);
    }

    function delArtwork() {
        Swal.fire({
            title: "ลบงานวาดนี้หรือไม่",
            showCancelButton: true,
            confirmButtonText: "ลบ",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios .patch(`${host}/gallerry/delete/${artworkId.id}`).then((response) => {
                    const data = response.data;
                    if (data.status === 'ok') {
                        Swal.fire("ลบงานวาดนี้แล้ว", "", "success").then(() => {
                            window.location.href = "/";
                        });
                    } else {
                        Swal.fire("เกิดข้อผิดพลาดกรุณาลองใหม่", "", "error").then(() => {
                            window.location.reload(false);
                        });
                    }
                })
            }
        });
    }

    const [topicValues, setTopicValues] = useState([])

    function handleTopic(value) {
        setTopicValues(value)
    }
    const initialValues = {
        detail: gallery.artw_desc,
        // ฟิลด์อื่น ๆ ที่คุณต้องการกำหนดค่าเริ่มต้น
    };


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
                                    <Flex gap="small">
                                        <Dropdown
                                            menu={{
                                                items,
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="icon-btn" icon={<MoreOutlined />} onClick={(e) => e.preventDefault()}>
                                            </Button>
                                        </Dropdown>
                                    </Flex>
                                </div>

                                {openEditForm ? <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onEdit}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    className="ant-form"
                                    initialValues={initialValues}
                                >
                                    <Form.Item
                                        name="detail"
                                        label="คำอธิบายงานวาด"
                                        rules={[{ message: "กรุณากรอกฟิลด์นี้" }, { type: 'string', max: 100 }]}
                                    >
                                        <TextArea />
                                    </Form.Item>

                                    <Form.Item
                                        label="หัวข้อ"
                                        name="topic"
                                        rules={[
                                            {
                                                required: true,
                                                message: "กรุณาเลือกหัวข้อ",
                                            }
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="เลือกหัวข้อ"
                                            value={topicValues}
                                            id="topicSelector"
                                            onChange={handleTopic}
                                            options={all_option}
                                            allowClear
                                        >
                                        </Select>
                                    </Form.Item>

                                    <Flex gap="small" justify="flex-end">
                                        <Button shape="round" size="large" onClick={() => setOpenEditForm(false)}>ยกเลิก</Button>
                                        <Button shape="round" size="large" type="primary" htmlType="submit" >บันทึก</Button>
                                    </Flex>
                                </Form> :
                                <>
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
                                </>    
                                }                            
                            </div>
                        </div>

                    </div>
                </div>
                {/* {isOpened &&
                    <ReportModal handleModal={handleModal} />
                } */}
                <Modal title="รายงาน" open={reportModalIsOpened} onCancel={handleReportModal} footer="">
                    <Space gap="small" direction="vertical" style={{ width: "100%" }}>
                        {/* <p className="h4">รายงาน</p> */}
                        {/* <form > */}

                        {!isNext && <>

                            <Radio.Group onChange={onChange} value={value} >
                                <Space direction="vertical">
                                    <div><Radio value="spam"><p className="report-headding">สแปม</p></Radio>
                                        <p className="report-desc ms-4">ทำให้เข้าใจผิดหรือเป็นโพสท์ซ้ำ</p>
                                    </div>
                                    <div><Radio value="ละเมิด"><p className="report-headding">ละเมิดทรัพย์สินทางปัญญา</p></Radio>
                                        <p className="report-desc ms-4">มีการละเมิดลิขสิทธิ์หรือเครื่องหมายการค้า</p>
                                    </div>
                                    <div><Radio value="ss"><p className="report-headding">ภาพลามกอนาจารหรือเนื้อหาเกี่ยวกับเรื่องเพศ</p></Radio>
                                        <p className="report-desc ms-4">เนื้อหาทางเพศที่โจ่งแจ้งซึ่งเกี่ยวข้องกับผู้ใหญ่หรือภาพเปลือย ไม่ใช่ภาพเปลือย หรือการใช้ในทางที่ผิดโดยเจตนาเกี่ยวกับผู้เยาว์</p>
                                    </div>
                                    <div><Radio value="s"><p className="report-headding">
                                        กิจกรรมที่แสดงความเกลียดชัง</p></Radio>
                                        <p className="report-desc ms-4">อคติ การเหมารวม ลัทธิคนผิวขาว การใช้คำพูดส่อเสียด</p>
                                    </div>

                                    <div>
                                        <Radio value={4}>
                                            <p className="report-headding">อื่นๆ
                                                {value === 4 ? <Input style={{ width: 200, marginLeft: 10 }} /> : null}</p>
                                        </Radio>
                                    </div>


                                </Space>
                            </Radio.Group>
                            <Flex gap="small" justify="flex-end">
                                <Button shape="round" size="large" onClick={handleReportModal}>ยกเลิก</Button>
                                <Button shape="round" size="large" type="primary" onClick={handleNext} disabled={value == null}>ถัดไป</Button>
                            </Flex>

                        </>

                        }
                        {value == "ละเมิด" && isNext &&
                            <>
                                <p>รายงาน : การละเมิดทรัพย์สินทางปัญญา</p>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    className="ant-form"
                                >
                                    <Form.Item
                                        name="rp-detail"
                                        label="รายละเอียดการแจ้งรายงาน"
                                        rules={[{ required: true, message: "กรุณากรอกฟิลด์นี้" }, { type: 'string', max: 100 }]}
                                    >
                                        <TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        name="rp-link"
                                        label="ลิ้งค์ที่ลงผลงาน"
                                        rules={[{ required: true, message: "กรุณากรอกฟิลด์นี้" }, { type: 'url', max: 100 }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="rp-email"
                                        label="อีเมลติดต่อกลับ"
                                        rules={[{ required: true, message: "กรุณากรอกฟิลด์นี้" }, { type: 'email', max: 100 }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Flex gap="small" justify="flex-end">
                                        <Button shape="round" size="large" onClick={handleNext}>ย้อนกลับ</Button>
                                        <Button shape="round" size="large" type="primary" onClick={handleNext} disabled>รายงาน</Button>
                                    </Flex>

                                </Form>

                            </>}

                        {value !== "ละเมิด" && isNext &&
                            <>
                                <p>รายงาน : xxxxxx</p>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    className="ant-form"
                                >
                                    <Form.Item
                                        name="rp-detail"
                                        label="รายละเอียดการแจ้งรายงาน"
                                        rules={[{ required: true, message: "กรุณากรอกฟิลด์นี้" }, { type: 'string', max: 100 }]}
                                    >
                                        <TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        name="rp-email"
                                        label="อีเมลติดต่อกลับ"
                                        rules={[{ required: true, message: "กรุณากรอกฟิลด์นี้" }, { type: 'email', max: 100 }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item>
                                        <Space>
                                            {/* <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button> */}
                                            {/* <Button htmlType="button" onClick={onFill}>
                                                Fill
                                            </Button> */}
                                        </Space>
                                    </Form.Item>
                                </Form>

                                <Flex gap="small" justify="flex-end">
                                    <Button shape="round" size="large" onClick={handleNext}>ย้อนกลับ</Button>
                                    <Button shape="round" size="large" type="primary" onClick={handleNext} disabled>รายงาน</Button>
                                </Flex>

                            </>}
                        {/* </form> */}
                    </Space>
                </Modal>
            </div>
        </>
    )
}