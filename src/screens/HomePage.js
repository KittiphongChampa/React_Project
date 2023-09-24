
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage, NavbarGuest } from "../components/Navbar";
import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
import Profile from './Profile';
import ChangeProfileImgModal from "../modal/ChangeProfileImgModal";
import { ChangeCoverModal, openInputColor } from "../modal/ChangeCoverModal"
import CmsItem from "../components/CmsItem";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space, Switch } from 'antd';

const { Option } = Select;

const title = 'homepage';
const bgImg = ""
const body = { backgroundImage: "url('seamoon.jpg')" }

const cms_loop = () => {
    const paragraphs = [];
    for (let i = 0; i < 7; i++) {
        paragraphs.push(<SwiperSlide key={i}>
            <CmsItem src="monlan.png" headding="คอมมิชชัน SD" price="100" desc="คมช.เส้นเปล่า-ลงสีรับทุกสเกล สามารถเพิ่มตัวละครหรือเพิ่มพร็อพได้ โดยราคาขึ้นอยู่กับรายละเอียดที่เพิ่มเข้ามา" />
        </SwiperSlide>);
    }
    return paragraphs;
}


export default function HomePage() {
    const onSearch = ""
    const { submenu } = useParams();
    const [subMenuSelected, setSubMenuSelected] = useState()
    const { Search } = Input;

    useEffect(() => {
        // console.log(submenu)
        const oldSelected = document?.getElementsByClassName("selected")
        oldSelected[0]?.classList.remove("selected")
        if (submenu == null) {
            const menuSelected = document?.getElementById("foryou")
            menuSelected?.classList.add("selected")
        } else {
            if (document.getElementById(submenu)) {
                document.getElementById(submenu).classList.add("selected")
                // alert("ลิ้งถูก")

            } else {
                // alert("ลิ้งผิด")
                window.location.href = "http://localhost:3000/homepage";
            }

        }



    }, [submenu])


    const selectBefore = (
        <Select defaultValue="คอมมิชชัน">
            <Option value="คอมมิชชัน">คอมมิชชัน</Option>
            <Option value="นักวาด">นักวาด</Option>
            <Option value="แกลอรี่">แกลอรี่</Option>
            <Option value="หัวข้อ">หัวข้อ</Option>
        </Select>
    );






    return (
        <div className="body-con">

            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarUser />
            <div class="body-nopadding" style={body}>
                <div className="container">
                    <div class="search-container">
                        <div className="search-box">
                            {/* <button><Icon.Search className='nav-icon' /></button>
                            <input type="text" placeholder="ค้นหาคิมมิชชัน แกลอรี่ นักวาด หัวข้อ..." /> */}
                            <Search addonBefore={selectBefore} placeholder="ค้นหา.." allowClear size="large" />
                        </div>
                        <div class="popular-topic">
                            <p>หัวข้อยอดนิยม :</p>
                            <a href="">semi-real</a>
                            <a href="">chibi</a>
                            <a href="">landscape</a>
                        </div>
                    </div>

                    <div className=" content-container user-profile-contentCard" >
                        <div className="content-type">
                            <Link to="/homepage" id="foryou" className="sub-menu selected"  >สำหรับคุณ</Link>
                            <Link to="/homepage/commissions" id="commissions" className="sub-menu" >คอมมิชชัน</Link>
                            <Link to="/homepage/gallery" id="gallery" className="sub-menu" >แกลลอรี่</Link>
                            <Link to="/homepage/artists" id="artists" className="sub-menu" >นักวาด</Link>
                            {/* <Link to="/homepage/topics" id="topics" className="sub-menu" >หัวข้อ</Link> */}
                            {/* <button className="sub-menu">คอมมิชชัน</button>
                            <button className="sub-menu">แกลลอรี่</button>
                            <button className="sub-menu">นักวาด</button>
                            <button className="sub-menu">หัวข้อ</button> */}
                        </div>
                        {submenu == null ? <Foryou /> : submenu == "commissions" ? <Commissions /> : submenu == "gallery" ? <Gallery /> : null}

                    </div>
                </div>


            </div>


        </div>
    );
}

