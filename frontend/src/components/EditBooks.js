import React, { useEffect, useState } from "react";
import Spinner from "./elements/Spinner";
import BackButton from "./elements/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";


const EditBooks = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedBook, setEditedBook] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/book/${id}`)
      .then((response) => {
        setEditedBook(response.data);
        // console.log(response.data)
        // setTitle(response.data.title);
        // setAuthor(response.data.author);
        // setPublishedYear(response.data.publishedYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error("Error", error.message);
      });
  }, [id]);

  const handleEditBook = () => {
    const updatedBook = {
      title: title || editedBook.title,
      author: author || editedBook.author,
      publishedYear: publishedYear || editedBook.publishedYear
    };

    setLoading(true);

    axios.put(`http://localhost:3005/api/book/${id}`, updatedBook )
      .then(() => {
        setLoading(false);
        toast.success("Book Updated Successfully");
        setTimeout(()=>{
          navigate("/");
        }, 1000);
        
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error", error)
      });

  };
 

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {
        loading ? (<Spinner />) : (<div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label htmlFor='title' className='text-xl mr-4 text-gray-700'>
            Title
          </label>
          <input
            type='text'
            id='title'
            placeholder={editedBook.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-x-gray-500 px-4 p-y2 w-full"
            required
          />
        </div>

        <div className='my-4'>
          <label htmlFor='author' className='text-xl mr-4 text-gray-700'>
            Author
          </label>
          <input
            type='text'
            id='author'
            placeholder={editedBook.author}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-x-gray-500 px-4 p-y2 w-full"
          />
        </div>

        <div className='my-4'>
          <label htmlFor='publishedYear' className='text-xl mr-4 text-gray-700'>
            Published Year
          </label>
          <input
            type='number'
            id='publishedYear'
            placeholder={editedBook.publishedYear}
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-x-gray-500 px-4 p-y2 w-full"
          />
        </div>
        <button className="bg-blue-700 m-8 text-white text-lg p-3" onClick={handleEditBook}>Save Edited Book
        </button>
      </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default EditBooks;