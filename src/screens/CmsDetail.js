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
import { Alert, Space, Modal, Form, Button, Input, Radio } from "antd";

const host = "http://188.166.218.38:3333";
// const host = "http://localhost:3333";

const title = "รายละเอียด cms";
const body = { backgroundImage: "url('monlan.png')" };

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
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setTouValue(e.target.value);
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
            formData.append("from", userdata.id,);
            formData.append("to", artistDetail.artistId);
            formData.append("od_id", od_id);
            // ส่งค่าเพื่อเป็น chat ให้นักวาด
            axios .post(`${host}/messages/addmsg-order`, formData, {})

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
            <Radio.Group onChange={onChange} value={touValue}>
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

      <Scrollbars>
        <div class="body-lesspadding">
          <div className="container">
            <div className="content-card">
              <div className="cms-overview">
                <h1 className="me-3">คอมมิชชัน Full Scale</h1>
                <p class="cms-status-detail">เปิด</p>
              </div>
              <div className="cms-artist-box">
                <Link to={`/profile/${artistDetail.artistId}`}>
                  <div id="cms-artist-profile">
                    <img src={artistDetail.artistProfile} alt="" />
                    <p>
                      {artistDetail.artistName} <span>4.0</span>
                      <span>
                        <ggIcon.Star className="fill-icon" />{" "}
                      </span>{" "}
                      (3) | ว่าง 3 คิว
                    </p>
                  </div>
                </Link>
                <p id="cms-price" className="h4">
                  เริ่มต้น {minPrice} บาท
                </p>
              </div>
              <p style={{ textAlign: "right", fontSize: "0.7rem" }}>
                {thaiDate}
              </p>
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
            </div>
          </div>
        </div>
      </Scrollbars>
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
