import React, { useState } from "react";
import Spinner from "./elements/Spinner";
import BackButton from "./elements/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProducts = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = () => {
    // if (!title || !author || !publishedYear) {
    // }
    const data = {
      title,
      quantity,
      price,
      description,
      category,
      rating,
      image,
    };
    // setLoading(true);
    axios
      .post("http://localhost:3005/api/product", data)
      .then(() => {
        setLoading(false);
        toast.success("Product Added Successfully");
        setTitle("");
        setQuantity("");
        setPrice("");

        setLoading(true);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Product</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label htmlFor='title' className='text-xl mr-4 text-gray-700'>
              Product Title
            </label>
            <input
              type='text'
              id='title'
              placeholder='Enter the Name of Product'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label htmlFor='quantity' className='text-xl mr-4 text-gray-700'>
              Quantiy
            </label>
            <input
              type='number'
              id='quantity'
              placeholder='Enter Quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label
              htmlFor='price'
              className='text-xl mr-4 text-gray-700'
            >
              Price
            </label>
            <input
              type='number'
              // min='1900'
              // max = "2024"
              max={new Date().getFullYear()}
              step='1'
              id='price'
              placeholder='Enter price of Product'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label htmlFor='description' className='text-xl mr-4 text-gray-700'>
            Description
            </label>
            <textarea
              type='number'
              id='description'
              placeholder=' Enter Product Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label htmlFor='category' className='text-xl mr-4 text-gray-700'>
            Category
            </label>
            <input
              type='text'
              id='category'
              placeholder='Enter Product Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label htmlFor='rating' className='text-xl mr-4 text-gray-700'>
            Rating
            </label>
            <input
              type='number'
              id='rating'
              min='0'
              max='5'
              placeholder='Enter Product Rating'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

{/* Need to learn how to send filetypes to db, Image Input should to be a file upload not a text input */}
          <div className='my-4'>
          <label htmlFor='image' className='text-xl mr-4 text-gray-700'>
            Upload Product Image
          </label>
          <input
            type='file'
            id='image'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='border-2 border-x-gray-500 px-4 p-y2 w-full'
            required
          />
        </div>
          <div className="flex justify-center">
            <button
              className='bg-amber-600 rounded-md m-8 text-white text-lg p-3 w-40'
              onClick={handleSaveBook}
            >
              Create Product
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateProducts;
