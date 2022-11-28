import React from 'react';
import { useNavigation } from 'react-router-dom';
import AdvertiseSec from './AdvertiseSec';
import CategoriesSec from './CategoriesSec';
import Facility from './Facility';
import HeroCarousel from './HeroCarousel';
import Testimonials from './Testimonials';

const Home = () => {
    const navigation = useNavigation();
	if (navigation.state === "loading") return <div className='w-full flex justify-center mt-20'><progress className="progress w-56"></progress></div>
    return (
        <div className='h-[80%]'>
            <div className='' data-aos="fade-right">
            <div className=''>
            <HeroCarousel/>
            </div>
            <Facility/>
            <CategoriesSec/>
            <AdvertiseSec/>
            <div className='py-16'>
            <Testimonials/>
            </div>
            </div>
        </div>
    );
};

export default Home;