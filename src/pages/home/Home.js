import React from 'react';
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
        </div>
    );
};

export default Home;