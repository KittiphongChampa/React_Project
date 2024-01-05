import React, { useState, useEffect, useRef } from "react";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../alertdata/alertData";
import { Helmet } from "react-helmet";
import "../css/manageCommission.css";
import {
    UploadOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined, RadiusBottomleftOutlined,
} from '@ant-design/icons';
import { Modal, Progress, notification, Button, Upload, Checkbox, Form, Input, Space, Flex, Tooltip, Alert, Select, message, InputNumber } from 'antd';
import 'react-quill/dist/quill.snow.css';
// import 'animate.css';


const host = "http://188.166.218.38:3333";
// const host = "http://localhost:3333";

const title = 'ManageCommission';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function ManageArtwork() {
    const navigate = useNavigate();
    const jwt_token = localStorage.getItem("token");
    const [userdata, setUserdata] = useState([]);
    let userID = userdata.id;
    const [isLoading, setLoading] = useState(false);

    //---------------------------------------------------------------------
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = localStorage.getItem("token");
        await axios
            .get(`${host}/index`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                const data = response.data;
                if (data.status === "ok") {
                    setUserdata(data.users[0]);
                } else if (data.status === "no_access") {
                    alert(data.message);
                    navigate("/admin");
                } else {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data === "Token has expired") {
                    alert("Token has expired. Please log in again.");
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    console.error("Error:", error);
                }
            });
    };

    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [cmsArtworkModalOpen, setCmsArtworkModalOpen] = useState(false);
    const handleCancelModal = () => setUploadModalOpen(false);
    const handleCmsArtworkModal = () => {
        //
        if(!cmsArtworkModalOpen){
            selectgallory();
        }
        setUploadModalOpen(false)
        setCmsArtworkModalOpen(!cmsArtworkModalOpen)
        
    }
    const [gallery, setGallery] = useState([])
    const selectgallory = async() => {
        const token = localStorage.getItem("token");
        await axios.get(`${host}/gallerry/select-cms`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setGallery(data.results)
            } else {
                console.log('เกิดข้อผิดพลาด')
            }
        })
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
    const [imageId, setImageId] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [fileList, setFileList] = useState([]);
    const handleChange = (info) => {
        setFileList(info.fileList);
        getBase64(info.file.originFileObj, (url) => {
            // setLoading(false);
            setUploadModalOpen(false)
            setImageUrl(url);
        });
    };

    function selectPic(ex_img_id, ex_img_path) {
        Swal.fire({
            imageUrl: ex_img_path,
            imageHeight: 300,
            imageAlt: "ภาพที่คุณเลือก",
            title: "เลือกภาพนี้หรือไม่?",
            showCancelButton: true,
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setImageId(ex_img_id)
                setImageUrl(ex_img_path)
                handleCmsArtworkModal()
            }
        });
    }

    const [topicValues, setTopicValues] = useState([]);
    function handleTopic(value) {
        setTopicValues(value);
    }
    const onFinish = (values) => {
        const formData = new FormData();
        if (imageId === undefined) {
            formData.append("image_file", fileList[0].originFileObj);
        }
        formData.append("ex_img_id", imageId);
        formData.append("artworkDesc", values.artworkDesc);
        formData.append("artworkTopic", topicValues);
        axios.post(`${host}/gallerry/add`, formData, {
            headers: {
                Authorization: "Bearer " + jwt_token,
                "Content-type": "multipart/form-data",
            },
        }).then((response) => {
            const data = response.data;
            console.log(data);
            if (data.status === 'ok') {
                Swal.fire({
                    title: "สำเร็จ",
                    icon: "success"
                }).then(() => {
                    window.location.reload(false);
                });
            } else {
                console.log('เกิดข้อผิดพลาดบางอย่าง');
            }
        })

        const btn = (
            <Space>
                <Button type="link" danger size="small">
                    ยกเลิกการอัปโหลด
                </Button>
            </Space>
        );

        api.info({
            message: 'กำลังตรวจสอบรูปภาพ',
            description:
                'กำลังตรวจสอบรูปภาพรอก่อนพี่ชายย ยังอัปคอมมิชชันไม่ได้เด้อ', btn,
            duration: 0,
            placement: 'bottomRight',
            // icon: <LoadingOutlined style={{ color: '#108ee9' }} />
            icon: <Progress type="circle" percent={50} size={20} />
        });
    }


    return (
        <div className="body-con">
            {contextHolder}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />

            <div class="body-nopadding" style={{ backgroundColor: "#F4F1F9" }}>
                <div className="container mt-4">
                    <div className="content-container">

                        <div className="content-body preview-cms">
                            <div className="sub-menu-group">
                                <Link to="/manage-commission" className="sub-menu ">คอมมิชชัน</Link>
                                <Link className="sub-menu selected">แกลเลอรี</Link>
                            </div>
                            <h3 className="content-header d-flex justify-content-center mt-4">เพิ่มงานวาด</h3>
                            <Form
                                form={form}
                                layout="vertical"
                                name="login"
                                onFinish={onFinish}
                                autoComplete="off"
                                initialValues={{
                                    final: 3,
                                }}
                            >
                                <Form.Item
                                    label=""
                                    name=""
                                >
                                    <div className="artwork-uploader" onClick={() => setUploadModalOpen(true)}>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            // onChange={handleChange}
                                            openFileDialogOnClick={false}
                                        >
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt="avatar"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            ) : (
                                                <div>
                                                    <PlusOutlined />
                                                    <div
                                                        style={{
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        Upload
                                                    </div>
                                                </div>
                                            )}
                                        </Upload>
                                    </div>
                                </Form.Item>

                                <Modal open={uploadModalOpen} title="." footer={null} onCancel={handleCancelModal} width={"fit-content"}>
                                    <Flex gap="small">
                                        <>
                                            <Upload
                                                onChange={handleChange}
                                                multiple={false}
                                                showUploadList={false}
                                            >
                                                <Button shape="round" size="large" icon={<UploadOutlined />}>อัปโหลดรูปภาพจากเครื่อง</Button>
                                            </Upload>
                                            <Button shape="round" size="large" onClick={handleCmsArtworkModal}>เลือกรูปภาพจากคอมมิชชัน</Button>
                                        </>
                                    </Flex>
                                </Modal>

                                <Modal open={cmsArtworkModalOpen} title="เลือกรูปภาพจากคอมมิชชัน" footer={null} onCancel={handleCmsArtworkModal} width={"fit-content"}>
                                    <div className="cms-to-artwork-modal">
                                        {gallery.map(data=>(
                                            <div key={data.ex_img_id} className="pic-wrapper" onClick={() => selectPic(data.ex_img_id, data.ex_img_path)}>
                                                <img src={data.ex_img_path} />
                                            </div>
                                        ))}

                                    </div>
                                </Modal>

                                <Form.Item label="คำอธิบายงานวาด" name='artworkDesc'
                                    rules={[
                                        {
                                            required: false,
                                            message: "กรุณาใส่รายละเอียด",
                                        },
                                    ]}>
                                    <TextArea
                                        placeholder=""
                                        showCount maxLength={200}
                                        autoSize={{
                                            minRows: 3,
                                            maxRows: 5,
                                        }} />
                                </Form.Item>

                                <Form.Item
                                    label="หัวข้อ"
                                    name="cmsTopic"

                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณาเลือกหัวข้อ",
                                        }
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        // style={{ width: '10rem' }}
                                        placeholder="เลือกหัวข้อ"
                                        value={topicValues}
                                        // value={["1", "2"]}
                                        id="topicSelector"
                                        onChange={handleTopic}
                                        // maxTagCount='responsive'
                                        options={all_option}
                                        allowClear
                                    // maxTagCount={3}
                                    >
                                    </Select>
                                </Form.Item>
                                <Flex justify="right" gap="small" >
                                    <>
                                        <Button shape="round" size="large">ยกเลิก</Button>
                                        <Button type="primary" shape="round" size="large" htmlType="submit">บันทึก</Button>
                                    </>
                                </Flex>
                            </Form>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
