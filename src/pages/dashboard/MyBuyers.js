import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { RotatingSquare } from 'react-loader-spinner';
import { sharedContext } from '../../context/UserContext';

const MyBuyers = () => {
    const {user} = useContext(sharedContext);
    // const [sellerId, setSellerId] = useState('');
    const {data:myBuyers=[], isLoading, refetch} = useQuery({
        queryKey:['MyBuyersList'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/seller/my-buyers?email=${user?.email}`, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            if(!data){
                refetch();
            }
            return data;
        }
    })

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