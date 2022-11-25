import React from "react";
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import bookCover from "../../assets/images/BookSlider1.jpg"
import bookCover2 from '../../assets/images/reading-challenge-hero.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

const HeroCarousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="w-full h-full relative">
                <img src={bookCover} alt="bokkCover" className="absolute top-0 left-0 z-[-1] opacity-30 md:opacity-100"/>
                <div className="flex flex-col h-full justify-center px-5 md:pl-10 md:pr-0 md:w-1/2">
                    <div>
                    <p><span className="text-4xl font-blackHan text-sky-800">Don't Store your knowledge</span> <br /> <span className="text-3xl font-blackHan text-gray-600">in your Bookself</span></p>
                    </div>
                    <div>
                    <p className="font-payTone text-xl text-gray-600"><span className="text-sky-700">SellBooks</span> is the largest book reselling platform in Bangladesh. Sell your old books and buy one from others.</p>
                    <button className="btn btn-md btn-info mt-3">Join us as a seller</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="w-full h-full relative">
                <img src={bookCover2} alt="bokkCover" className="absolute top-0 left-0 z-[-1] opacity-30 md:opacity-100 object-cover"/>
                <div className="flex flex-col h-full justify-center px-5 md:pl-10 md:pr-0 md:w-1/2">
                    <div>
                    <p><span className="text-4xl font-blackHan text-sky-800">Join us with us as a seller</span> <br /> <span className="text-3xl font-blackHan text-gray-600">to sell your old Books</span></p>
                    </div>
                    <div>
                    <p className="font-payTone text-xl text-gray-600"><span className="text-sky-700">SellBooks</span> is the largest book reselling platform in Bangladesh. Sell your old books and buy one from others.</p>
                    <button className="btn btn-md btn-info mt-3">Join us as a seller</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroCarousel;
