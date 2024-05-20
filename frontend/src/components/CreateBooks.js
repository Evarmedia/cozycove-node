import React, { useState } from "react";
import Spinner from "./elements/Spinner";
import BackButton from "./elements/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  // const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = () => {
    // if (!title || !author || !publishedYear) {
    // }
    const data = {
      title: title,
      author: author,
      publishedYear: publishedYear,
      // image: image,
    };
    setLoading(true);
    axios
      .post("http://localhost:3005/api/book", data)
      .then(() => {
        setLoading(false);
        toast.success("Book Added Successfully");
        setTitle("");
        setAuthor("");
        setPublishedYear("");
        setTimeout(() => {
          navigate("/");
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
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label htmlFor='title' className='text-xl mr-4 text-gray-700'>
              Title
            </label>
            <input
              type='text'
              id='title'
              placeholder='Enter the Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
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
              placeholder='Enter Author name'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>

          <div className='my-4'>
            <label
              htmlFor='publishedYear'
              className='text-xl mr-4 text-gray-700'
            >
              Published Year
            </label>
            <input
              type='number'
              min='1900'
              // max = "2024"
              max={new Date().getFullYear()}
              step='1'
              id='publishedYear'
              placeholder='Enter Publication Year'
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className='border-2 border-x-gray-500 px-4 p-y2 w-full'
              required
            />
          </div>
          {/* <div className='my-4'>
          <label htmlFor='image' className='text-xl mr-4 text-gray-700'>
            Cover Image
          </label>
          <input
            type='file'
            id='image'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='border-2 border-x-gray-500 px-4 p-y2 w-full'
            required
          />
        </div> */}
          {/* <div className="flex justify-center"> */}
            <button
              className='bg-amber-600 rounded-md m-8 text-white text-lg p-3 w-40'
              onClick={handleSaveBook}
            >
              Save Book
            </button>
          {/* </div> */}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateBooks;
