import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from 'react-feather';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import "../styles/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import CmsItem from "../components/CmsItem";
import { Cascader, Input, Select, Space, Switch } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import ArtistBox from '../components/ArtistBox'
import { useParams } from 'react-router-dom';

const title = 'หน้าแรก';
const bgImg = "";
const body = { backgroundImage: "url('seamoon.jpg')" }

const cms_loop = () => {
  const paragraphs = [];
  for (let i = 0; i < 7; i++) {
    paragraphs.push(<SwiperSlide key={i}>
      <CmsItem src="/monlan.png" headding="คอมมิชชัน SD" price="100" desc="คมช.เส้นเปล่า-ลงสีรับทุกสเกล สามารถเพิ่มตัวละครหรือเพิ่มพร็อพได้ โดยราคาขึ้นอยู่กับรายละเอียดที่เพิ่มเข้ามา" />
    </SwiperSlide>);
  }
  return paragraphs;
}


export default function Index() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [urs_token, setUrs_token] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
    getUser();
    getLatestCommission();
    // getArtistCommission();
    // getPopular();
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
          setUrs_token(data.urs_token);
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
  const [cmsLatests, setCmsLatest] = useState([]);
  // const [cmsArtists, setCmsArtist] = useState([]);
  // const [cmsPopular, setCmsPopular] = useState([]);
  // console.log(cmsPopular);
  const getLatestCommission = async () => {
    await axios.get("http://localhost:3333/latestCommission", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const Cmslatest = response.data;
      setCmsLatest(Cmslatest.commissions)
    })
  }
  // const getArtistCommission = async () => {
  //   await axios.get("http://localhost:3333/artistCommission", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   }).then((response) => {
  //     const Cmsfollowing = response.data;
  //     setCmsArtist(Cmsfollowing.commissions);
  //   })
  // }
  // const getPopular = async () => {
  //   await axios.get("http://localhost:3333/popularCommission", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   }).then((response) => {
  //     const Cmspopular = response.data;
  //     setCmsPopular(Cmspopular.commissions);
  //   })
  // }
  const handleLinkClick = (cms_id) => {
    const clickstreamData = {
      userID: userdata.id,
      page_url: window.location.href + "cmsdetail/" + cms_id, // หรือใช้ URL ปัจจุบัน
      target_cms_id: cms_id, // ID ของคอมมิชชันที่ผู้ใช้คลิก
    };

    axios.post('http://localhost:3333/click', clickstreamData)
      .then(response => {
        console.log(response.data.message);
        // หลังจากบันทึก Clickstream เสร็จสิ้น คุณสามารถเรียกใช้การนำทางไปยังรายละเอียดคอมมิชชัน
        // โดยใช้ react-router-dom หรือวิธีการนำทางอื่น ๆ ตามที่คุณใช้
      })
      .catch(error => {
        console.error(error);
        // ในกรณีที่เกิดข้อผิดพลาดในการบันทึก Clickstream คุณสามารถจัดการตามที่เหมาะสม
      });
  };

  const { Search } = Input;
  const { submenu } = useParams();


  useEffect(() => {
    console.log(submenu)
    const oldSelected = document?.getElementsByClassName("selected")
    oldSelected[0]?.classList.remove("selected")
    if (submenu == null) {
      const menuSelected = document?.getElementById("foryou")
      menuSelected?.classList.add("selected")
    } else {
      if (document.getElementById(submenu)) {
        document.getElementById(submenu).classList.add("selected")
      } else {
        if (submenu !== 'search') {
          window.location.href = "http://localhost:3000/";
        }
      }
    }
  }, [submenu])

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
              <Link to="/search" id="search" ><Search placeholder="ค้นหา.." allowClear size="large" /></Link>
            </div>
          </div>

          <div className=" content-container user-profile-contentCard" >
            {submenu !== 'search' ? <>
              <div className="content-type">
                <Link to="/" id="foryou" className="sub-menu"  >สำหรับคุณ</Link>
                <Link to="/commissions" id="commissions" className="sub-menu" >คอมมิชชัน</Link>
                <Link to="/gallery" id="gallery" className="sub-menu" >แกลเลอรี</Link>
                <Link to="/artists" id="artists" className="sub-menu" >นักวาด</Link>
              </div>
              {submenu == null ? <Foryou cmsLatests={cmsLatests} handleLinkClick={handleLinkClick} /> : submenu == "commissions" ? <Commissions /> : submenu == "gallery" ? <Gallery /> : submenu == "artists" ? <Artists /> : submenu == "search" && <Search />}
            </> :
              <SearchResults />}
          </div>
        </div>
      </div>
    </div>
  );
}


