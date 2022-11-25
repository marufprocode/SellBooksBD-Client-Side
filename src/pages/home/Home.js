import React from 'react';
import Facility from './Facility';
import HeroCarousel from './HeroCarousel';

const Home = () => {
    return (
        <div className='h-[80%]'>
            <div className=''>
            <HeroCarousel/>
            </div>
            <Facility/>
        </div>
    );
};

export default Home;