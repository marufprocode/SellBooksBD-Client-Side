import React from 'react';
import AdvertiseSec from './AdvertiseSec';
import CategoriesSec from './CategoriesSec';
import Facility from './Facility';
import HeroCarousel from './HeroCarousel';

const Home = () => {
    return (
        <div className='h-[80%]'>
            <div className=''>
            <HeroCarousel/>
            </div>
            <Facility/>
            <CategoriesSec/>
            <AdvertiseSec/>
        </div>
    );
};

export default Home;