function Commissions() {

  const all_option = [
    { value: '0', label: 'เลือกทั้งหมด' },
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
  const { Option } = Select;

  const children = [];

  all_option.map((item, index) => (
    index === 0 ? <button>เลือกทั้งหมดดด</button> : children.push(<Option key={index}>{item}</Option>)
  ))
  const [topicValues, setTopicValues] = useState(["0"])
  const newTopicValues = [];
  const [checkAll, setCheckAll] = useState(false)

  useEffect(() => {
    all_option.map((item, index) => {
      console.log(item.value, 'index:', index)
      newTopicValues.push(item.value);
    });
    setTopicValues(newTopicValues)

  }, [])

  function handleChange(value) {
    console.log(topicValues[topicValues.length - 1])
    if (value.includes('0')) {

      if (value[value.length - 1] == "0") {

        console.log("เพิ่งเพิ่มเข้ามา")
        all_option.map((item, index) => {
          console.log(item.value, 'index:', index)
          newTopicValues.push(item.value);
        });
        setTopicValues(newTopicValues)
      } else {
        console.log("มียุแล้ว")
        const filteredArray = value.filter(item => item !== "0");
        // อัปเดตค่าใน state ด้วยอาร์เรย์ที่ไม่มีสมาชิกที่มีค่า 0
        setTopicValues(filteredArray);
        //ถ้าความยาว=อาเรย์-1 แล้วไม่มีสมาชิก0 ในนั้น ให้ยกเลิกตัวเลือกทั้งหมดออก
      }
    } else {
      setTopicValues(value)
    }
  }

  const all_cms = ["../monlan.png", "/f-b.png", "/boo.jpg", "/AB1.png", "/monlan.png", "/monlan.png", "/monlan.png"]
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
              value={topicValues}
              // value={["1", "2"]}
              id="topicSelector"
              onChange={handleChange}
              maxTagCount='responsive'
              options={all_option}
              allowClear
            >

              {/* {children} */}
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

function Foryou({ cmsLatests, handleLinkClick }) {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const [cmsArtists, setCmsArtist] = useState([]);
  const token = localStorage.getItem("token");

  // const [iFollowing, setIFollowingsIds] = useState([]);
  const [IFollowerData, setIFollowerData] = useState([]);
  // console.log(IFollowerData);
  
  useEffect(() => {
    getArtistCommission();
    getAritisIFollow();
  },[])


  const getArtistCommission = async () => {
    await axios.get("http://localhost:3333/artistCommission", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const Cmsfollowing = response.data;
      setCmsArtist(Cmsfollowing.commissions);
    })
  }

  const getAritisIFollow = async () => {
    await axios
      .get("http://localhost:3333/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
          if (data.status === "ok") {
            const formData = new FormData();
            formData.append("iFollowing", data.IFollowingsIds);
            axios .post("http://localhost:3333/openFollowing", formData,{
                headers: {
                    Authorization: "Bearer " + token,
                },
            }).then((response) => {
                const data = response.data;
                setIFollowerData(data.results)
            })
          } else {
            console.log("error");
          }
      })
  }
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
          modules={[Navigation]}
          className="artistbox-swiper"
        >
          {/* <SwiperSlide>
            <ArtistBox IFollowerData={IFollowerData} />
          </SwiperSlide> */}

          {IFollowerData.map(data => (
            
              <SwiperSlide>
                <a key={data.id} href={`/profile/${data.id}`}>
                  <ArtistBox img={data.urs_profile_img} name={data.urs_name}/>
                </a>
              </SwiperSlide>
           
          ))}
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
        {/* {cms_loop()} */}
        {cmsArtists.map(cmsArtstdata => (
          // <div key={cmsLatest.cms_id} style={{ display: "flex" }}>
          //   <Link to={`/cmsdetail/${cmsLatest.cms_id}`} onClick={() => handleLinkClick(cmsLatest.cms_id)} >
          //     <CmsItem src={cmsLatest.ex_img_path} headding={cmsLatest.cms_name} price="100" desc={cmsLatest.cms_desc} />
          //   </Link>
          // </div>
          <SwiperSlide key={cmsArtstdata.cms_id}>
            <Link to={`/cmsdetail/${cmsArtstdata.cms_id}`} onClick={() => handleLinkClick(cmsArtstdata.cms_id)}>
              <CmsItem src={cmsArtstdata.ex_img_path} headding={cmsArtstdata.cms_name} price={cmsArtstdata.pkg_min_price} desc={cmsArtstdata.cms_desc}/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper >

      <div class="content-box">
        <div class="content-top">
          <p className="h3">ผลงานนักวาดที่กำลังติดตาม</p>
          <Link to="http://localhost:3000/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
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
          className="gall-item-swiper"
        >

          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/character.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/character.png" /></Link>
          </SwiperSlide>


        </Swiper>
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
        {cmsLatests.map(cmsLatest => (
          // <div key={cmsLatest.cms_id} style={{ display: "flex" }}>
          //   <Link to={`/cmsdetail/${cmsLatest.cms_id}`} onClick={() => handleLinkClick(cmsLatest.cms_id)} >
          //     <CmsItem src={cmsLatest.ex_img_path} headding={cmsLatest.cms_name} price="100" desc={cmsLatest.cms_desc} />
          //   </Link>
          // </div>
          <SwiperSlide key={cmsLatest.cms_id}>
            <Link to={`/cmsdetail/${cmsLatest.cms_id}`} onClick={() => handleLinkClick(cmsLatest.cms_id)} >
              <CmsItem src={cmsLatest.ex_img_path} headding={cmsLatest.cms_name} price={cmsLatest.pkg_min_price} desc={cmsLatest.cms_desc} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper >
      <div class="content-box">
        <div class="content-top">
          <p className="h3">ผลงานล่าสุด</p>
          <Link to="http://localhost:3000/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
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
          className="gall-item-swiper"
        >

          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/Ares.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/character.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/character.png" /></Link>
          </SwiperSlide>
          <SwiperSlide >
            <Link to="/artworkdetail"><img src="/f-b.png" /></Link>
          </SwiperSlide>


        </Swiper>

      </div>
    </>
  )
}


function Gallery() {
  return (
    <div className="content-box">
      <div className="content-top">
        <p className="h3">แกลเลอรี</p>
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
        <Link to="/artworkdetail"><div className="artwork"><img src="/f-b.png" /></div></Link>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>
        <div className="artwork"><img src="/f-b.png" /></div>

      </div>


    </div>
  )
}

function Artists() {
  return (
    <>
      <div className="content-top">
        <p className="h3">นักวาด</p>
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
      <div className="artistbox-items">
        <ArtistBox />
        <ArtistBox />
        <ArtistBox />
        <ArtistBox />
      </div>
    </>
  )
}

function SearchResults(props) {
  return (
    <>
      <div className="content-type">
        {/* <Link to="/homepage" id="foryou" className="sub-menu selected"  >สำหรับคุณ</Link> */}
        <Link className="sub-menu" >ทั้งหมด</Link>
        <Link className="sub-menu" >คอมมิชชัน</Link>
        <Link className="sub-menu" >แกลเลอรี</Link>
        <Link className="sub-menu" >นักวาด</Link>
      </div>
      <h3>ผลการค้นหาของ "xxx"</h3>
      <div className="content-box">

        <div className="content-top">
          <p className="h3">นักวาด</p>
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
            <ArtistBox />
          </SwiperSlide>
          <SwiperSlide>
            <ArtistBox />
          </SwiperSlide>
          <SwiperSlide>
            <ArtistBox />
          </SwiperSlide>
          <SwiperSlide>
            <ArtistBox />
          </SwiperSlide>
          <SwiperSlide>
            <ArtistBox />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="content-box">
        <div className="content-top">
          <p className="h3">คอมมิชชัน</p>
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
          <p className="h3">ผลงาน</p>
          <Link to="http://localhost:3000/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
        </div>
        <div class="content-items">
        </div>
      </div>


    </>
  )
}

