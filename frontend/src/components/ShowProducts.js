import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./elements/BackButton";
import Spinner from "./elements/Spinner";

const ShowProducts = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3005/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl'> View Product Card </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex justify-center p-12'>
          <div className='p-4 px-12 border border-3 border-amber-700 shadow-black isolate aspect-video w-96 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5'>
            <h1 className='mt-2 text-gray-800 text-md lg:text-lg font-bold'>
              <span className="text-amber-800 ">Product Title: </span>{product.title}
            </h1>
            <img
              className='my-4 border-white border-4'
              src={product.image}
              alt={product.title}
            />
            <h1 className=' text-lg font-bold text-gray-800'>
            <span className="text-amber-800">Quantity instock: </span>
              {product.quantity}
            
            </h1>
            <h1 className='text-gray-800 text-lg  font-bold'>
            <span className="text-amber-800">Price: </span>
             {product.price}</h1>
            <h1 className='text-gray-800 text-lg font-bold'> 
            <span className="text-amber-800">Category: </span>
             {product.category}</h1>
             <div> 
              <h1 className='text-amber-800 text-lg  font-bold'>Description: </h1>
              <p className=" text-balance text-justify">
                {product.description}</p>
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
