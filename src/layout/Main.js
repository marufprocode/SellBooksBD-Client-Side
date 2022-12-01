import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const Main = () => {
    const [hideNav, setHideNav] = useState(false);
    return (
        <div onScroll={()=>setHideNav(!hideNav)}>
            <div className='pb-16'>
            <Header/>
            </div>
            <div className='min-h-screen'>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;