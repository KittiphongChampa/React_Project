import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "react-feather";
import { useForm } from "react-hook-form";
// import "../css/indeAttImgInput.css";
// import "../css/recent_index.css";
// import '../styles/index.css';
import "../styles/main.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import {
  NavbarUser,
  NavbarAdmin,
  NavbarHomepage,
  NavbarGuest,
} from "../components/Navbar";
import ImgSlide from "../components/ImgSlide";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ggIcon from "@mui/icons-material";
import Scrollbars from "react-scrollbars-custom";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
// import { Alert, Space } from 'antd';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, Link, useParams, useLocation  } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Radio, Dropdown, Breadcrumb, Flex, Modal, Progress, notification, Button, Upload, Checkbox, Form, Input, Space, Card, Tooltip, Alert, Select, message, InputNumber } from "antd";
import { CloseOutlined, MoreOutlined, HomeOutlined, UserOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { host } from "../utils/api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const title = 'รายละเอียด cms';
const body = { backgroundColor: "#F1F1F9" }

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function CmsDetail() {
  const navigate = useNavigate();
  const cmsID = useParams();
  const [userdata, setUserdata] = useState([]);
  const [artistDetail, setArtistDetail] = useState([]);
  const [cmsDetail, setCmsDetail] = useState([]);
  const [imgDetail, setImgDetail] = useState([]);
  const [pkgDetail, setPkgDetail] = useState([]);
  const [touDetail, setTouDetail] = useState([]);

  const time = cmsDetail.created_at;
  const date = new Date(time);
  const thaiDate = `${date.getDate()}/${date.getMonth() + 1}/${
    date.getFullYear() + 543
  }`;

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   if (window.location.pathname === "/login") {
    //     navigate("/");
    //   }
    // } else {
    //   navigate("/login");
    // }
    // getUser();
    getDetailCommission(); //ใช้ได้ไม่มีปัญหา
  }, []);
  const token = localStorage.getItem("token");

//   const getUser = async () => {
//     await axios
//       .get(`${host}/index`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then((response) => {
//         const data = response.data;
//         if (data.status === "ok") {
//           setUserdata(data.users[0]);
//           // } else if (data.status === "no_access") {
//           //   alert(data.message);
//           //   navigate("/admin");
//         } else if (data.status === "ok_butnotuser") {
//           console.log("ไม่มี token หรือเป็น admin");
//         } else {
//         //   localStorage.removeItem("token");
//         //   navigate("/login");
//         }
//       })
//       .catch((error) => {
//         if (
//           error.response &&
//           error.response.status === 401 &&
//           error.response.data === "Token has expired"
//         ) {
//           // Handle token expired error
//           alert("Token has expired. Please log in again.");
//         //   localStorage.removeItem("token");
//         //   navigate("/login");
//         } else {
//           // Handle other errors here
//           console.error("Error:", error);
//         }
//       });
//   };

  const [activeMenu, setActiveMenu] = useState({
    package: true,
    review: false,
    queue: false,
  });

  function handleMenu(event, menu) {
    const oldMenu = document.querySelector(".sub-menu.selected");
    oldMenu.classList.remove("selected");
    event.target.classList.add("selected");
    // setActiveMenu((prevState) => ({
    //     ...prevState, package: !prevState.package, review: !prevState.review, queue: !prevState.queue
    // }));
    setActiveMenu({ package: false, review: false, queue: false });
    setActiveMenu({ [menu]: true });
    // setActiveMenu(...prevState, package: !prevState.package )
  }

  const getDetailCommission = async () => {
    await axios
      .get(`${host}/detailCommission/${cmsID.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setArtistDetail(data.artist);
        setCmsDetail(data.commission);
        setImgDetail(data.images);
        setPkgDetail(data.packages);
        setTouDetail(data.typeofuse);
      });
  };

  // สร้างฟังก์ชันเพื่อหาค่า pkg_min_price ที่น้อยที่สุด //หยุน
  function findMinPrice() {
    if (pkgDetail.length === 0) {
      return null; // หาก pkgDetail ว่างเปล่า จะไม่มีค่าที่น้อยที่สุด
    }
    // ใช้ map เพื่อดึงค่า pkg_min_price ออกมาและเก็บไว้ในอาร์เรย์
    const minPrices = pkgDetail.map((pkg) => pkg.pkg_min_price);
    // ใช้ Math.min เพื่อหาค่าที่น้อยที่สุดจากอาร์เรย์ minPrices
    const minPrice = Math.min(...minPrices);
    return minPrice;
  }
  const minPrice = findMinPrice();

//   const goodAtItems = cmsDetail.cms_good_at
//     ? cmsDetail.cms_good_at.split(/[\s,|-]+/).map((item) => item.trim())
//     : [];
//   const badAtItems = cmsDetail.cms_bad_at
//     ? cmsDetail.cms_bad_at.split(/[\s,|-]+/).map((item) => item.trim())
//     : [];
//   const no_talkingAtItems = cmsDetail.cms_no_talking
//     ? cmsDetail.cms_no_talking.split(/[\s,|-]+/).map((item) => item.trim())
//     : [];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adminParam = queryParams.get("admin");

  const [touValue, setTouValue] = useState(1);
  const onChangeTou = (e) => {
    console.log("radio checked", e.target.value);
    setTouValue(e.target.value);
  };

  const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
  //-------------

  const [isModalOpened, setIsModalOpened] = useState(false);

  function openModal() {
    setIsModalOpened(true);
  }

  function closeModal() {
    setIsModalOpened(false);
  }

  const { TextArea } = Input;

  const [pkgID, setPkgID] = useState();

  const [attImgComponents, setAttImgComponents] = useState([]);
  function addNewAttImg(props) {
    setAttImgComponents([...attImgComponents, { text: "", pic: "" }]);
    console.log(attImgComponents);
  }

  function removeAttImg(componentKey) {
    const update = attImgComponents.filter((_, i) => i !== componentKey);
    setAttImgComponents(update);
  }

  const handleChangeText = (index, newText) => {
    const updatedComponents = attImgComponents.map((component, i) => {
      if (index === i) {
        return { ...component, text: newText };
      }
      return component;
    });
    setAttImgComponents(updatedComponents);
  };

  const SendRequest = (values) => {
    const jwt_token = localStorage.getItem("token");
    const selectedRadio = document.querySelector(
      'input[name="type-of-use"]:checked'
    );
    const selectedValue = selectedRadio ? selectedRadio.value : "";
    const formData = new FormData();
    formData.append("cmsID", cmsID.id);
    // formData.append("userID", userdata.id);
    formData.append("artistId", artistDetail.artistId);
    formData.append("pkgId", pkgID);
    formData.append("selectedValue", touValue);
    formData.append("od_use_for", values.purpose);
    formData.append("od_detail", values.detail);
    // fileList.forEach((file) => {
    //     formData.append("image_file", file.originFileObj);
    // });

    axios
      .post(`${host}/order/add`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        let od_id = data.orderId;
        if (data.status === "ok") {
            const formData = new FormData();
            // formData.append("from", userdata.id,);
            formData.append("to", artistDetail.artistId);
            formData.append("od_id", od_id);
            // ส่งค่าเพื่อเป็น chat ให้นักวาด
            axios .post(`${host}/messages/addmsg-order`, formData, {
              headers: {
                "Content-type": "multipart/form-data",
                Authorization: "Bearer " + jwt_token,
              },
            })

        //     axios.post("http://localhost:3333/messages/addmsg", {
        //   from: userdata.id,
        //   to: artistDetail.artistId,
        //   message: "ส่งคำขอจ้าง",
        //   step_id: step_id,
        //   od_id: chat_order_id,
        //   status: "a",
        //   checked: 1,
        // })
              
            .then((response) => {
                const data = response.data;
                if (data.status === 'ok') {
                    Swal.fire({
                        icon: "success",
                        title: "ส่งคำขอจ้างสำเร็จ",
                        confirmButtonText: 'ตกลง',
                    }).then(() => {
                        window.location.href = `/chatbox?id=${artistDetail.artistId}&od_id=${od_id}`;
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด กรุณาลองใหม่",
                    });
                }
            })
        } else if (data.status === "order_full") {
          Swal.fire({
            icon: "error",
            title: "คอมมิชชันรับออเดอร์เต็มแล้ว",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด กรุณาลองใหม่",
          });
        }
      });
  };

  function handlePkgId(id) {
    setPkgID(id);
  }

  const [openEditForm, setOpenEditForm] = useState(false)

    const items = [
        {
            label: <div onClick={handleReportModal}>รายงาน</div>,
            key: '0',
        },
        {
            label: <div onClick={() => setOpenEditForm(true)}>แก้ไข</div>,
            key: '1',
        },
        {
            label: <div onClick={delCms}>ลบ</div>,
            key: '2',
        },
    ];
    const [reportModalIsOpened, setReportModalIsOpened] = useState(false)
    function handleReportModal() {
      setReportModalIsOpened(preveState => !preveState)
      setIsNext(false)
      setValue(null)

      
        // alert(isOpened)
  }
  
    const [value, setValue] = useState();
    const [isNext, setIsNext] = useState(false);

    function handleNext() {
        setIsNext(preveState => !preveState)
    }

  function delCms() {
        Swal.fire({
            title: "ลบงคอมมิชชันนี้หรือไม่",
            showCancelButton: true,
            confirmButtonText: "ลบ",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("ลบคอมมิชชันนี้แล้ว", "", "success");
            }
        });
  }
  
  const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
  };
  const [editorValue, setEditorValue] = useState('')

   const all_option = [
        // "เลือกทั้งหมด",
        // "Sequentail Art",
        // "SD scale",
        // "Traditional Art",
        // "doodle Art",
        // "Semi-realistic",
        // "Realistic",
        // "Pixel Art",
        // "Vector",
        // "Western Art ",
        // "Anime",
        // "Digital Art",
        // "Furry",
        // "Cubism Art",
        // "Isometric Art",
        // "Midcentury Illustration",
        // "Minimalism",
        // "Mosaic Art",
        // "Pop Art",
        // "Sketchy Style Art",
        // "Watercolor"
        // { value: '0', label: 'เลือกทั้งหมด' },
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
    const [topicValues, setTopicValues] = useState([])

    function handleTopic(value) {
        setTopicValues(value)
  }

  const [api, contextHolder] = notification.useNotification();
  
  const onUpdate = (values) => {
        values.pkgs.map((item) => {
            // console.log(item);

            // ลูบออบเจ็คในแพ็กเกจเอาค่าออกมา
            for (const value of Object.values(item)) {
                console.log(value);

            }
            for (const value of Object.values(item.step)) {
                console.log(value); //array ของ stat จะไม่ปริ้นเพราะเป็น array

            }

        });

        const btn = (
            <Space>
                {/* <Button type="link" size="small" onClick={() => api.destroy()}>
                    Destroy All
                </Button> */}
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
    const [form] = Form.useForm();

  return (
    <div className="body-con">
      {/* {formModalOpened ? <FormModal pkgId={packageId}/> : null} */}
      <Modal
        title="ส่งคำขอจ้าง 'แพ็กเกจ: ' "
        open={isModalOpened}
        onCancel={closeModal}
        footer=""
      >
        <Form layout="vertical" onFinish={SendRequest}>
          <Form.Item label="ประเภทการใช้งาน">
            <Radio.Group onChange={onChangeTou} value={touValue}>
              {touDetail.map((item) => (
                <Radio key={item.tou_id} value={item.tou_name}>
                  {item.tou_name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="จุดประสงค์การใช้ภาพ"
            name="purpose"
            rules={[{ required: true, message: "กรุณาใส่จุดประสงค์การใช้งาน" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="รายละเอียด"
            name="detail"
            rules={[{ required: true, message: "กรุณาใส่รายละเอียด" }]}
          >
            <TextArea
              placeholder="อธิบายรายละเอียดที่ต้องการ เช่น ผู้หญิงใส่เสื้อสีดาวผมยาวยืนอยู่ข้างกำแพงสีฟ้าเอียงมุมกล้องเล็กน้อย"
              showCount
              maxLength={200}
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          <Button htmlType="submit" type="primary" shape="round" size="large">
            ส่งคำขอจ้าง
          </Button>
          {/* </Flex> */}
        </Form>
      </Modal>

      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* <NavbarUser /> */}
      {adminParam === null ? <NavbarUser /> : <NavbarAdmin />}

      <div className="background-blur" style={body}></div>

        <div class="body-lesspadding">
          <div className="container">
            <div className="content-card">
{
                !openEditForm ?
                  <>
                    <div className="cms-overview">
                    <h1 className="h3 me-3">คอมมิชชัน Full Scale<span class="cms-status-detail">เปิด</span></h1>
                    <Flex gap="small" justify="flex-end" flex={1}>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button className="icon-btn" type="text" icon={<MoreOutlined />} onClick={(e) => e.preventDefault()}>
                                                </Button>
                                            </Dropdown>
                                        </Flex>
              </div>
              <div className="cms-artist-box">
                <Link to={`/profile/${artistDetail.artistId}`}>
                  <div id="cms-artist-profile">
                        <img src={artistDetail.artistProfile} alt="" />
                        
                        <div>
                                                    <p>{artistDetail.artistName}</p>
                                                    <p>4.0<ggIcon.Star className='fill-icon' /><span className="q">(3) | ว่าง 3 คิว</span></p>
                                                </div>
        
                  </div>
                </Link>
                <p id="cms-price">โพสต์เมื่อ {thaiDate}</p>
                {/* <p id="cms-price" className="h4">
                  เริ่มต้น {minPrice} บาท
                </p> */}
              </div>
              {/* <p style={{ textAlign: "right", fontSize: "0.7rem" }}>
                {thaiDate}
              </p> */}
              <ImgSlide imgDetail={imgDetail} />

              <p className="text-align-center mt-3 mb-3">
                {cmsDetail.cms_desc}
              </p>
              <div className="skill">
                <div className="good-at">
                  <ul>
                    <p>ถนัด</p>
                    <p style={{ fontWeight: "300" }}>{cmsDetail.cms_good_at}</p>
                    {/* {goodAtItems.map((item, index) => (
                      <li key={index}>
                        <span>{item}</span>
                      </li>
                    ))} */}
                  </ul>
                </div>
                <div className="bad-at">
                  <ul>
                    <p>ไม่ถนัด</p>
                    <p style={{ fontWeight: "300" }}>{cmsDetail.cms_bad_at}</p>
                    {/* {badAtItems.map((item, index) => (
                      <li key={index}>
                        <span>{item}</span>
                      </li>
                    ))} */}
                  </ul>
                </div>

                <div className="not-accept">
                  <ul>
                    <p>ไม่รับ</p>
                    <p style={{ fontWeight: "300" }}>
                      {cmsDetail.cms_no_talking}
                    </p>
                    {/* {no_talkingAtItems.map((item, index) => (
                      <li key={index}>
                        <span>{item}</span>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>
              <div className="group-submenu">
                <button
                  className="sub-menu selected"
                  onClick={
                    !activeMenu.package
                      ? (event) => handleMenu(event, "package")
                      : null
                  }
                >
                  แพ็กเกจ
                </button>
                <button
                  className="sub-menu"
                  onClick={
                    !activeMenu.review
                      ? (event) => handleMenu(event, "review")
                      : null
                  }
                >
                  รีวิว
                </button>
                <button
                  className="sub-menu"
                  onClick={
                    !activeMenu.queue
                      ? (event) => handleMenu(event, "queue")
                      : null
                  }
                >
                  คิว
                </button>
              </div>

              {/* <Queue /> */}

              {activeMenu.package && (
                <Package
                  pkgDetail={pkgDetail}
                  onClick={openModal}
                  setPkgID={handlePkgId}
                />
              )}
              {activeMenu.review && <Review />}
              {activeMenu.queue && <Queue cmsID={cmsID.id} />}
                  </>
                  :
                  <>
                                    <ImgSlide imgDetail={imgDetail} />
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        name="login"
                                        onFinish={onUpdate}
                                        // onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        initialValues={{
                                            final: 3,
                                            // final: 3.5,
                                        }}

                                    >
                                        {/*  */}

                                        <Form.Item
                                            label="ชื่อคอมมิชชัน"
                                            name="cmsName"
                                            id="cmsName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาใส่ชื่อคอมมิชชัน",
                                                },
                                                { type: "text" },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="cmsTou" label={<>
                                            ประเภทการใช้งานที่รับ
                                            <Tooltip title="1.Personal use : ใช้ส่วนตัว ไม่สามารถใช้เชิงพาณิชย์ได้ 2.License : สามารถนำไปทำบางอย่างได้ เช่น ใช้ในเชิงพาณิชย์ ทั้งนี้ทั้งนั้นขึ้นอยู่กับข้อตกลงว่าสามารถทำอะไรได้บ้าง 3.Exclusive right : สามารถนำผลงานไปทำอะไรก็ได้ ลิขสิทธิ์อยู่ที่ผู้ซื้อ แต่นักวาดยังมีเครดิตในผลงานอยู่" color="#2db7f5">
                                                <Icon.Info />
                                            </Tooltip>
                                        </>}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกประเภทงานที่รับ",
                                                }
                                            ]}>
                                            <Checkbox.Group>

                                                <Checkbox value="1" style={{ lineHeight: '32px' }}>
                                                    Personal use (ใช้ส่วนตัว)

                                                </Checkbox>
                                                <Checkbox value="2" style={{ lineHeight: '32px' }}>
                                                    License (มีสิทธ์บางส่วน)
                                                </Checkbox>
                                                <Checkbox value="3" style={{ lineHeight: '32px' }}>
                                                    Exclusive right (ซื้อขาด)
                                                </Checkbox>


                                            </Checkbox.Group>
                                        </Form.Item>
                                        <Form.Item
                                            label="รายละเอียดคอมมิชชัน"
                                            name="cmsDesc"
                                            id="cmsDesc"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณากรอกรายละเอียดคอมมิชชัน",
                                                },
                                                { type: "text" },
                                            ]}
                                        >
                                            <ReactQuill
                                                theme="snow"
                                                value={editorValue}
                                                onChange={setEditorValue}
                                                placeholder="เขียนรายละเอียดคอมมิชชัน.."
                                            />

                                        </Form.Item>
                                        <Space
                                            style={{
                                                display: 'flex',
                                                flexDirection: "row",
                                                flexWrap: "wrap"
                                                // backgroundColor: 'pink'
                                            }}>

                                            <Form.Item
                                                label="จำนวนคิว"
                                                name={'cmsQ'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "กรุณาใส่จำนวนคิว",
                                                    },
                                                    { type: "number" }
                                                ]}
                                            >

                                                <InputNumber suffix="คิว" className="inputnumber-css" />
                                            </Form.Item>

                                        </Space>

                                        <Form.Item label="งานที่ถนัด" name='cmsGood'
                                            rules={[
                                                {
                                                    required: true,
                                                    // whitespace: true,
                                                    message: "กรุณาใส่งานที่ถนัด",
                                                },
                                            ]}>
                                            <TextArea
                                                placeholder="เช่น ผู้หญิง ผู้ชาย เฟอร์นิเจอร์บางชิ้น"
                                                showCount maxLength={200}
                                                autoSize={{
                                                    minRows: 3,
                                                    maxRows: 5,
                                                }} />
                                        </Form.Item>
                                        <Form.Item label="งานที่ไม่ถนัด" name='cmsBad'
                                            rules={[
                                                {
                                                    required: true,
                                                    // whitespace: true,
                                                    message: "กรุณาใส่งานที่ไม่ถนัด",
                                                },
                                            ]}>
                                            <TextArea
                                                placeholder="เช่น ผู้หญิง ผู้ชาย เฟอร์นิเจอร์บางชิ้น"
                                                showCount maxLength={200}
                                                autoSize={{
                                                    minRows: 3,
                                                    maxRows: 5,
                                                }} />
                                        </Form.Item>
                                        <Form.Item label="งานไม่รับ" name='cmsNo'
                                            rules={[
                                                {
                                                    required: true,
                                                    // whitespace: true,
                                                    message: "กรุณาใส่งานที่ไม่รับ'",
                                                },
                                            ]}>
                                            <TextArea
                                                placeholder="เช่น ผู้หญิง ผู้ชาย เฟอร์นิเจอร์บางชิ้น"
                                                showCount maxLength={200}
                                                autoSize={{
                                                    minRows: 3,
                                                    maxRows: 5,
                                                }} />
                                        </Form.Item>

                                        {/* <Button onClick={() => console.log(editorValue)}>เทส</Button> */}
                                        <Form.Item
                                            name=""
                                            label="แพ็กเกจ"
                                        >
                                            <Form.List name="pkgs" >
                                                {(fields, { add, remove }, { errors }) => (

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            rowGap: 16,
                                                            flexDirection: 'column',
                                                        }}
                                                    >
                                                        {console.log(fields)}
                                                        {fields.map((field) => (
                                                            <Card
                                                                size="small"
                                                                title={`แพ็กเกจ ${field.name + 1}`}
                                                                key={field.key}
                                                                extra={
                                                                    field.name !== 0 && <CloseOutlined
                                                                        onClick={() => {
                                                                            remove(field.name);
                                                                        }}
                                                                    />
                                                                }
                                                            >
                                                                {console.log(field)}
                                                                <Form.Item label="ชื่อแพ็กเกจ" name={[field.name, 'pkgName']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "กรุณาใส่ชื่อแพ็กเกจ",
                                                                        },
                                                                    ]}>
                                                                    <Input />
                                                                </Form.Item>
                                                                <Form.Item label="คำอธิบาย" name={[field.name, 'pkgDesc']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "กรุณาใส่คำอธิบาย",
                                                                        },
                                                                    ]}>
                                                                    <TextArea showCount maxLength={200}
                                                                        autoSize={{
                                                                            minRows: 3,
                                                                            maxRows: 5,
                                                                        }} />
                                                                </Form.Item>

                                                                <Space
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: "row",
                                                                        flexWrap: "wrap"
                                                                        // backgroundColor: 'pink'
                                                                    }}>
                                                                    <Form.Item
                                                                        label="จำนวนวัน"
                                                                        name={[field.name, 'pkgDuration']}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: "กรุณาใส่คำอธิบาย",
                                                                            },
                                                                            { type: "number" }
                                                                        ]}
                                                                    >
                                                                        <InputNumber suffix="วัน" className="inputnumber-css" />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label="จำนวนแก้ไข"
                                                                        name={[field.name, 'pkgEdit']}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: "กรุณาใส่คำอธิบาย",
                                                                            },
                                                                            { type: "number" }
                                                                        ]}
                                                                    >

                                                                        <InputNumber suffix="ครั้ง" className="inputnumber-css" />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label="ราคาเริ่มต้น"
                                                                        name={[field.name, 'pkgPrice']}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: "กรุณาใส่คำอธิบาย",
                                                                            },
                                                                            { type: "number" }
                                                                        ]}

                                                                    >
                                                                        <InputNumber suffix="บาท" className="inputnumber-css" />
                                                                    </Form.Item>
                                                                </Space>

                                                                <Form.Item label={<>
                                                                    ขั้นตอนการทำงาน
                                                                    <Tooltip title="ขั้นตอนการทำงานคือภาพทั้งหมดที่จะส่งให้ลูกค้าดู การจ่ายเงินครั้งแรกคือหลังจากที่นักวาดส่งภาพไปแล้ว จ่ายเงินครึ่งหลังจะได้จ่ายเมื่องานดำเนินไปถึง 50% แล้ว" color="#2db7f5">
                                                                        <Icon.Info />
                                                                    </Tooltip>
                                                                </>}
                                                                    name=""
                                                                >
                                                                    <Form.List
                                                                        name={[field.name, 'step']}
                                                                        rules={[
                                                                            {
                                                                                validator: async (_, step) => {
                                                                                    if (!step || step.length === 0) {
                                                                                        console.log("ยังไม่เพิ่มการทำงาน")
                                                                                        return Promise.reject(new Error('เพิ่มการทำงานอย่างน้อย 1 ขั้นตอน'));

                                                                                    }
                                                                                },
                                                                            },
                                                                        ]}
                                                                    >
                                                                        {(subFields, subOpt, { errors }) => (
                                                                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                                                                <Space
                                                                                    style={{
                                                                                        display: 'flex'
                                                                                    }}
                                                                                    align="baseline"
                                                                                >
                                                                                    <div style={{ width: "1rem", textAlign: "right" }}>1: </div>
                                                                                    <Form.Item
                                                                                        name="draft"
                                                                                        validateTrigger={['onChange', 'onBlur']}>
                                                                                        <Input placeholder="ตัวอย่าง ภาพลงสี" defaultValue="ภาพร่าง" readOnly />
                                                                                    </Form.Item>
                                                                                </Space>


                                                                                {subFields.map((subField) => (
                                                                                    <>
                                                                                        <Space
                                                                                            key={subField.key}
                                                                                            style={{
                                                                                                display: 'flex'

                                                                                            }}
                                                                                            align="baseline"
                                                                                        >
                                                                                            <div style={{ width: "1rem", textAlign: "right" }}>{subField.name + 2}: </div>
                                                                                            <Form.Item
                                                                                                name={subField.name}
                                                                                                validateTrigger={['onChange', 'onBlur']}
                                                                                                rules={[
                                                                                                    {
                                                                                                        required: true,
                                                                                                        whitespace: true,
                                                                                                        message: "กรุณาใส่ขั้นตอนการทำงาน",
                                                                                                    },
                                                                                                ]}>
                                                                                                <Input prefix="ภาพ" placeholder="ตัวอย่าง ภาพลงสี" />
                                                                                            </Form.Item>


                                                                                            <MinusCircleOutlined onClick={() => subOpt.remove(subField.name)} />


                                                                                        </Space>

                                                                                    </>
                                                                                ))}

                                                                                <Form.Item
                                                                                    style={{

                                                                                        marginLeft: '1.5rem',
                                                                                    }}>


                                                                                    <Button
                                                                                        type="dashed"
                                                                                        style={{
                                                                                            width: 'fit-content',
                                                                                            // marginLeft: '1.5rem',
                                                                                        }}

                                                                                        onClick={() => subOpt.add()} block>
                                                                                        + เพิ่มขั้นตอนการทำงาน
                                                                                    </Button>


                                                                                </Form.Item>

                                                                                <Space
                                                                                    style={{
                                                                                        display: 'flex'
                                                                                    }}
                                                                                    align="baseline"
                                                                                >
                                                                                    <div style={{ width: "1rem", textAlign: "right" }}>{subFields.length + 2}: </div>
                                                                                    <Form.Item
                                                                                        name="final"
                                                                                    >
                                                                                        <Input placeholder="ตัวอย่าง ภาพลงสี" defaultValue="ภาพไฟนัล" readOnly />
                                                                                    </Form.Item>
                                                                                </Space>
                                                                                <Form.ErrorList errors={errors} style={{
                                                                                    // width: 'fit-content',
                                                                                    marginLeft: '1.5rem',
                                                                                }} />
                                                                                {/* {subFields.length === 0 && subOpt.add()} */}
                                                                            </div>

                                                                        )}



                                                                    </Form.List>
                                                                </Form.Item>
                                                                {/* </Form.Item> */}
                                                            </Card>
                                                        ))}
                                                        <Button type="dashed" onClick={() => add()} block>
                                                            + เพิ่มแพ็กเกจ
                                                        </Button>
                                                        {/* {fields.length == 0 && add()} */}
                                                    </div>
                                                )}
                                            </Form.List>
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
                                                disabled={true}
                                                placeholder="เลือกหัวข้อ"
                                                value={topicValues}
                                                // value={["1", "2"]}
                                                id="topicSelector"
                                                onChange={handleTopic}
                                                options={all_option}
                                                allowClear
                                            // maxTagCount={3}
                                            >
                                            </Select>
                                        </Form.Item>
                                        <Button onClick={() => setOpenEditForm(false)}>ยกเลิก</Button>
                                        <Button htmlType="submit">บันทึก</Button>
                                    </Form>
                                </>
}
            </div>
          </div>
      </div>
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
                                    <Input.TextArea />
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
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className="ant-form"
                            >
                                <Form.Item
                                    name="rp-detail"
                                    label="รายละเอียดการแจ้งรายงาน"
                                    rules={[{ required: true, message: "กรุณากรอกฟิลด์นี้" }, { type: 'string', max: 100 }]}
                                >
                                    <Input.TextArea />
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
            <Modal title="ส่งคำขอจ้าง 'ชื่อแพ็กเกจ' " open={isModalOpened} onCancel={closeModal} footer="">
                <Form
                    layout="vertical">

                    <Form.Item
                        label="ประเภทการใช้งาน">
                        <Input />
                    </Form.Item>
                    <Form.Item label="จุดประสงค์การใช้ภาพ">
                        <Input />
                    </Form.Item >
                    <Form.Item label="รายละเอียด">
                        <TextArea
                            placeholder="อธิบายรายละเอียดที่ต้องการ เช่น "
                            showCount maxLength={200}
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }} />
                    </Form.Item>
                    <Flex gap="middle" justify="flex-end">
                        <Button htmlType="submit" type="primary" shape="round" size="large">ส่งคำขอจ้าง</Button>
                    </Flex>
                </Form>
                <div className="form-item">
                    <label>แนบภาพประกอบ</label>

                    {attImgComponents.map((component, index) => (

                        <div key={index} className="att-img-item mt-2 mb-2">
                            <div className="number"></div>
                            <div className="small-show-att-img" style={{ backgroundImage: "url(เหมียวเวห์.jpg)" }}></div>
                            <div className="desc-box">
                                <label style={{ fontWeight: "400" }}>คำอธิบายเพิ่มเติม</label>
                                <input placeholder="เช่น ส่วนที่อยากให้ปรับนอกเหนือจากรูปที่แนบมา " className="txtarea-input" type="text" value={component.text}
                                    onChange={(e) => handleChangeText(index, e.target.value)} />
                            </div>
                            <button className="remove-img-item" onClick={() => removeAttImg(index)}><Icon.X /></button>
                        </div>
                    ))}
                </div>

                <button className="addNewAttImgBtn" onClick={addNewAttImg}><Icon.Plus />เพิ่มภาพประกอบ</button>
                {/* <button className="orderSubmitBtn">ส่งคำขอขอจ้าง</button> */}
            </Modal>
    </div>
  );
}

function Package(props) {
  const { pkgDetail } = props;

  const handlePackageClick = (pkgId, pkg_name) => {
    console.log(`Clicked on package with id: ${pkgId}`);
    props.setPkgID(pkgId);
    props.onClick(); //เปิดโมดอล
  };

  return (
    <>
      <h2>เลือกแพ็กเกจ</h2>
      <p className="text-align-right">
        ราคาสำหรับ personal use หากใช้ในเชิงอื่นอาจกำหนดราคาขึ้นมากกว่านี้
      </p>
      {Array.isArray(pkgDetail) ? (
        pkgDetail.map((pkg) => (
          <div
            className="select-package-item"
            onClick={() => handlePackageClick(pkg.pkg_id)}
            key={pkg.pkg_id}
          >
            <div>
              <h3>{pkg.pkg_name}</h3>
              <p>{pkg.pkg_min_price}+ THB</p>
              <p>{pkgDetail.pkg_desc}</p>
            </div>
            <div>
              <p>ระยะเวลาทำงาน {pkg.pkg_duration} วัน</p>
              <p>ประเภทงานที่อนุญาต ทุกประเภท</p>
              <p>จำนวนครั้งแก้ไขงาน {pkg.pkg_edits} ครั้ง</p>
            </div>
          </div>
        ))
      ) : (
        <div
          className="select-package-item"
          onClick={() => handlePackageClick(pkgDetail.pkg_id, pkgDetail.pkg_name)}
        >
          <div>
            <h3>{pkgDetail.pkg_name}</h3>
            <p>{pkgDetail.pkg_min_price}+ THB</p>
            <p>{pkgDetail.pkg_desc}</p>
          </div>
          <div>
            <p>ระยะเวลาทำงาน {pkgDetail.pkg_duration} วัน</p>
            <p>ประเภทงานที่อนุญาต ทุกประเภท</p>
            <p>จำนวนครั้งแก้ไขงาน {pkgDetail.pkg_edits} ครั้ง</p>
          </div>
        </div>
      )}
    </>
  );
}

function Review() {
  return (
    <>
      <h2>รีวิว (4.0 จาก 3 รีวิว)</h2>
      <div className="review-box">
        <div className="reviewer-box">
          <div>
            <img src="https://i.kym-cdn.com/entries/icons/original/000/043/403/cover3.jpg" />
          </div>
          <div>
            <p>K.Kav</p>
            <p>เมื่อวานนี้ 10:10 น.</p>
          </div>
        </div>
        <p style={{ fontWeight: "500" }}>แพ็กเกจ : Half Body</p>
        <p>
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
        </p>
        <p>เขียนรีวิว</p>
        {/* <div className="img-box"><img src="kaveh.png" /></div> */}
      </div>
      <div className="review-box">
        <div className="reviewer-box">
          <div>
            <img src="https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/smudge-the-viral-cat.jpg" />
          </div>
          <div>
            <p>Arora</p>
            <p>20/08/2566 19:56 น.</p>
          </div>
        </div>
        <p style={{ fontWeight: "500" }}>แพ็กเกจ : Half Body</p>
        <p>
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
        </p>
        <p>เขียนรีวิว</p>
        {/* <div className="img-box" ><img src="kaveh.png" /></div> */}
      </div>
      <div className="review-box">
        <div className="reviewer-box">
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmaQdvWJzdLZ2M0QpDmDxHXY5K_5Uz2ZSNg&usqp=CAU" />
          </div>
          <div>
            <p>Sarah Baba</p>
            <p>17/08/2566 19:56 น.</p>
          </div>
        </div>
        <p style={{ fontWeight: "500" }}>แพ็กเกจ : Half Body</p>
        <p>
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
          <ggIcon.Star className="fill-icon" />
        </p>
        <p>เขียนรีวิว</p>
        {/* <div className="img-box"><img src="kaveh.png" /></div> */}
      </div>
    </>
  );
}

function Queue(props) {
  const cmsID = props.cmsID;
  const [queue, setQueue] = useState("");
  const [orderAll, setOrderAll] = useState("");
  const [allqueue, setAllQueue] = useState([]);
  console.log("queue", queue);
  console.log("orderAll", orderAll);
  console.log(allqueue);
  useEffect(() => {
    fetchData()
  },[])
  const fetchData = async() => {
    await axios.get(`${host}/getQueueData/${cmsID}`).then((response) => {
      const data = response.data;
      setAllQueue(data.uniqueResults)
    })
  }

  axios
    .get(`${host}/queue/${cmsID}`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      const data = response.data;
      setQueue(data.Queue);
      setOrderAll(data.latestOdQNumber);
  });

  return (
    <>
      <h2>
        คิว ({orderAll}/{queue})
      </h2>
      {/* <Alert message="ในตารางคิวนี้รวมคิวของคอมมิชชันอื่นของคุณBoobi ด้วย" closable type="info" showIcon className="mt-3 mb-5 " /> */}
      <table className="queue-table">
        <tr>
          <th className="q">คิว</th>
          <th>คอมมิชชัน:แพคเกจ</th>
          <th>ระยะเวลา(วัน)</th>
          <th>ความคืบหน้า</th>
        </tr>

        {allqueue.map(data => (
          <tr key={data.od_id}> 
            <td>{data.od_id}</td>
            <td>{data.cms_name} : {data.pkg_name}</td>
            <td>3</td>
            <td>ยังไม่เริ่ม</td>
          </tr>
        ))}
      </table>
    </>
  );
}
