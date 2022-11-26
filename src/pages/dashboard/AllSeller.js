import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { sharedContext } from '../../context/UserContext';

const AllSeller = () => {
    const {user} = useContext(sharedContext);
    const {data:sellers=[]} = useQuery({
        queryKey:['SellersList'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/all-sellers/Seller?email=${user?.email}`, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            return data;
        }
    })
    console.log(sellers);
    return (
        <div>
        <div className="overflow-x-auto">
            <table className="table w-[95%] min-w-fit">
            <thead>
                <tr className="">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {sellers?.map((usr, index) => (
                <tr key={index}>
                    <th>{index+1}</th>
                    <td>{usr.name}</td>
                    <td>{usr.email}</td>
                    <td>{usr.role? usr.role:"User"}</td>
                    <td>{usr.role? "":<><span className="btn btn-xs btn-warning mr-2">Make Admin</span><span className="btn btn-xs btn-error">Delete</span></>}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default AllSeller;