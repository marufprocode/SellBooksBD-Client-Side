import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { MdOutlineFavoriteBorder, MdVerified } from 'react-icons/md';

const CategoryBooks = () => {
    const books = useLoaderData();
    return (
        <section data-aos="fade-left">
            <h4 className='font-bold font-ubuntu mt-10 px-24'>Books Category {'>>'} {books[0]?.category}</h4>
            <div className='px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center my-8'>
                {
                    books?.map(book => (
                        <Link key={book._id} className='relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl bg-slate-100' data-aos="zoom-in">
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
                            <p className='text-sm tracking-wide flex items-center gap-1 font-bold text-gray-600 font-poppins'>Name: {book.sellerName} <MdVerified className='text-blue-600'/></p>
                            <p className='text-sm tracking-wide'>Location: {book.location}</p>
                            </div>
                            <div className="w-full absolute inset-0 transition-opacity duration-200 bg-black bg-opacity-25 opacity-0 hover:opacity-100">
                                <div className="flex justify-between mt-72 px-1 bg-white py-2">
                                    <button className="px-2 btn-accent py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">Book Now</button>
                                    <button className='flex btn btn-accent btn-xs items-center text-sm tracking-wide'>Wishlist: <MdOutlineFavoriteBorder/></button>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};

export default CategoryBooks;