function Commissions() {
    // const options = [];

    // for (let i = 10; i < 36; i++) {
    //     const value = i.toString(36) + i;
    //     options.push({
    //         label: `${value}`,
    //         value,
    //     });
    // }

    const all_option = [
        "เลือกทั้งหมด",
        "Sequentail Art",
        "SD scale",
        "Traditional Art",
        "doodle Art",
        "Semi-realistic",
        "Realistic",
        "Pixel Art",
        "Vector",
        "Western Art ",
        "Anime",
        "Digital Art",
        "Furry",
        "Cubism Art",
        "Isometric Art",
        "Midcentury Illustration",
        "Minimalism",
        "Mosaic Art",
        "Pop Art",
        "Sketchy Style Art",
        "Watercolor"
    ]


    const { Option } = Select;

    const children = [];
    // for (let i = 10; i < 36; i++) {
    //     children.push(<Option key={i.toString(36) + i}>{i}</Option>);
    // }

    function handleChange(value) {
        // if (value=="เลือกทั้งหมด") {
        //     value = [...options];
        // }
        // alert(value.includes('0'))

        if (value.includes('0')) {
            
            // value = [...children.map((option) => option.key)];
            // value = children;
            // alert(value)
        }

        console.log(`selected ${value}`);
    }

    all_option.map((item, index) => (
        children.push(<Option key={index}>{item}</Option>)
    ))

    // const selectProps = {
    //     mode: 'multiple',
    //     style: { width: '10rem' },
    //     value,
    //     options,
    //     onChange: (newValue) => {
    //         setValue(newValue);
    //     },
    //     placeholder: 'Select Item...',
    //     maxTagCount: 'responsive',
    // };

    const all_cms = ["../monlan.png", "../f-b.png", "../boo.jpg", "../AB1.png", "../monlan.png", "../monlan.png", "../monlan.png"]
    return (
        <>
            <div className="content-box">
                <div className="content-top">
                    <p className="h3">คอมมิชชัน</p>
                    {/* <p>ดูทั้งหมด&gt;</p> */}
                    <div className="submenu-filter">

                        เรียงตาม :<Select
                            defaultValue="ล่าสุด"
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                { value: 'ราคา ↑', label: 'ราคา ↑' },
                                { value: 'ราคา ↓', label: 'ราคา ↓' },
                                { value: 'คะแนนรีวิว ↑', label: 'คะแนนรีวิว ↑' },
                                { value: 'คะแนนรีวิว ↓', label: 'คะแนนรีวิว ↓' },
                                { value: 'ล่าสุด', label: 'ล่าสุด' },
                                { value: 'เก่าสุด', label: 'เก่าสุด' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                        สถานะ :<Select
                            defaultValue="เปิด"
                            style={{ width: 100 }}
                            // onChange={handleChange}
                            options={[
                                { value: 'เปิด', label: 'เปิด' },
                                { value: 'ปิด', label: 'ปิด' },
                                { value: 'ทั้งหมด', label: 'ทั้งหมด' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                        {/* หัวข้อ :<Select
                            defaultValue="topic"
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                { value: 'topic', label: 'หัวข้อ' },
                            ]}
                        /> */}หัวข้อ : <Select
                            mode="multiple"
                            style={{ width: '10rem' }}
                            placeholder="Please select"
                            defaultValue={["0"]}
                            onChange={handleChange}
                            maxTagCount='responsive'
                        >
                            {children}
                        </Select>
                        กรองจาก :<Select
                            defaultValue="all"
                            style={{ width: 170 }}
                            // onChange={handleChange}
                            options={[
                                { value: 'all', label: 'นักวาดทั้งหมด' },
                                { value: 'follow', label: 'นักวาดที่ติดตาม' },
                            ]}
                        />
                    </div>
                </div>
                <div className="content-items">

                    {all_cms.map((src) =>
                        <CmsItem src={src} headding="คอมมิชชัน SD" price="100" desc="คมช.เส้นเปล่า-ลงสีรับทุกสเกล สามารถเพิ่มตัวละครหรือเพิ่มพร็อพได้ โดยราคาขึ้นอยู่กับรายละเอียดที่เพิ่มเข้ามา" />
                    )
                    }

                </div>


            </div>
        </>
    )

}

function Foryou(props) {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    // Handle the selection change
    const handleSelectChange = (selectedItems) => {
        console.log(selectedItems);
    };
    return (
        <>
            <div className="content-box">

                <div className="content-top">
                    <p className="h3">นักวาดที่คุณกำลังติดตาม</p>
                    <Link to="http://localhost:3000/homepage/artists"><p>ดูทั้งหมด&gt;</p></Link>
                </div>

                <Swiper
                    slidesPerView="auto"
                    centeredSlides={false}
                    slidesPerGroupSkip={1}
                    spaceBetween={10}

                    // scrollbar={true}
                    // navigation={true}
                    modules={[Navigation]}
                    className="artistbox-swiper"
                >
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="artist-box">
                            <div className="img-wrapper"><img src="boo.jpg" /></div>
                            <p>ชื่อ</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="content-box">
                <div className="content-top">
                    <p className="h3">คอมมิชชันของนักวาดที่ติดตาม</p>
                    <Link to="http://localhost:3000/homepage/commissions"><p>ดูทั้งหมด&gt;</p></Link>
                </div>
            </div>
            <Swiper
                slidesPerView="auto"
                centeredSlides={false}
                slidesPerGroupSkip={1}
                spaceBetween={10}
                grabCursor={true}
                keyboard={{
                    enabled: true,
                }}
                scrollbar={false}
                navigation={true}
                modules={[Keyboard, Scrollbar, Navigation]}
                className="cms-item-swiper"
            >
                {cms_loop()}
            </Swiper >

            <div class="content-box">
                <div class="content-top">
                    <p className="h3">ผลงานนักวาดที่กำลังติดตาม</p>
                    <Link to="http://localhost:3000/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
                </div>
                <div class="content-items">
                </div>
            </div>
            <div class="content-box">
                <div class="content-top">
                    <p className="h3">คอมมิชชันล่าสุด</p>
                    <Link to="http://localhost:3000/homepage/commissions"><p>ดูทั้งหมด&gt;</p></Link>
                </div>
            </div>
            <Swiper
                slidesPerView="auto"
                centeredSlides={false}
                slidesPerGroupSkip={1}
                spaceBetween={10}
                grabCursor={true}
                keyboard={{
                    enabled: true,
                }}
                scrollbar={false}
                navigation={true}
                modules={[Keyboard, Scrollbar, Navigation]}
                className="cms-item-swiper"
            >
                {cms_loop()}
            </Swiper >
            <div class="content-box">
                <div class="content-top">
                    <p className="h3">ผลงานล่าสุด</p>
                    <Link to="http://localhost:3000/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
                </div>
                <div class="content-items">
                </div>
            </div>
        </>
    )
}


function Gallery() {
    return (
        <div className="content-box">
            <div className="content-top">
                <p className="h3">แกลอรี่</p>
                {/* <p>ดูทั้งหมด&gt;</p> */}
                <div className="submenu-filter">

                    เรียงตาม :<Select
                        defaultValue="ล่าสุด"
                        style={{ width: 120 }}
                        // onChange={handleChange}
                        options={[
                            // { value: 'jack', label: 'ราคา ↑' },
                            // { value: 'lucy', label: 'ราคา ↓' },
                            // { value: 'Yiminghe', label: 'คะแนนรีวิว ↑' },
                            // { value: 'Yiminghe', label: 'คะแนนรีวิว ↓' },
                            { value: 'ล่าสุด', label: 'ล่าสุด' },
                            { value: 'เก่าสุด', label: 'เก่าสุด' },
                            // { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                    หัวข้อ :<Select
                        defaultValue="topic"
                        style={{ width: 120 }}
                        // onChange={handleChange}
                        options={[
                            { value: 'topic', label: 'หัวข้อ' },
                        ]}
                    />
                    กรองจาก :<Select
                        defaultValue="all"
                        style={{ width: 170 }}
                        // onChange={handleChange}
                        options={[
                            { value: 'all', label: 'นักวาดทั้งหมด' },
                            { value: 'follow', label: 'นักวาดที่ติดตาม' },
                        ]}
                    />

                </div>


            </div>
            <div className="content-items">
                <Link to="/artworkdetail"><div className="artwork"><img src="../mac-kaveh.jpg" /></div></Link>
                <div className="artwork"><img src="../mac-kaveh.jpg" /></div>
                <div className="artwork"><img src="../mac-kaveh.jpg" /></div>
                <div className="artwork"><img src="../kaveh.png" /></div>
                <div className="artwork"><img src="../kaveh.png" /></div>
                <div className="artwork"><img src="../mac-kaveh.jpg" /></div>
                <div className="artwork"><img src="../kaveh.png" /></div>
                <div className="artwork"><img src="../mac-kaveh.jpg" /></div>
                <div className="artwork"><img src="../kaveh.png" /></div>

            </div>


        </div>
    )
}
