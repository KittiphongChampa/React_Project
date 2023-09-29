
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import { useForm } from "react-hook-form"
// import "../css/indeAttImgInput.css";
// import "../css/recent_index.css";
// import '../styles/index.css';
import '../styles/main.css';
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest} from "../components/Navbar";
import ImgSlide from "../components/ImgSlide";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ggIcon from '@mui/icons-material';
import Scrollbars from 'react-scrollbars-custom';
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from 'uuid';
import { Alert, Space } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, Link, useParams } from "react-router-dom";



const title = 'รายละเอียด cms';
const body = { backgroundImage: "url('monlan.png')" }


export default function CmsDetail() {

    const [formModalOpened, setFormModalOpened] = useState(false)

    function openFormModal() {
        setFormModalOpened(prevState => !prevState)
    }

    const FormModal = (props) => {
        const [attImgComponents, setAttImgComponents] = useState([])
        function addNewAttImg(props) {
            setAttImgComponents([...attImgComponents, { text: "", pic: "" }])
            console.log(attImgComponents)
        }

        function removeAttImg(componentKey) {
            const update = attImgComponents.filter((_, i) => i !== componentKey);
            setAttImgComponents(update)
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

        return <>
            <div className="modal cms-detail">
                <div className="form-order-card">
                    <div className="close-tab"><button onClick={openFormModal}><Icon.X /></button></div>
                    <div className="form-order">
                        <h1 className="h4">ส่งคำขอจ้าง</h1>
                        {/* <p className="selected-packgage">Full color by boobii : Bust-up full color เริ่มต้น 500 P</p> */}
                        <div className="form-item">
                            <label>ประเภทการใช้งาน</label>
                            <div className="tou-radio-btn-group">
                                <div><input type="radio" id="Personal" name="type-of-use" value="Personal" checked />
                                    <label className="ms-1" for="Personal">Personal use<span></span></label></div>
                                <div><input type="radio" id="License" name="type-of-use" value="License" checked />
                                    <label className="ms-1" for="License">License<span></span></label></div>
                                <div><input type="radio" id="Exclusive" name="type-of-use" value="Exclusive" checked />
                                    <label className="ms-1" for="Exclusive">Exclusive right<span></span></label></div>
                            </div>
                        </div>
                        <div className="form-item">
                            <label>จุดประสงค์การใช้ภาพ</label>
                            <TextareaAutosize
                                className="txtarea-input"
                                id="username"
                                maxLength="300"
                                placeholder="โปรดระบุ เพื่อให้นักวาดคำนวณราคาที่เหมาะสม เช่น นำไปทำพวงกุญแจขาย"
                            />
                        </div>
                        <div className="form-item">
                            <label>รายละเอียด</label>
                            <TextareaAutosize
                                className="txtarea-input"
                                id="username"
                                maxLength="300"
                                placeholder="อธิบายรายละเอียดงานจ้างหรือภาพที่ต้องการ"
                            />
                        </div>

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
                        <button className="orderSubmitBtn">ส่งคำขอขอจ้าง</button>
                    </div>
                </div>
            </div>
        </>
    }

    const [activeMenu, setActiveMenu] = useState({ package: true, review: false, queue: false })

    function handleMenu(event, menu) {
        const oldMenu = document.querySelector(".sub-menu.selected");
        oldMenu.classList.remove("selected")
        event.target.classList.add("selected")
        // setActiveMenu((prevState) => ({
        //     ...prevState, package: !prevState.package, review: !prevState.review, queue: !prevState.queue
        // }));
        setActiveMenu({ package: false, review: false, queue: false });
        setActiveMenu({ [menu]: true });
        // setActiveMenu(...prevState, package: !prevState.package )
    }
    const navigate = useNavigate();
    const cmsID = useParams();
    const [userdata, setUserdata] = useState([]);
    const [artistDetail, setArtistDetail] = useState([]);
    const [cmsDetail, setCmsDetail] = useState([]);
    const [imgDetail, setImgDetail] = useState([]);
    const [pkgDetail, setPkgDetail] = useState([]);
    // console.log("artistDetail : ", artistDetail);
    // console.log("cmsDetail : ", cmsDetail);
    // console.log("imgDetail : ", imgDetail);
    // console.log("pkgDetail : ", pkgDetail);

    const time = cmsDetail.created_at;
    const date = new Date(time);
    const thaiDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543}`;
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
          if (window.location.pathname === "/login") {
            navigate("/");
          }
        } else {
          navigate("/login");
        }
        getUser();
        getDetailCommission();
    }, []);
    const token = localStorage.getItem("token");
    const getUser = async () => {
        await axios
          .get("http://localhost:3333/index", {
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
              // Handle token expired error
              alert("Token has expired. Please log in again.");
              localStorage.removeItem("token");
              navigate("/login");
            } else {
              // Handle other errors here
              console.error("Error:", error);
            }
          });
    };

    const getDetailCommission = async () => {
        await axios.get(`http://localhost:3333/detailCommission/${cmsID.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          const data = response.data;
          setArtistDetail(data.artist)
          setCmsDetail(data.commission);
          setImgDetail(data.images);
          setPkgDetail(data.packages);
        })
    }

    return (
        <div className="body-con">
            {formModalOpened ? <FormModal /> : null}
            {/* <FormModal /> */}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />
            {/* {formModalOpened? <FormModal/> : null} */}
            <div className="background-blur" style={body}>
                {/* <LazyLoadImage
                    effect="blur" // เลือกเอฟเฟคที่คุณต้องการ
                    src="monlan.png"
                    alt="Background Image"
                    className="backgroundmage"
                    // style={{objectFit:"cover",width:"100%",height:"100%"}}
                /> */}
            </div>

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
                                        <p>{artistDetail.artistName} <span>4.0</span><span><ggIcon.Star className='fill-icon' /> </span> (3) | ว่าง 3 คิว</p>
                                    
                                    </div>
                                </Link>
                                <p id="cms-price" className="h4">เริ่มต้น 100 บาท</p> {/* ให้มันชิดขวา */}
                            </div>
                            <p style={{textAlign:"right",fontSize:"0.7rem"}}>{thaiDate}</p>
                            <ImgSlide imgDetail={imgDetail} />
                            
                            <p className="text-align-center mt-3 mb-3">คมช.เส้นเปล่า-ลงสีรับทุกสเกล สามารถเพิ่มตัวละครหรือเพิ่มพร็อพได้ โดยราคาขึ้นอยู่กับรายละเอียดที่เพิ่มเข้ามา</p>
                            <div className="skill">
                                <div className="good-at">
                                    <ul>
                                        <p>ถนัด</p>
                                        <li><span>เด็ก</span></li>
                                        <li><span>ผู้หญิง</span></li>
                                    </ul>
                                </div>
                                <div className="bad-at">
                                    <ul>
                                        <p>ไม่ถนัด</p>
                                        <li><span>เฟอร์นิเจอร์</span></li>
                                        <li><span>สัตว์ทุกชนิด</span></li>
                                    </ul>
                                </div>

                                <div className="not-accept">
                                    <ul>
                                        <p>ไม่รับ</p>
                                        <li><span>คนแก่</span></li>
                                        <li><span>หุ่นยนต์</span></li>
                                    </ul>

                                </div>

                            </div>
                            <div className="group-submenu">
                                <button className="sub-menu selected" onClick={!activeMenu.package ? (event) => handleMenu(event, "package") : null}>แพ็กเกจ</button>
                                <button className="sub-menu" onClick={!activeMenu.review ? (event) => handleMenu(event, "review") : null}>รีวิว</button>
                                <button className="sub-menu" onClick={!activeMenu.queue ? (event) => handleMenu(event, "queue") : null}>คิว</button>
                            </div>

                            {/* <Queue /> */}

                            {activeMenu.package && <Package pkgDetail={pkgDetail} onClick={openFormModal} />}
                            {activeMenu.review && <Review />}
                            {activeMenu.queue && <Queue />}

                        </div>
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
}

