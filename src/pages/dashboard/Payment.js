import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const bookingData = useLoaderData();
    return (
        <div className="">
        <Elements stripe={stripePromise}>
          <CheckoutForm bookingData={bookingData}/>
        </Elements>
      </div>
    );
};

export default Payment;