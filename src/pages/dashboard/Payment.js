import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const bookingData = useLoaderData();
    console.log(bookingData);
    return (
        <div>
            <h3>Pay From Here</h3>
        </div>
    );
};

export default Payment;