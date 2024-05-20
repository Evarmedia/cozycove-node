import React, { useEffect, useState } from 'react'
import Spinner from './elements/Spinner';
import BackButton from "./elements/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";


const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();



  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:3005/api/book/${id}`).then((res) => {
    console.log(res.data.message);  
    toast.success(res.data.message);
      setTimeout(()=>{
        navigate('/');
      }, 1000)
    }).catch((error) => {
      console.log(error);
    })
  }
  
  const handleNo = () => {
    setLoading(true);
    navigate('/');
  }


  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3005/api/book/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {
        loading ? (<Spinner />) : (
          <div className='p-8'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
          <div className="flex w-full h-screen justify-center">
            <div className='p-8 m-8 h-[400px]'>
            <h1 className='text-3xl text-center mb-6'>Do you really really want to Delete {book.title}?</h1>
            <div className='flex bg-teal-100 justify-around p-8'>
            <button className='bg-red-700 rounded-lg p-2 text-white text-2xl m-2' onClick={handleDeleteBook}>Yes😥</button>
            <button className='bg-green-700 rounded-lg p-2 text-white text-2xl m-2' onClick={handleNo}>No😃</button>
            </div>
            </div>
          </div>
          </div>
        )
      }
      <ToastContainer />
    </div>
  )
}

export default DeleteBooks