import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import {WatermarkedImg}
import { Watermark } from 'antd';

// import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import WatermarkedImg from './WatermarkedImg';
import { width } from '@mui/system';



function ImgSlide() {

    return (
        <>

            {/* <Watermark content="Ant Design">
                <div></div>
            </Watermark>
            <img src="ares.png"></img> */}
            {/* <div><WatermarkedImg src="monlan.png" content="ลายนั้ม" /></div> */}



            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    {/* <Watermark content="Ant Design"> */}
                    {/* <img src="monlan.png"></img> */}
                    {/* </Watermark> */}
                    {/* <div className="watermark-container">
                        <WatermarkedImg src="monlan.png" content="ลายนั้ม"></WatermarkedImg>
                    </div> */}

                    <WatermarkedImg src="monlan.png" id="0681498" />
                </SwiperSlide>
                <SwiperSlide>
                    <WatermarkedImg src="Ares.png" id="35414451" />
                </SwiperSlide>
                <SwiperSlide>
                    <WatermarkedImg src="f-b.png" id="251131365416" />
                </SwiperSlide>
                



            </Swiper>
        </>
    );
}

export default ImgSlide;