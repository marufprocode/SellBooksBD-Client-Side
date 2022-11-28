import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";

const MyOrders = () => {
    const {user}= useContext(sharedContext);
    const {data:myOrders=[]} = useQuery({
        queryKey:['myOrders'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/my-orders?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            return data;
        }
    })
  return (
    <div className="px-5">
      {
        myOrders.length > 0 ?
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
                {myOrders?.map((order, index) => (
                <tr key={index}>
                    <th>{index+1}</th>
                    <td><img src={order.image} className="h-32" alt="OrderImage"/></td>
                    <td><p className="w-[150px] whitespace-pre-line">{order.itemName}</p></td>
                    <td>${order.price}</td>
                    <td>{order.paymentStatus === 'Paid'? <button className="btn btn-sm btn-disabled">Paid</button>:<Link to={`/dashboard/payment/${order?._id}`} className="btn btn-sm btn-accent">Pay Now</Link> }</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        :
        <h3 className="text-center py-10">Sorry! You Have no orders</h3>
      }
    </div>
  );
};

export default MyOrders;
