import React from 'react';
import { FaShippingFast, FaWallet } from 'react-icons/fa';
import { RiRefund2Fill } from 'react-icons/ri';

const Facility = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center py-10 gap-3 px-5'>
            <div className='px-10 py-5 flex gap-3 shadow-lg items-center w-[400px] max-w-full bg-slate-50'>
                <FaShippingFast className='w-10 h-10'/>
                <div>
                    <h5>Free Shipping Item</h5>
                    <p>Free shipping offered by seller</p>
                </div>
            </div>
            <div className='px-10 py-5 flex gap-3 shadow-lg items-center w-[400px] max-w-full bg-slate-50'>
                <FaWallet className='w-10 h-10'/>
                <div>
                    <h5>Money back guarante</h5>
                    <p>100% Money back guarante</p>
                </div>
            </div>
            <div className='px-10 py-5 flex gap-3 shadow-lg items-center w-[400px] max-w-full bg-slate-50'>
                <RiRefund2Fill className='w-10 h-10'/>
                <div>
                    <h5>Use SeelBooks Gems</h5>
                    <p>For purchase over $100</p>
                </div>
            </div>
        </section>
    );
};

export default Facility;