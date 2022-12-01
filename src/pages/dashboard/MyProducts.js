import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { RotatingSquare } from 'react-loader-spinner';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { sharedContext } from '../../context/UserContext';

const MyProducts = () => {
    const {user} = useContext(sharedContext);
    const [advertiseItem, setAdvertiseItem] = useState("");
    const [deleteBookId, setDeleteBookId] = useState("");
    const {data:myProducts=[], refetch, isLoading}=useQuery({
        queryKey:['MyProducts'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/my-products?email=${user?.email}`, {
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

    const advertiseProduct = () => {
        const product = {
            product_id: advertiseItem._id,
            productName:advertiseItem.bookName
        }
        axios.patch(`https://sellbooks-second-hand-books-selling-website.vercel.app/advertise?email=${user?.email}`, product, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            console.log(res)
            if(res.data.modifiedCount){
                toast.success('Advertise Successfully')
                refetch();
            }
        }).catch(err => console.error('[error:]', err))
    }

    const handleDeleteProduct = (bookId) => {
        axios.delete(`https://sellbooks-second-hand-books-selling-website.vercel.app/delete-product/${bookId}?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if(res.data.deletedCount){
                toast.success('Product deleted successfully')
                refetch();
            }
        }).catch(err => console.error('[error:]', err))
    }

    return (
        <div className="px-5">
      {
        myProducts.length > 0 ?
        <div className="overflow-x-auto">
            <table className="table w-[95%] min-w-fit">
            <thead>
                <tr className="">
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Advertise</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {myProducts?.map((product, index) => (
                <tr key={index}>
                    <th>{index+1}</th>
                    <td><img src={product.image} className="h-32" alt="OrderImage"/></td>
                    <td><p className="w-[150px] whitespace-pre-line">{product.bookName}</p></td>
                    <td>${product.resellPrice}</td>
                    <td>{product.isPaid?"Sold Out":product.isBooked?"Booked":"Available"}</td>
                    <td><label htmlFor="advertise-confirm-modal" disabled={product.isPaid || product.advertised} className="btn btn-sm btn-accent" onClick={()=> setAdvertiseItem(product)}>{product.isPaid? "Sold Out": product.advertised? "advertised":"adversite"}</label></td>
                    <td><label htmlFor="delete-product-confirm-modal" className="btn btn-sm btn-error" onClick={()=>setDeleteBookId(product._id)}>Delete</label></td>
                </tr>
                ))}
            </tbody>
            </table>
            <ConfirmationModal
            modalName="advertise-confirm-modal" 
            confirmationHeading="Are you confirm to advertise this Product?" 
            ConfirmationText="After advertisement it will show to home page on the advertise section" 
            modalActionFn={advertiseProduct}
            />
            <ConfirmationModal
            modalName="delete-product-confirm-modal" 
            confirmationHeading="Are you confirm you want to delete this Product?" 
            ConfirmationText="After deleted all of the bookings with this product will be cancelled." 
            modalActionFn={()=>handleDeleteProduct(deleteBookId)}
            />
        </div>
        :
        <h3 className="text-center py-10">Sorry! You Haven't Added any Product Yet</h3>
      }
    </div>
    );
};

export default MyProducts;