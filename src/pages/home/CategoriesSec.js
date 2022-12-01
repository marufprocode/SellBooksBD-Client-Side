import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RotatingSquare } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import './home.css';
const CategoriesSec = () => {
    const {data: categories=[], isLoading, refetch} = useQuery({
        queryKey:['productCategories'],
        queryFn: async () => {
            const response = await fetch("https://sellbooks-second-hand-books-selling-website.vercel.app/product-categories");
            const data = await response.json();
            if(!data.length){
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
      <div className="mt-8">
        <h3 className="font-bold font-payTone text-center mb-7">Books Categories</h3>
        <div className='px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center'>
            {
              categories?.length > 0 &&
              categories?.map((category) => (
                <Link to={`/category/${category.category_id}`} key={category._id} className="card w-full h-[150px] shadow-2xl image-full category-card" data-aos="zoom-in">
                    <figure>
                    <img src={category?.categoryImage} alt="BooksImage" className='w-full object-cover'/>
                    </figure>
                    <div className="card-body">
                    <h3 className="font-bold font-opnSans">{category.category}</h3>
                    </div>
                </Link>
                )) 
            }
        </div>
        
      </div>
    );
};

export default CategoriesSec;