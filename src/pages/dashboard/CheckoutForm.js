import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ bookingData }) => {
  const {
    bookId,
    bookName,
    buyerEmail,
    buyerName,
    image,
    price,
    _id,
    // buyerPhone,
  } = bookingData;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setpaymentSuccess] = useState(false);
  const [transactionID, settransactionID] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post(
        "https://sellbooks-second-hand-books-selling-website.vercel.app/create-payment-intent",
        { price },
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error("[error]", err));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
        return;
      }
    const card = elements.getElement(CardElement);

    if (card == null) {
        return;
      }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
    });
  
    if (error) {
        console.log('[error]', error);
        setCardError(error.message);
    } else {
        console.log('[PaymentMethod]', paymentMethod);
        setCardError(false);
    }
    setpaymentSuccess(false);
    setPaymentProcessing(true);
    const { paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    name: buyerName,
                    email: buyerEmail,
                }
            }
        }
      );
    if (confirmError){
        setCardError(confirmError.message);
        return;
    } 
    if (paymentIntent.status === "succeeded"){
        const payment = {
            bookingId: _id,
            buyerName,
            bookId,
            price,
            buyerEmail,
            transactionID: paymentIntent.id,
        }
        axios.post('https://sellbooks-second-hand-books-selling-website.vercel.app/payments', payment)
        .then(res => {
            if(res.data.insertedId){
                setpaymentSuccess('Congrats! Your Payment Completed.')
                settransactionID(paymentIntent.id);
            }
        })
        .catch(err => console.log('[error]:', err))
    }
    setPaymentProcessing(false);

}

  return (
    <div className="flex justify-center items-center">
      <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          <div className="flex justify-start flex-col items-start space-y-2">
            <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
              <svg
                className=""
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91681 7H11.0835"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7L5.25014 9.33333"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7.00002L5.25014 4.66669"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm leading-none">Back</p>
            </button>
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Checkout
            </p>
            <p className="text-base leading-normal sm:leading-4 text-gray-600">
              Home {">"} Dashboard {">"} MyOrers {">"} Payment {">"} Checkout
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 2xl:w-full">
              <div className="flex flex-col justify-start items-start w-full space-y-4">
                <p className="text-xl md:text-2xl leading-normal text-gray-800">
                  {bookName}
                </p>
                <p className="text-base font-semibold leading-none text-gray-600">
                  ${price}
                </p>
              </div>
              <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                <img src={image} alt="headphones" />
              </div>
            </div>

            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="email"
                  defaultValue={buyerName}
                  disabled
                />
              </div>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="email"
                  defaultValue={buyerEmail}
                  disabled
                />
              </div>

              <form onSubmit={handleSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                {cardError && (
                  <p className="text-red-600 mt-2">
                    <strong>Error:</strong>
                    {cardError}
                  </p>
                )}
                {paymentSuccess && (
                  <div>
                    <p className="text-green-600">{paymentSuccess}</p>
                    <p>
                      <strong>Your Transaction ID:</strong> {transactionID}
                    </p>
                  </div>
                )}
                  <button
                    className=" mt-5 py-0 my-0 btn-sm w-full btn cursor-pointer h-full px-5 text-white font-bold font-ubuntu"
                    type="submit"
                    disabled={
                      !stripe ||
                      !clientSecret ||
                      paymentProcessing ||
                      paymentSuccess
                    }
                  >
                    {paymentSuccess ? "Paid" : "Pay"}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