function Package(props) {
    const { pkgDetail } = props;

    return <>
        <h2>เลือกแพ็กเกจ</h2>
        <p className="text-align-right">ราคาสำหรับ personal use หากใช้ในเชิงอื่นอาจกำหนดราคาขึ้นมากกว่านี้</p>
        {Array.isArray(pkgDetail) ? (
            pkgDetail.map((pkg) => (
                <div className="select-package-item" onClick={props.onClick} key={pkg.pkg_id}>
                    <div>
                        <h3>{pkg.pkg_name}</h3>
                        <p>{pkg.pkg_min_price}+ THB</p>
                        <p>ราคาสำหรับเส้นเปล่า ลงสีพื้น+{pkg.pkg_min_price} บาท ลงสีเต็ม(ลงเงา) +{pkg.pkg_min_price + 50} บาท</p>
                    </div>
                    <div>
                        <p>ระยะเวลาทำงาน {pkg.pkg_duration} วัน</p>
                        <p>ประเภทงานที่อนุญาต ทุกประเภท</p>
                        <p>จำนวนครั้งแก้ไขงาน {pkg.pkg_edits} ครั้ง</p>
                    </div>
                </div>
            ))
            ) : (
            <div className="select-package-item" onClick={props.onClick}>
                <div>
                    <h3>{pkgDetail.pkg_name}</h3>
                    <p>{pkgDetail.pkg_min_price}+ THB</p>
                    <p>ราคาสำหรับเส้นเปล่า ลงสีพื้น+{pkgDetail.pkg_min_price} บาท ลงสีเต็ม(ลงเงา) +{pkgDetail.pkg_min_price + 50} บาท</p>
                    </div>
                    <div>
                    <p>ระยะเวลาทำงาน {pkgDetail.pkg_duration} วัน</p>
                    <p>ประเภทงานที่อนุญาต ทุกประเภท</p>
                    <p>จำนวนครั้งแก้ไขงาน {pkgDetail.pkg_edits} ครั้ง</p>
                </div>
            </div>
            )
        }
    </>

}

