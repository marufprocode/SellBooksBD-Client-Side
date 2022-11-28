import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/images/error-404-cutout.png"

const ErrorPage = () => {
    const error = useRouteError();
  return (
    <section className="flex items-center h-full px-12 bg-teal-50 min-h-screen">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <img src={errorImg} alt="errorImage"/>
          <p className="text-2xl md:text-2xl font-bold font-opnSans mt-3">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-600 text-lg font-payTone">
            {error.statusText || error.message}
          </p>
          <Link
            to="/home"
            className="px-5 py-3 font-semibold rounded btn-primary"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
