import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const Main = () => {
    return (
        <div>
            <div className='mb-12'>
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