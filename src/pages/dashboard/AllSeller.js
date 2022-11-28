import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from "react-hot-toast";
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { sharedContext } from '../../context/UserContext';

const AllSeller = () => {
    const {user} = useContext(sharedContext);
    const [sellerId, setSellerId] = useState('');
    const {data:sellers=[], refetch} = useQuery({
        queryKey:['SellersList'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/all-sellers/Seller?email=${user?.email}`, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            return data;
        }
    })

    const verifySeller = (id) => {
        axios.patch(`https://sellbooks-second-hand-books-selling-website.vercel.app/verify-seller/${id}?email=${user?.email}`, {verified:true}, {
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if(res.data.modifiedCount){
                refetch();
                toast.success('Seller verification done!')
            }
        })
        .catch(err => console.error('[error:]'))
    }
    console.log(sellerId);
    const deleteSeller = (id) => {
        axios.delete(`https://sellbooks-second-hand-books-selling-website.vercel.app/delete-user/${id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.deletedCount){
                refetch();
                toast.success('User deleted successfully');
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
        <div className="overflow-x-auto">
            <table className="table w-[95%] min-w-fit">
            <thead>
                <tr className="">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {sellers?.map((usr, index) => (
                <tr key={index}>
                    <th>{index+1}</th>
                    <td>{usr.name}</td>
                    <td>{usr.email}</td>
                    <td>{usr.verified? <button className='btn btn-xs capitalize btn-accent'>Verified</button>:<label htmlFor="confirmation-modal-verifySeller" className="btn btn-xs capitalize btn-error" onClick={()=>setSellerId(usr.uid)}>Unverified</label>}</td>
                    <td><label htmlFor="confirmation-modal-delete" className='btn btn-xs btn-error capitalize' onClick={()=>setSellerId(usr.uid)}>Delete</label></td>
                </tr>
                ))}
            </tbody>
            </table>
            <ConfirmationModal
            modalName="confirmation-modal-verifySeller"
            confirmationHeading="Are your sure you want to verify this seller?" 
            ConfirmationText="" 
            modalActionFn={()=>verifySeller(sellerId)}
            />
            <ConfirmationModal
            modalName="confirmation-modal-delete"
            confirmationHeading="Are your sure you want to delete this seller?" 
            ConfirmationText="Make sure after deleted this seller it cannot be undo!" 
            modalActionFn={()=> deleteSeller(sellerId)}
            />
        </div>
        </div>
    );
};

export default AllSeller;