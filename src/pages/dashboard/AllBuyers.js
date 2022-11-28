import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from "react-hot-toast";
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { sharedContext } from '../../context/UserContext';


const AllBuyers = () => {
    const {user} = useContext(sharedContext);
    const [buyerEmail, setBuyerEmail] = useState('');
    const {data:allBuyers=[], refetch} = useQuery({
        queryKey:['AllBuyersList'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/admin/all-buyers?email=${user?.email}`, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            return data;
        }
    })
    
    const handleDeleteBuyer = (email) => {
        axios.delete(`https://sellbooks-second-hand-books-selling-website.vercel.app/admin/delete-buyer/${email}?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.deletedCount){
                toast.success('Buyer has been deleted successfully.');
                refetch();
            }
        }).catch(err => console.error('[error:]', err))
    }

    return (
        <div>
        {
            allBuyers.length > 0 ?
            <div className="overflow-x-auto">
            <table className="table w-[95%] min-w-fit">
            <thead>
                <tr className="">
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allBuyers?.map((buyer, index) => (
                <tr key={index}>
                    <th>{index+1}</th>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>
                    <td><label htmlFor="delete-buyer-confirmation-modal" className='btn btn-error btn-sm' onClick={()=>setBuyerEmail(buyer.email)}>Delete</label></td>
                </tr>
                ))}
            </tbody>
            </table>
            <ConfirmationModal
            modalName="delete-buyer-confirmation-modal"
            confirmationHeading="Are you sure you want to delete this buyer?"
            ConfirmationText="After deleted all of the bookings of this buyer will be cancelled and his user account will be deleted."
            modalActionFn={()=> handleDeleteBuyer(buyerEmail)}
            />
        </div>
        :
        <h3 className='text-center py-10'>Sorry! No Buyers Booked Your products yet.</h3> 
        }
        </div>
    );
};

export default AllBuyers;