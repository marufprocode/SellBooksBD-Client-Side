import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { RotatingSquare } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";

const MyWishlist = () => {
  const { user } = useContext(sharedContext);
  const { data: myWishlist = [], isLoading, refetch } = useQuery({
    // enabled: !!user?.email,
    queryKey: ["MyWishList"],
    queryFn: async () => {
      const res = await axios.get(
        `https://sellbooks-second-hand-books-selling-website.vercel.app/mywishlist?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.data;
      if(!data){
        refetch();
      }
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center">
        <RotatingSquare
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="rotating-square-loading"
          strokeWidth="4"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );


  return (
    <div className="px-5">
      {myWishlist.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-[95%] min-w-fit">
            <thead>
              <tr className="">
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myWishlist?.map((order, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <img src={order.image} className="h-32" alt="OrderImage" />
                  </td>
                  <td>
                    <p className="w-[150px] whitespace-pre-line">
                      {order.bookName}
                    </p>
                  </td>
                  <td>${order.price}</td>
                  <td>
                  {order.paid? <button className="btn btn-sm btn-disabled">Paid</button>:<Link to={`/dashboard/payment/${order?._id}`} className="btn btn-sm btn-accent">Pay Now</Link> }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-center py-10">Sorry! No Products found in your wishlist</h3>
      )}
    </div>
  );
};

export default MyWishlist;