function Review() {

    return <>

        <h2>รีวิว (4.0  จาก 3 รีวิว)</h2>
        <div className="review-box">
            <div className="reviewer-box">
                <div><img src="https://i.kym-cdn.com/entries/icons/original/000/043/403/cover3.jpg" /></div>
                <div><p>K.Kav</p>
                    <p>เมื่อวานนี้ 10:10 น.</p></div>

            </div>
            <p style={{ fontWeight: "500" }}>แพ็กเกจ : Half Body</p>
            <p><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /></p>
            <p>เขียนรีวิว</p>
            {/* <div className="img-box"><img src="kaveh.png" /></div> */}
        </div>
        <div className="review-box">
            <div className="reviewer-box">
                <div><img src="https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/smudge-the-viral-cat.jpg" /></div>
                <div><p>Arora</p>
                    <p>20/08/2566 19:56 น.</p></div>

            </div>
            <p style={{ fontWeight: "500" }}>แพ็กเกจ : Half Body</p>
            <p><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /></p>
            <p>เขียนรีวิว</p>
            {/* <div className="img-box" ><img src="kaveh.png" /></div> */}
        </div>
        <div className="review-box">
            <div className="reviewer-box">
                <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmaQdvWJzdLZ2M0QpDmDxHXY5K_5Uz2ZSNg&usqp=CAU" /></div>
                <div><p>Sarah Baba</p>
                    <p>17/08/2566 19:56 น.</p></div>

            </div>
            <p style={{ fontWeight: "500" }}>แพ็กเกจ : Half Body</p>
            <p><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /><ggIcon.Star className='fill-icon' /></p>
            <p>เขียนรีวิว</p>
            {/* <div className="img-box"><img src="kaveh.png" /></div> */}
        </div>

    </>

}


function Queue() {

    return <>

        <h2>คิว (3/6)</h2>
        {/* <Alert message="ในตารางคิวนี้รวมคิวของคอมมิชชันอื่นของคุณBoobi ด้วย" closable type="info" showIcon className="mt-3 mb-5 " /> */}
        <table className="queue-table">
            <tr>
                <th className="q">คิว</th>
                <th>คอมมิชชัน:แพคเกจ</th>
                <th>ระยะเวลา(วัน)</th>
                <th>ความคืบหน้า</th>
            </tr>
            <tr>
                <td>1</td>
                <td>คอมมิชชัน Full Scale : Headshot</td>
                <td>2</td>
                <td>ภาพร่าง</td>
            </tr>
            <tr>
                <td>2</td>
                <td>คอมมิชชัน Full Scale : Half body</td>
                <td>3</td>
                <td>ยังไม่เริ่ม</td>
            </tr>
            <tr>
                <td>3</td>
                <td>คอมมิชชัน Full Scale : Full Body</td>
                <td>4</td>
                <td>ยังไม่เริ่ม</td>
            </tr>

        </table>

    </>

}
