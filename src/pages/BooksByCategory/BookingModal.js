import axios from "axios";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { sharedContext } from "../../context/UserContext";
import useUserRole from "../../hook/useUserRole";

const BookingModal = ({ book, refetch }) => {
  const { user } = useContext(sharedContext);
  const [userRole] = useUserRole(user?.email);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const handleBooking = (data) => {
    data["buyerName"] = user?.displayName;
    data["buyerEmail"] = user?.email;
    data["itemName"] = book?.bookName;
    data["sellerId"] = book?.sellerId;
    data["bookingDate"] = format(new Date(), "PP");
    data["price"] = book?.resellPrice;
    data["bookId"] = book?._id;
    data["image"] = book?.image;
    data["paymentStatus"] = "Unpaid";
    axios
      .post(
        "https://sellbooks-second-hand-books-selling-website.vercel.app/bookings",
        data
      )
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Congratulations! Booking Successful.");
          refetch();
          reset();
        }
      })
      .catch((err) => console.error("[error:]", err));
  };
  // username, email, itemName, price, buyerPhone, buyerLocation,
  return (
    <>
      {/* The button to open modal */}
      {/* <label htmlFor="bookingModal" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      {userRole !== "User" ? (
        <>
          <input type="checkbox" id="bookingModal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Sorry! you have to login from a buyer account to purchase
                product
              </h3>
              <p className="py-4">
                Please Sign In from a buyer account to purchase product.
              </p>
              <div className="modal-action">
                <label htmlFor="bookingModal" className="btn">
                  Ok
                </label>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <input type="checkbox" id="bookingModal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="bookingModal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">
                <strong>Book Now: </strong>
                {book?.bookName}
              </h3>
              <div className="text-md font-ubuntu mt-2">
                <p>
                  <strong>Price:</strong> ${book?.resellPrice}
                </p>
              </div>
              <form onSubmit={handleSubmit(handleBooking)}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  {user?.displayName && (
                    <input
                      type="text"
                      disabled
                      required
                      defaultValue={user?.displayName}
                      {...register("buyerName")}
                      className="input input-md input-bordered w-full"
                    />
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Your Email</span>
                  </label>
                  {user?.email && (
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled
                      required
                      {...register("buyerEmail")}
                      className="input input-md input-bordered w-full"
                    />
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Your Contact No:</span>
                  </label>
                  <input
                    type="number"
                    required
                    {...register("buyerPhone", {
                      pattern: {
                        value: /^[0-9]{11,11}$/,
                        message: "Phone Number Should Contain 11 Digit",
                      },
                    })}
                    className="input input-md input-bordered w-full"
                  />
                </div>
                {errors?.buyerPhone?.message && (
                  <p className="text-red-500">
                    <span className="font-bold">Error: </span>
                    {errors.buyerPhone?.message}
                  </p>
                )}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Your Location:</span>
                  </label>
                  <input
                    type="text"
                    required
                    {...register("location")}
                    className="input input-md input-bordered w-full"
                  />
                </div>
                <button type="submit" className="btn btn-accent mt-3 w-full">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingModal;
