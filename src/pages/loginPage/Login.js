import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PassResetModal from "./PassResetModal";
import { sharedContext } from "../../context/UserContext";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [loginError, setLoginError] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {loading, googleSignIn, userLogin}= useContext(sharedContext);
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    if (loading)
      return (
        <div className="min-h-screen flex justify-center items-center">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      );


    const handleLogin = (data) => {
        userLogin(data.email, data.password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user.uid){
                reset()
                navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            console.error("error", error);
            setLoginError(error.code);
          });
        
    }

    if(errors){
        console.log(errors);
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const newUser = {
                name: user?.displayName,
                email: user?.email,
                role: 'User',
                uid: user?.uid,
            }
            if (user) {
                axios.post('http://localhost:5000/users', newUser)
                .then(res => console.log(res))
                .catch(err => console.error('[error]:',err))
                navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            console.error("error", error);
            setLoginError(error.message);
          });
    }

  return (
    <div>
      <div data-aos="fade-right" className="min-h-screen bg-[url('/src/assets/images/LoginImage.png')] bg-cover flex">
      <div className="h-screen w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-3  text-gray-700">
          <h1 className="text-2xl font-bold text-center">Please Login</h1>
          <p className="text-sm text-center sm:px-6 text-gray-600">
            Don't have an account?
            <Link to="/signup" className="underline text-gray-900">
              Sign up here
            </Link>
          </p>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
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
                className="w-full px-4 py-3  border-gray-700 bg-gray-200 text-gray-700 focus:border-violet-400"
              />
              <div className="absolute bottom-8 right-3">
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
              <div className="flex justify-end text-xs text-gray-500">
                <label htmlFor="resetPassModal" className="cursor-pointer">
                  Forgot Password?
                </label>
              </div>
            </div>
            {loginError && (
              <p className="text-red-600">
                <span className="font-bold">Error: </span>
                {loginError}
              </p>
            )}
            <button className="block w-full p-3 text-center font-bold text-white bg-primary">
              Sign in
            </button>
          </form>
          <PassResetModal />
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
            <p className="px-3 text-sm text-gray-500">OR</p>
            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              aria-label="Login with Google"
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full p-4 space-x-4 hover:bg-primary border  focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
