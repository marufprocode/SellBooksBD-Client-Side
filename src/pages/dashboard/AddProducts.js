import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RotatingLines } from "react-loader-spinner";
import getImgUrl from "../../callApi/GetImageURL";
import { sharedContext } from "../../context/UserContext";

const AddProducts = () => {
    const {user} = useContext(sharedContext);
    const [addProductProcessing, setAddProductProcessing] = useState(false);
  const {register, handleSubmit, reset, watch, formState: { errors }} = useForm();
    const productImage = watch('image')
  const {data:categories=[]} = useQuery({
    queryKey:['ProductCategories'],
    queryFn: async () => {
        const response = await axios.get('http://localhost:5000/product-categories')
        const data = response.data; 
        return data;
    }
  })
  const handleAddProduct = (data) => {
    setAddProductProcessing(true);
    data['sellerName'] = user?.displayName;
    data['postDate'] = format(new Date(), "PP");
    data['sellerEmail'] = user?.email;
    getImgUrl(data.image[0])
    .then(res => {
        if(res.data.url){
            data['image']=res.data.url;
            axios.post(`http://localhost:5000/add-products?email=${user?.email}`, data, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                if(res.data.insertedId){
                    reset();
                    setAddProductProcessing(false);
                    toast.success('Product successfully addeded!');
                }
            })
            .catch(err => {
                console.error('[error]:', err);
                setAddProductProcessing(false);
            })
        }
    })
  };

  if(errors){
    console.log(errors);
  }

  return (
    <div className="h-full" onSubmit={handleSubmit(handleAddProduct)}>
      <div className="pt-5">
        <form className="w-[550px] mx-5 max-w-full bg-white p-10 rounded-lg shadow-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Book Name</span>
            </label>
            <input
              type="text"
              required
              {...register("bookName")}
              placeholder="Type here"
              className="input input-sm input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Author Name</span>
            </label>
            <input
              type="text"
              required
              {...register("authorName")}
              placeholder="Type here"
              className="input input-sm input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Original Price</span>
            </label>
            <input
              type="number"
              required
              {...register("originalPrice")}
              placeholder="Type here"
              className="input input-sm input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Resell Price</span>
            </label>
            <input
              type="number"
              required
              {...register("resellPrice")}
              placeholder="Type here"
              className="input input-sm input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your uses time of this book</span>
            </label>
            <input
              type="text"
              required
              {...register("usedTime")}
              placeholder="Days/Month/Years of Use"
              className="input input-sm input-bordered w-full"
            />
          </div>
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <select
              defaultValue="Excellet"
              className="select select-sm select-bordered w-full"
              required
              {...register("condition")}
            >
              <option>Excellet</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Book Category</span>
            </label>
            {categories && (
              <select
                defaultValue="Please Select a Category"
                className="select select-sm select-bordered w-full"
                required
                {...register("category", {
                    required: true,
                    validate: (value) =>
                      value !== "Please Select a Category" || "Please Select a Category",
                  })}
              >
                <option disabled>Please Select a Category</option>
                {
                    categories.map(category => <option key={category._id}>{category.category}</option>)
                }
              </select>
            )}
            {errors?.category?.message && (
              <p className="text-red-500">
                <span className="font-bold">Error: </span>
                {errors.category?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="number"
              required
              {...register("phone", {pattern: {value: /^[0-9]{11,11}$/, message:'Phone Number Should Contain 11 Digit'}})}
              placeholder="Type here"
              className="input input-sm input-bordered w-full"
            />
            {errors?.phone?.message && (
              <p className="text-red-500">
                <span className="font-bold">Error: </span>
                {errors.phone?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Location</span>
            </label>
            <input
              type="text"
              required
              {...register("location")}
              placeholder="Type here"
              className="input input-sm input-bordered w-full"
            />
          </div>
          <div
            type="file"
            className="w-full mt-5 flex flex-col justify-center items-center border border-dashed py-3 "
          >
            <label
              htmlFor="file"
              className="text-sm text-gray-400 cursor-pointer w-full flex flex-col items-center"
            >
              Choose Photo
              <HiOutlinePhotograph className="w-6 h-6 text-gray-400" />
              {productImage && (
                  <p className="text-gray-800">{productImage[0]?.name}</p>
                )}
            </label>
            <input
              type="file"
              id="file"
              {...register("image", {
                required: "Photo is Required",
              })}
              className="input input-sm input-bordered w-full max-w-xs hidden"
            />
          </div>
          {errors?.image?.message && (
            <p className="text-red-500">
              <span className="font-bold">Error: </span>
              {errors.image?.message}
            </p>
          )}
          <button disabled={addProductProcessing} className="btn mt-5 w-full" type="submit">
          {addProductProcessing ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                "Add Product"
              )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
