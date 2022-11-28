import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const PassResetModal = () => {
    // const {resetUserPassword} = useContext(sharedContext);
  const {register, handleSubmit, reset, formState: { errors }} = useForm();
  const navigate = useNavigate();

  const handleResetPass = (data) => {
    reset();
    navigate('/home');
  };
  if (errors.keys) {
    console.log(errors);
  }
  return (
    <>
      <input type="checkbox" id="resetPassModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="resetPassModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Reset Password</h3>
          <p className="py-4">
            Provide your user email, we will send you password reset link.
          </p>
          <form onSubmit={handleSubmit(handleResetPass)}>
            <input
              type="email"
              name="email"
              required
              {...register("email")}
              placeholder="Your User Email"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-300 text-gray-700 focus:border-violet-400"
            />
            <button
              className="mt-3 w-full bg-primary py-3 rounded-lg font-bold text-white"
              type="submit"
              htmlFor="resetPassModal"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PassResetModal;
