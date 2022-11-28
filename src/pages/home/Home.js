import React from 'react';
import AdvertiseSec from './AdvertiseSec';
import CategoriesSec from './CategoriesSec';
import Facility from './Facility';
import HeroCarousel from './HeroCarousel';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div className='h-[80%]'>
            <div className='' data-aos="fade-right">
            <div className=''>
            <HeroCarousel/>
            </div>
            <Facility/>
            <CategoriesSec/>
            <AdvertiseSec/>
            <Testimonials/>
            </div>
        </div>
    );
};

export default Home;