import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./AdvCarousel.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { MdOutlineFavoriteBorder, MdVerified } from 'react-icons/md';

const AdvertiseSec = () => {
    const {data:advertisedItems=[]} = useQuery({
        queryKey:['advertisedItems'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/advertised-items')
            const data = response.data;
            return data;
        }
    })

    return (
        <>
        {
            advertisedItems.length > 0 ?
            <div className='flex w-full justify-center'>
            <div className='my-20 rounded-lg border px-10 flex flex-col justify-center overflow-hidden md:max-w-screen-md lg:max-w-screen-lg'>
            <h3 className='text-center mb-8 font-payTone'>Sellers Advertisement</h3>
            <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            navigation={true}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            modules={[Autoplay, Pagination, Navigation]}
            pagination={{
            clickable: true,
            }}    
            breakpoints={{
                640: {
                  slidesPerView: advertisedItems.length > 1? 2:1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: advertisedItems.length > 1? 3:1,
                  spaceBetween: 40,
                },
              }}                  
            className="mySwiper flex justify-center h-fit"
        >
           {advertisedItems &&
            advertisedItems?.map(book => (
                <SwiperSlide key={book._id} className="flex justify-center w-[400px]">
                    <div key={book._id} className='cursor-pointer relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl bg-slate-100'>
                        <div className='max-w-full w-[270px]'>
                            <img
                            className='object-center w-full h-56 md:h-64 xl:h-80'
                            src={book.image}
                            alt=''
                            />
                            <div className='pr-5 pt-2 pl-1'>
                            <p className='text-lg font-bold whitespace-pre-line'>{book.bookName}</p>
                            <p className='text-sm tracking-wide font-bold text-gray-500'>{book.authorName}</p>
                            <p className='text-sm tracking-wide'>Original Price: ${book.originalPrice}</p>
                            <p className='text-sm tracking-wide'>Offer Price: ${book.resellPrice}</p>
                            <p className='text-sm tracking-wide'>Used Time: {book.usedTime}</p>
                            <p className='text-sm tracking-wide'>Condition: {book.condition}</p>
                            <p className='text-sm tracking-wide'>Posted on: {book.postDate}</p>
                            <p className='text-sm tracking-wide font-bold'>Seller Info:</p>
                            <p className='text-sm tracking-wide flex items-center gap-1 font-bold text-gray-600 font-poppins'>Name: {book.sellerName} {book.verified? <MdVerified className='text-blue-600'/>:""}</p>
                            <p className='text-sm tracking-wide'>Contact No: {book.phone}</p>
                            <p className='text-sm tracking-wide'>Location: {book.location}</p>
                            </div>
                            <div className="w-full absolute inset-0 transition-opacity duration-200 bg-black bg-opacity-25 opacity-0 hover:opacity-100">
                                <div className="flex justify-between mt-72 px-1 bg-white py-2">
                                    <label htmlFor="bookingModal" className="px-2 btn btn-xs" /* onClick={()=>setBook(book)} */ disabled={book.isBooked}>{book?.isBooked?"Booked":"Book Now"}</label>
                                    <button className='flex btn btn-accent btn-xs items-center text-sm tracking-wide'>Wishlist: <MdOutlineFavoriteBorder/></button>
                                </div>
                            </div>
                        </div>
                        </div>
                </SwiperSlide>
            ))
           }
        </Swiper>
        </div>
        </div>
            :
        <></>
        }
        </>
    );
};

export default AdvertiseSec;