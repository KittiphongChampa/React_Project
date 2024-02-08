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
import { io } from "socket.io-client";
import { host } from "../utils/api";

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
  const [statusUserLogin, setStatusUserLogin] = useState('not_login');
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      setStatusUserLogin('login');
      getUser();
      getAritisIFollow();
      getGalleryArtistIfollow();
      getArtistCommission();
    }
    getLatestCommission();
    getGalleryLatest();
  }, []);
  
  const getUser = async () => {
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
  const [cmsLatests, setCmsLatest] = useState([]); //คอมมิชชันล่าสุด
  const [cmsArtists, setCmsArtist] = useState([]); //คอมมิชชันของนักวาดที่ติดตาม

  const [gallerylatest, setGallerylatest] = useState([]); //งานวาดล่าสุด
  const [galleryIfollow, setGalleryIFollow] = useState([]); //งานวาดของนักวาดที่ติดตาม

  const [IFollowerData, setIFollowerData] = useState([]);
  const [IFollowingIDs, setIFollowingIDs] = useState([]); //นักวาดที่เราติดตามมีใครบ้าง

  //หาคนที่เรากำลังติดตามและติดตามเรา
  const getAritisIFollow = async () => {
    await axios
      .get(`${host}/profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
          if (data.status === "ok") {
            setIFollowingIDs(data.IFollowingsIds);
            const formData = new FormData();
            formData.append("iFollowing", data.IFollowingsIds);
            axios .post(`${host}/ArtistIndex`, formData).then((response) => {
                const data = response.data;
                setIFollowerData(data.results)
            })
          } else {
            console.log("error");
          }
      })
  }

  const getLatestCommission = async () => {
    await axios.get(`${host}/latestCommission`).then((response) => {
      const Cmslatest = response.data;
      setCmsLatest(Cmslatest.commissions)
    })
  }
  const getArtistCommission = async () => {
    await axios.get(`${host}/artistCommission`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      if (response.data.status === 'ok') {
        const Cmsfollowing = response.data;
        setCmsArtist(Cmsfollowing.commissions);
      }
    })
  }

  const getGalleryLatest = async () => {
    await axios.get(`${host}/gallerry/latest`).then((response) => {
      const Gallerylatest = response.data;
      setGallerylatest(Gallerylatest.results)
    })
  }
  const getGalleryArtistIfollow = async () => {
    await axios.get(`${host}/gallerry/Ifollow`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const data = response.data;
      if (data.status === 'ok') {
        setGalleryIFollow(data.results)
      } 
    })
  }

  const { Search } = Input;
  const { submenu } = useParams();


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
      } else {
        if (submenu !== 'search') {
          window.location.href = `${host}/`;
        }
      }
    }
  }, [submenu])

  // เกี่ยวกับการแจ้งเตือน
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io(`${host}`));
  }, []);


  return (
    <div className="body-con">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      
      {statusUserLogin === 'login' ? <NavbarUser /> : <NavbarHomepage />}

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
                <Link to="/gallery" id="gallery" className="sub-menu" >งานวาด</Link>
                <Link to="/artists" id="artists" className="sub-menu" >นักวาด</Link>
              </div>
              {submenu == null 
              ? <Foryou statusUserLogin={statusUserLogin} cmsLatests={cmsLatests} cmsArtists={cmsArtists} IFollowerData={IFollowerData} gallerylatest={gallerylatest} galleryIfollow={galleryIfollow} /> : submenu == "commissions" 
              ? <Commissions IFollowingIDs={IFollowingIDs}/> : submenu == "gallery" 
              ? <Gallery IFollowingIDs={IFollowingIDs} /> : submenu == "artists" 
              ? <Artists IFollowingIDs={IFollowingIDs}/> : submenu == "search" && <Search />}
            </> :
              <SearchResults />}
          </div>
        </div>
      </div>
    </div>
  );
}


function Commissions({IFollowingIDs}) {

  const [Message, setMessage] = useState('');
  const [sortBy, setSortBy] = useState('ล่าสุด');
  const [filterBy, setFilterBy] = useState('all');
  const [topicValues, setTopicValues] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
  const [topics, setTopics] = useState([]);
  const [commission, setCommission] = useState([]);

  useEffect(() => {
    topic();
    fetchData();
  }, [sortBy, filterBy, topicValues]);

  const topic = async () => {
    await axios.get(`${host}/getTopic`).then((response) => {
      const data = response.data;
      setTopics(data.topics)
    });
  }

  const all_option = [
    { value: 0, label: 'เลือกทั้งหมด' },
    ...topics.map((data) => ({
      value: data.tp_id,
      label: data.tp_name,
    })),
  ]
  
  const { Option } = Select;

  const children = [];

  // all_option.map((item, index) => (
  //   index === "0" ? <button>เลือกทั้งหมด</button> : children.push(<Option key={index}>{item}</Option>)
  // ))

  all_option.map((item) => (
    item.value === 0 ? (
      <button key={item.key}>เลือกทั้งหมด</button>
    ) : (
      children.push(<Option key={item.key} value={item.value}>{item.label}</Option>)
    )
  ));
  
  // const [topicValues, setTopicValues] = useState([0])
  const newTopicValues = [];
  const [checkAll, setCheckAll] = useState(false)

  // value is topicValues
  function handleChange(value) {
    // console.log(topicValues[topicValues.length - 1])
    if (value.includes(0)) {
      if (value[value.length - 1] === 0) {
        // console.log("เลือกทั้งหมด = เพิ่งเพิ่มเข้ามา")
        all_option.map((item) => {
          newTopicValues.push(item.value);
        });

        setTopicValues(newTopicValues)
      } else {
        // console.log("เลือกทั้งหมด แต่กดเลือกไม่ครบ = มียุแล้ว")
        const filteredArray = value.filter(item => item !== 0);
        // อัปเดตค่าใน state ด้วยอาร์เรย์ที่ไม่มีสมาชิกที่มีค่า 0
        setTopicValues(filteredArray);
        //ถ้าความยาว=อาเรย์-1 แล้วไม่มีสมาชิก0 ในนั้น ให้ยกเลิกตัวเลือกทั้งหมดออก
      }
    } else {
      // console.log("เข้า",value);
      setTopicValues(value)
    }
  }

  const fetchData = () => {
    if (filterBy === 'all') {
      sortAndFilterData();
    } else {
      filter();
    }
  };

  const sortAndFilterData = () => {
    axios.get(`${host}/getCommission?sortBy=${sortBy}&topicValues=${topicValues}`).then((response) => {
      const data = response.data;
      setCommission(data.commissions)
      setMessage('');
    });
  }

  //หาก filter กรองจาก ทำอันนี้
  const filter = () => {
    axios.get(`${host}/getCommission/Ifollow?sortBy=${sortBy}&IFollowingIDs=${IFollowingIDs}&topicValues=${topicValues}`).then((response) => {
      const data = response.data;
      if (data.status === 'ok') {
        setCommission(data.commissions)
        setMessage('');
      } else {
        setCommission([]);
        setMessage("ไม่มีคอมมิชชัน")
      }
    });
  }

  const handleSortByChange = (selectedOption) => {
    setSortBy(selectedOption);
  };

  
  return (
    <>
      <div className="content-box">
        <div className="content-top">
          <p className="h3">คอมมิชชัน</p>
          {/* <p>ดูทั้งหมด&gt;</p> */}
          <div className="submenu-filter">

            เรียงตาม :
            <Select
              value={{ value: sortBy, label: sortBy }}
              style={{ width: 120 }}
              onChange={handleSortByChange}
              options={[
                { value: 'ล่าสุด', label: 'ล่าสุด' },
                { value: 'เก่าสุด', label: 'เก่าสุด' },
                { value: 'ราคา ↑', label: 'ราคา ↑' },
                { value: 'ราคา ↓', label: 'ราคา ↓' },
                { value: 'คะแนนรีวิว ↑', label: 'คะแนนรีวิว ↑' },
                { value: 'คะแนนรีวิว ↓', label: 'คะแนนรีวิว ↓' },
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

            หัวข้อ : <Select
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
            
            กรองจาก :
            <Select
              value={{ value: filterBy, label: filterBy === 'all' ? 'นักวาดทั้งหมด' : 'นักวาดที่ติดตาม' }}
              onChange={(selectedOption) => setFilterBy(selectedOption)}
              options={[
                { value: 'all', label: 'นักวาดทั้งหมด' },
                { value: 'follow', label: 'นักวาดที่ติดตาม' },
              ]}
            />

          </div>
        </div>
          

        {Message == '' ? (
        <div className="content-items">
          {commission.map((cms)=>(
            <Link to={`/cmsdetail/${cms.cms_id}`}>
              <CmsItem src={cms.ex_img_path} headding={cms.cms_name} price={cms.pkg_min_price} desc={cms.cms_desc} />
            </Link>
          ))}
        </div>
        ) : (
          <div className="artistbox-items">
            <h2>{Message}</h2>
          </div>
        )}
      </div>
    </>
  )

}

function Foryou({statusUserLogin, cmsLatests, cmsArtists, handleLinkClick, IFollowerData, gallerylatest, galleryIfollow }) {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // Handle the selection change
  const handleSelectChange = (selectedItems) => {
    console.log(selectedItems);
  };

  return (
    <>
      {statusUserLogin === 'login' ? (
        <>
          <div className="content-box">
            <div className="content-top">
              <p className="h3">นักวาดที่คุณกำลังติดตาม</p>
              <Link to="/homepage/artists"><p>ดูทั้งหมด&gt;</p></Link>
            </div>

            <Swiper
              slidesPerView="auto"
              centeredSlides={false}
              slidesPerGroupSkip={1}
              spaceBetween={10}
              modules={[Navigation]}
              className="artistbox-swiper"
            >
              {IFollowerData === 'คุณไม่มีนักวาดที่ติดตาม' ? (
              <p>คุณไม่มีนักวาดที่ติดตาม</p>
            ) : (
              IFollowerData.map(data => (
                  <SwiperSlide>
                    <a key={data.id} href={`/profile/${data.id}`}>
                      <ArtistBox img={data.urs_profile_img} name={data.urs_name}/>
                    </a>
                  </SwiperSlide>
              ))
              )}
            </Swiper>
          </div>

          <div className="content-box">
            <div className="content-top">
              <p className="h3">คอมมิชชันของนักวาดที่ติดตาม</p>
              <Link to="/homepage/commissions"><p>ดูทั้งหมด&gt;</p></Link>
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
            {cmsArtists === 'คุณไม่มีนักวาดที่ติดตาม' ? (
              <p>คุณไม่มีนักวาดที่ติดตาม</p>
            ) : (
              cmsArtists.map(cmsArtstdata => (
                <SwiperSlide key={cmsArtstdata.cms_id}>
                  <Link to={`/cmsdetail/${cmsArtstdata.cms_id}`} onClick={() => handleLinkClick(cmsArtstdata.cms_id)}>
                    <CmsItem src={cmsArtstdata.ex_img_path} headding={cmsArtstdata.cms_name} price={cmsArtstdata.pkg_min_price} desc={cmsArtstdata.cms_desc}/>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper >
          </div>

          <div class="content-box">
            <div class="content-top">
              <p className="h3">ผลงานนักวาดที่กำลังติดตาม</p>
              <Link to="/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
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
              {galleryIfollow === 'คุณไม่มีนักวาดที่ติดตาม' ? (
                <p>คุณไม่มีนักวาดที่ติดตาม</p>
              ) : (
                galleryIfollow.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/artworkdetail/${data.artw_id}`}><img src={data.ex_img_path} /></Link>
                  </SwiperSlide>
                ))
              )}

            </Swiper>
          </div>
        </>
      ) : (
        <></>
      )}

      <div class="content-box">
        <div class="content-top">
          <p className="h3">คอมมิชชันล่าสุด</p>
          <Link to="/homepage/commissions"><p>ดูทั้งหมด&gt;</p></Link>
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
          <Link to="/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
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
          {gallerylatest.map(data=>(
            <SwiperSlide key={data.artw_id}>
              <Link to={`/artworkdetail/${data.artw_id}`}><img src={data.ex_img_path} /></Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </>
  )
}

function Gallery({IFollowingIDs}) {
  const [allGallery, setAllGallery] = useState([]);
  const [Message, setMessage] = useState('');
  const [sortBy, setSortBy] = useState('ล่าสุด');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('เลือกทั้งหมด');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    topic();
    fetchData();
  }, [sortBy, filterBy, selectedTopic]);

  const topic = () => {
    axios.get(`${host}/getTopic`).then((response) => {
      const data = response.data;
      setTopics(data.topics)
    });
  }

  const fetchData = () => {
    if (filterBy === 'all') {
      sortAndFilterData();
    } else {
      filter();
    }
  };

  //หาก filter แค่เรียงตาม ทำอันนี้
  const sortAndFilterData = () => {
    axios.get(`${host}/gallerry/all?sortBy=${sortBy}&filterBy=${filterBy}&topic=${selectedTopic}`).then((response) => {
      const data = response.data;
      setAllGallery(data.results)
      setMessage('');
    });
  }
  
  //หาก filter กรองจาก ทำอันนี้
  const filter = () => {
    axios.get(`${host}/galleryIFollowArtist?sortBy=${sortBy}&IFollowingIDs=${IFollowingIDs}&topic=${selectedTopic}`).then((response) => {
      const data = response.data;
      if (data.status === 'ok') {
        setAllGallery(data.results)
        setMessage('');
      } else {
        setAllGallery([]);
        setMessage("ไม่มีนักวาดที่กำลังติดตาม")
      }
    });
  }

  const handleSortByChange = (selectedOption) => {
    setSortBy(selectedOption);
  };

  const handleTopicChange = (selectedOption) => {
    setSelectedTopic(selectedOption);
  };

  return (
    <div className="content-box">
      <div className="content-top">
        <p className="h3">งานวาด</p>
        {/* <p>ดูทั้งหมด&gt;</p> */}
        <div className="submenu-filter">

          เรียงตาม :
          <Select
            value={{ value: sortBy, label: sortBy }}
            style={{ width: 120 }}
            onChange={handleSortByChange}
            options={[
              { value: 'ล่าสุด', label: 'ล่าสุด' },
              { value: 'เก่าสุด', label: 'เก่าสุด' },
            ]}
          />
          หัวข้อ :
          <Select
          value={{ value: selectedTopic, label: selectedTopic.label }}
          style={{ width: 120 }}
          onChange={handleTopicChange}
          options={[
            { value: 'เลือกทั้งหมด', label: 'เลือกทั้งหมด' },
            ...topics.map((data) => ({
              value: data.tp_id,
              label: data.tp_name,
            })),
          ]}
        />
          กรองจาก :
          <Select
            value={{ value: filterBy, label: filterBy === 'all' ? 'นักวาดทั้งหมด' : 'นักวาดที่ติดตาม' }}
            onChange={(selectedOption) => setFilterBy(selectedOption)}
            options={[
              { value: 'all', label: 'นักวาดทั้งหมด' },
              { value: 'follow', label: 'นักวาดที่ติดตาม' },
            ]}
          />

        </div>

      </div>
      {Message == '' ? (
       
        <div className="content-items">
          {allGallery.map((data) => (
            <Link key={data.artw_id} to={`/artworkdetail/${data.artw_id}`}>
              <div className="artwork"><img src={data.ex_img_path} /></div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="artwork">
          <h2>{Message}</h2>
        </div>
      )}


    </div>
  )
}

function Artists({IFollowingIDs}) {
  const [allartist, setAllArtist] = useState([]);
  const [Message, setMessage] = useState('');
  const [sortBy, setSortBy] = useState('ล่าสุด');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    if (filterBy === 'all') {
      fetchData();
      setMessage('');
    } else {
      fetchData2();
    }
  },[sortBy, filterBy])

  const fetchData = () => {
    axios.get(`${host}/allArtist?sortBy=${sortBy}&filterBy=${filterBy}`).then((response) => {
      const data = response.data;
      setAllArtist(data.results)
    });
  };

  const fetchData2 = () => {
    axios.get(`${host}/getAritisIFollow?sortBy=${sortBy}&IFollowingIDs=${IFollowingIDs}`).then((response) => {
      const data = response.data;
      if (data.status === 'ok') {
        setAllArtist(data.results)
      } else {
        setMessage("ไม่มีนักวาดที่กำลังติดตาม")
      }
    });
  }

  const handleSortByChange = (selectedOption) => {
    console.log("Selected Sort By:", selectedOption);
    setSortBy(selectedOption);
  };

  return (
    <>
      <div className="content-top">
        <p className="h3">นักวาด</p>
        {/* <p>ดูทั้งหมด&gt;</p> */}
        <div className="submenu-filter">

          เรียงตาม :
          <Select
            value={{ value: sortBy, label: sortBy }}
            style={{ width: 120 }}
            onChange={handleSortByChange}
            options={[
              { value: 'ล่าสุด', label: 'ล่าสุด' },
              { value: 'เก่าสุด', label: 'เก่าสุด' },
            ]}
          />
          
          กรองจาก :
          <Select
            value={{ value: filterBy, label: filterBy === 'all' ? 'นักวาดทั้งหมด' : 'นักวาดที่ติดตาม' }}
            onChange={(selectedOption) => setFilterBy(selectedOption)}
            options={[
              { value: 'all', label: 'นักวาดทั้งหมด' },
              { value: 'follow', label: 'นักวาดที่ติดตาม' },
            ]}
          />

        </div>
      </div>
      {Message == '' ? (
        <div className="artistbox-items">
        {allartist.map(data => (
          <a key={data.id} href={`/profile/${data.id}`}>
            <ArtistBox img={data.urs_profile_img} name={data.urs_name}/>
          </a>
        ))}
      </div>
      ) : (
        <div className="artistbox-items">
          <h2>{Message}</h2>
        </div>
      )}
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
        <Link className="sub-menu" >งานวาด</Link>
        <Link className="sub-menu" >นักวาด</Link>
      </div>
      <h3>ผลการค้นหาของ "xxx"</h3>
      <div className="content-box">

        <div className="content-top">
          <p className="h3">นักวาด</p>
          <Link to="/homepage/artists"><p>ดูทั้งหมด&gt;</p></Link>
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
          <Link to="/homepage/commissions"><p>ดูทั้งหมด&gt;</p></Link>
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
          <Link to="/homepage/gallery"><p>ดูทั้งหมด&gt;</p></Link>
        </div>
        <div class="content-items">
        </div>
      </div>


    </>
  )
}

