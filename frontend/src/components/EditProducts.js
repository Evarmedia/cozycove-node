import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "./elements/BackButton";
import Spinner from "./elements/Spinner";

const EditProducts = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedProduct, SetEditedProduct] = useState({});
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/product/${id}`)
      .then((response) => {
        SetEditedProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error("Error", error.message);
      });
  }, [id]);

  const handleEditBook = () => {
    const token = localStorage.getItem("token");

    const updatedProduct = {
      title: title || editedProduct.title,
      quantity: quantity || editedProduct.quantity,
      price: price || editedProduct.price,
      description: description || editedProduct.description,
      category: category || editedProduct.category,
      rating: rating || editedProduct.rating,
    };

    setLoading(true);

    axios
      .put(`http://localhost:3005/api/product/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        // toast.success("Product Updated Successfully");
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error", error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Product</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label htmlFor='title' className='text-xl mr-4 text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              id='title'
              placeholder={editedProduct.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label htmlFor='quantity' className='text-xl mr-4 text-gray-700'>
              Quantity
            </label>
            <input
              type='number'
              id='quantity'
              placeholder={editedProduct.quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
            />
          </div>

          <div className='my-4'>
            <label htmlFor='price' className='text-xl mr-4 text-gray-700'>
              Price
            </label>
            <input
              type='number'
              id='price'
              placeholder={editedProduct.price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
            />
          </div>

          <div className='my-4'>
            <label htmlFor='price' className='text-xl mr-4 text-gray-700'>
              Description
            </label>
            <textarea
              type='text'
              id='description'
              placeholder={editedProduct.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
            />
          </div>

          <div className='my-4'>
            <label htmlFor='category' className='text-xl mr-4 text-gray-700'>
              Category
            </label>
            <select
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            >
              <option value=''>Select Category</option>
              <option value='men'>Men</option>
              <option value='women'>Women</option>
              <option value='children'>Children</option>
              <option value='electronics'>Electronics</option>
              <option value='food'>Food</option>
              <option value='accessories'>Accessories</option>
            </select>
          </div>

          <div className='my-4'>
            <label htmlFor='rating' className='text-xl mr-4 text-gray-700'>
              Rating
            </label>
            <input
              type='number'
              id='rating'
              placeholder={editedProduct.rating}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <button
            className='bg-blue-700 m-8 text-white text-lg p-3'
            onClick={handleEditBook}
          >
            Save Edited Item
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditProducts;
