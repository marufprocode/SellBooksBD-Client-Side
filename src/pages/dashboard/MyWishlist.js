import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { sharedContext } from "../../context/UserContext";

const MyWishlist = () => {
  const { user } = useContext(sharedContext);
  const { data: myWishlist = [] } = useQuery({
    // enabled: !!user?.email,
    queryKey: ["MyWishList"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/mywishlist?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.data;
      return data;
    },
  });
  console.log(myWishlist);
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
                    <button className="btn btn-sm btn-accent">Pay Now</button>
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
