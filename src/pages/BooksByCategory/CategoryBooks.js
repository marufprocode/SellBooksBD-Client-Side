import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineFavoriteBorder, MdVerified } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { sharedContext } from '../../context/UserContext';
import useUserRole from '../../hook/useUserRole';
import BookingModal from './BookingModal';

const CategoryBooks = () => {
    const [book, setBook] = useState(null);
    const {user} = useContext(sharedContext);  
    const [userRole]=useUserRole(user?.email)
    const {id} = useParams();
    const {data:books=[], refetch} = useQuery({
        queryKey:['booksCollection'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/category/${id}`);
            return response.data;
        }
    })

    const handleAddtoWishList = (book) => {
        const data = {
            bookId : book._id,
            bookName : book.bookName,
            price : book.resellPrice,
            image: book.image,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            category_id: id,
        }
        if (userRole !== 'User') return toast.error('Please Login from a buyer account');
        axios.post('https://sellbooks-second-hand-books-selling-website.vercel.app/addto-wishlist', data)
        .then(res => {
            console.log(res);
            if(res.data.insertedId){
                toast.success('Successfully Added to the wishlist');
            }
            if(res.data.message){
                toast(res.data.message, {
                    icon: '👏',
                  });                  
            }
        }).catch(err => console.error('[error:]', err));
    }
    
    return (
        <section data-aos="fade-left">
            <h4 className='font-bold font-ubuntu mt-10 px-24'>Books Category {'>>'} {books[0]?.category}</h4>
            <div className='px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center my-8 gap-y-10'>
                {
                    books?.map(book => (
                        <div key={book._id} className='cursor-pointer relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl bg-slate-100'>
                        <div className='max-w-full w-[270px]'>
                            <img
                            className='object-center w-full h-56 md:h-64 xl:h-80'
                            src={book.image}
                            alt=''
                            />
                            <div className='pr-5 pt-2 pl-1'>
                            <p className='text-lg font-bold whitespace-pre-line'>{book.bookName}</p>
                            <p className='text-sm tracking-wide font-bold text-gray-500'>{book.authorName}</p>
                            <p className='text-sm tracking-wide'>Original Price: ${book.originalPrice}</p>
                            <p className='text-sm tracking-wide'>Offer Price: ${book.resellPrice}</p>
                            <p className='text-sm tracking-wide'>Used Time: {book.usedTime}</p>
                            <p className='text-sm tracking-wide'>Condition: {book.condition}</p>
                            <p className='text-sm tracking-wide'>Posted on: {book.postDate}</p>
                            <p className='text-sm tracking-wide font-bold'>Seller Info:</p>
                            <p className='text-sm tracking-wide flex items-center gap-1 font-bold text-gray-600 font-poppins'>Name: {book.sellerName} {book.verified? <MdVerified className='text-blue-600'/>:""}</p>
                            <p className='text-sm tracking-wide'>Contact No: {book.phone}</p>
                            <p className='text-sm tracking-wide'>Location: {book.location}</p>
                            </div>
                            <div className="w-full absolute inset-0 transition-opacity duration-200 bg-black bg-opacity-25 opacity-0 hover:opacity-100">
                                <div className="flex justify-between mt-72 px-1 bg-white py-2">
                                    <label htmlFor="bookingModal" className="px-2 btn btn-xs" onClick={()=>setBook(book)} disabled={book.isBooked}>{book?.isBooked?"Booked":"Book Now"}</label>
                                    <button className='flex btn btn-accent btn-xs items-center text-sm tracking-wide' onClick={()=> handleAddtoWishList(book)}>Wishlist: <MdOutlineFavoriteBorder/></button>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>
            <BookingModal
            book={book}
            refetch={refetch}
            />
        </section>
    );
};

export default CategoryBooks;