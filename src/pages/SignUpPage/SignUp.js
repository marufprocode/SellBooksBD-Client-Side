import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [signUpError, setSignUpError] = useState(false);
    const {register, handleSubmit, reset, watch, formState: { errors }} = useForm();
    const userImage = watch('image');
    console.log();
    const handleLogin = (data) => {
        console.log(data);
        console.log(data.image);
    }
  return (
    <div
      data-aos="fade-left"
      className="min-h-screen bg-[url('/src/assets/images/LoginImage.png')] bg-cover flex"
    >
      <div className="w-[50%]"></div>
      <div className="w-[50%] h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-3 text-gray-700 mt-10">
          <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                {...register("name")}
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border-gray-700 bg-gray-300 text-gray-700 focus:border-violet-400"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                {...register("email")}
                placeholder="Your Email"
                className="w-full px-4 py-3 border-gray-700 bg-gray-300 text-gray-700 focus:border-violet-400"
              />
            </div>
            <div className="space-y-1 text-sm relative">
              <label htmlFor="password" className="block text-gray-500">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                {...register("password")}
                placeholder="Password"
                className="w-full px-4 py-3  border-gray-700 bg-gray-300 text-gray-700 focus:border-violet-400"
              />
              <div className="absolute bottom-3 right-3">
                {showPass ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPass(!showPass)}
                    className="h-5 w-5 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPass(!showPass)}
                    className="h-5 w-5 cursor-pointer"
                  />
                )}
              </div>
              <div className="justify-end text-xs hidden text-gray-500">
                <label htmlFor="resetPassModal" className="cursor-pointer">
                  Forgot Password?
                </label>
              </div>
            </div>
            <div className="space-y-1 text-sm relative">
              <label htmlFor="password" className="block text-gray-500">
               Confirm Password
              </label>
              <input
                type={showPass2 ? "text" : "password"}
                name="confirmPassword"
                required
                {...register("confirmPassword")}
                placeholder="Password"
                className="w-full px-4 py-3  border-gray-700 bg-gray-300 text-gray-700 focus:border-violet-400"
              />
              <div className="absolute bottom-3 right-3">
                {showPass2 ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPass2(!showPass2)}
                    className="h-5 w-5 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPass2(!showPass2)}
                    className="h-5 w-5 cursor-pointer"
                  />
                )}
              </div>
              <div className="hidden justify-end text-xs text-gray-500">
                <label htmlFor="resetPassModal" className="cursor-pointer">
                  Forgot Password?
                </label>
              </div>
            </div>
            {signUpError && (
              <p className="text-red-600">
                <span className="font-bold">Error: </span>
                {signUpError}
              </p>
            )}
            <div
            type="file"
            className="w-full mt-5 flex flex-col justify-center items-center border border-dashed py-5 "
          >
            <label
            htmlFor='file'
            className="text-sm text-gray-400 cursor-pointer w-full flex flex-col items-center"
            >
              Choose Photo
              <HiOutlinePhotograph className="w-6 h-6 text-gray-400" />
              {
                userImage &&
                <p className="text-gray-800">{userImage[0]?.name}</p>
              }
            </label>
            <input
              type="file"
              id='file'
              {...register("image", {
                required: "Photo is Required",
              })}
              className="input input-bordered w-full max-w-xs hidden"
            />
          </div>
            <button className="block w-full p-3 text-center font-bold text-white bg-primary">
              Create Account
            </button>
          </form>
          <p className="text-xs text-center sm:px-6 text-gray-500">
            Already have an account?
            <Link to="/login" className="underline text-gray-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
