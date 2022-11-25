import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Link } from "react-router-dom";
import getImgUrl from "../../callApi/GetImageURL";
import { sharedContext } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const { createNewUser, updateUserProfile } = useContext(sharedContext);
  const [signUpProcessing, setSignUpProcessing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const userImage = watch("image");
  const password = watch("password");
  const handleCreateAccount = (data) => {
    console.log(data.image[0]);
    setSignUpProcessing(true);
    getImgUrl(data.image[0])
    .then(res => {
        if(res.data.url){
        data["image"]=(res.data.url);
        createNewUser(data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const newUser = {
                name: data.name,
                email: data.email,
                role: data.userRole,
                uid: user?.uid,
            }
            if(user?.uid){
                updateUserProfile(data.name, data.image)
                .then(() => {
                    // Profile updated!
                  }).catch((error) => {
                    console.error('An error occured while updating profile');
                  });
                axios.post('http://localhost:5000/users', newUser)
                .then(res => console.log(res))
                .catch(err => console.error('[error]:',err))
                toast.success('User Has Been Created Successfully');
                reset();
                setSignUpProcessing(false);
            }
          })
          .catch((error) => {
            setSignUpError(error.message)
            reset();
            setSignUpProcessing(false)
          });    
        }
    }).catch(err => console.log(err))
  };
  return (
    <div
      data-aos="fade-left"
      className="min-h-screen bg-[url('/src/assets/images/LoginImage.png')] bg-cover flex"
    >
      <div className="w-[50%]"></div>
      <div className="w-[50%] min-h-screen bg-white flex items-center justify-center">
        <div className="w-full h-fit max-w-md p-8 space-y-3 text-gray-700 mt-10">
          <h1 className="text-2xl font-bold text-center">
            Create Your Account
          </h1>
          <p className="text-sm text-center sm:px-6 text-gray-500">
            Already have an account?
            <Link to="/login" className="underline text-gray-900">
              Login Here
            </Link>
          </p>
          <form
            onSubmit={handleSubmit(handleCreateAccount)}
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
                className="w-full px-4 py-3 border-gray-700 bg-gray-200 text-gray-700 focus:border-violet-400"
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
                className="w-full px-4 py-3 border-gray-700 bg-gray-200 text-gray-700 focus:border-violet-400"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="userRole" className="block text-gray-500">
                Please Select Your Account Type!
              </label>
              <select
                defaultValue="User"
                className="select select-bordered w-full bg-gray-200"
                {...register("userRole")}
              >
                <option>User</option>
                <option>Seller</option>
              </select>
            </div>
            <div className="space-y-1 text-sm relative">
              <label htmlFor="password" className="block text-gray-500">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                {...register("password", {
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                    message:
                      "Password should be minimum eight characters, at least one letter and one number",
                  },
                })}
                placeholder="Password"
                className="w-full px-4 py-3  border-gray-700 bg-gray-200 text-gray-700 focus:border-violet-400"
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
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Password Doesn't Match",
                })}
                placeholder="Password"
                className="w-full px-4 py-3  border-gray-700 bg-gray-200 text-gray-700 focus:border-violet-400"
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
            <div>
              {errors.password?.message && (
                <p className="text-red-600">
                  <span className="font-bold">Error:</span>
                  {errors.password?.message}
                </p>
              )}
              {errors.confirmPassword?.message && (
                <p className="text-red-600">
                  <span className="font-bold">Error:</span>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <div
              type="file"
              className="w-full mt-5 flex flex-col justify-center items-center border border-dashed py-5 "
            >
              <label
                htmlFor="file"
                className="text-sm text-gray-400 cursor-pointer w-full flex flex-col items-center"
              >
                Choose Photo
                <HiOutlinePhotograph className="w-6 h-6 text-gray-400" />
                {userImage && (
                  <p className="text-gray-800">{userImage[0]?.name}</p>
                )}
              </label>
              <input
                type="file"
                id="file"
                {...register("image", {
                  required: "Photo is Required",
                })}
                className="input input-bordered w-full max-w-xs hidden"
              />
            </div>
            {errors?.image?.message && (
              <p className="text-red-600">
                <span className="font-bold">Error:</span>
                {errors?.image?.message}
              </p>
            )}
            <button
              disabled={signUpProcessing}
              className="flex justify-center w-full p-3 text-center font-bold text-white bg-primary"
            >
              {signUpProcessing ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
