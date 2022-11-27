import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { sharedContext } from '../../context/UserContext';

const MyBuyers = () => {
    const {user} = useContext(sharedContext);
    // const [sellerId, setSellerId] = useState('');
    const {data:myBuyers=[]} = useQuery({
        queryKey:['MyBuyersList'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/seller/my-buyers?email=${user?.email}`, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            return data;
        }
    })
    return (
        <div>
        {
            myBuyers.length > 0 ?
            <div className="overflow-x-auto">
            <table className="table w-[95%] min-w-fit">
            <thead>
                <tr className="">
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {myBuyers?.map((buyer, index) => (
                <tr key={index}>
                    <th>{index+1}</th>
                    <td>{buyer.buyerName}</td>
                    <td>{buyer.buyerEmail}</td>
                    <td>{buyer.buyerPhone}</td>
                    <td>{buyer.location}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        :
        <h3 className='text-center py-10'>Sorry! No Buyers Booked Your products yet.</h3> 
        }
        </div>
    );
};

export default MyBuyers;