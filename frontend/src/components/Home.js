import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import SearchBar from "./SearchBar";
import Spinner from "./elements/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('token');


  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3005/api/product")
      .then((res) => {
        // console.log(res.data.data)
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3005/api/product/deleteproduct/${selectedProductId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        // console.log(res.data.message);
        setShowDeletePopup(false);

        toast.warning(res.data.message);
        // Refresh Products list
        axios
          .get("http://localhost:3005/api/product")
          .then((res) => {
            // console.log(res.data.data)
            setProducts(res.data.data);
            
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedProductId(null);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.title && product.title.toLowerCase().includes(searchValue)
  );

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center py-4'>
        <h1 className='text-3xl'>PRODUCT LIST</h1>

        {/************* Search bar *****************/}
        <SearchBar searchValue={searchValue} handleSearch={handleSearch} />

        <div className="flex justify-between gap-4">
        <button className='bg-red-800 hover:scale-110 text-white font-semibold hover:bg-red-600 rounded-full px-2' title="Delete Product??" 
        onClick={handleLogout}
        > Logout</button>
        <Link to='/products/create'>
          <MdOutlineAddBox className='text-green-700 text-4xl hover:scale-110' />
        </Link>
        </div>
      </div>
      {loading ? (
        <>
        <Spinner />
        </>
      ) : (
        <ProductsTable filteredProducts={filteredProducts} handleDelete={handleDelete} />
      )}
      {showDeletePopup && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl mb-4'>Delete Product</h2>
            <p className='mb-4'>Are you sure you want to delete this product?</p>
            <div className='flex justify-center'>
              <button
                onClick={handleConfirmDelete}
                className='bg-red-800 font-bold text-white px-4 py-2 rounded mr-4'
              >
                Yes😥
              </button>
              <button
                onClick={handleCancelDelete}
                className='bg-green-600 font-bold text-white px-4 py-2 rounded'
              >
                No😃
              </button>
            </div>
          </div>
          <div
            className='w-screen h-screen absolute -z-10 popup-overlay backdrop-blur-[1px]'
            onClick={handleCancelDelete}
          ></div>
        </div>
        // NOTE: Seperate the delete Pop to a modal component later
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
