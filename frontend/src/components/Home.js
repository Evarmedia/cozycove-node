import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./elements/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import SearchBar from "./SearchBar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3005/api/book")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setSelectedBookId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3005/api/book/${selectedBookId}`)
      .then((res) => {
        console.log(res.data.message);
        setShowDeletePopup(false);
        // Refresh books list
        axios
          .get("http://localhost:3005/api/book")
          .then((res) => {
            setBooks(res.data.data);
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
    setSelectedBookId(null);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue)
  );

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center py-4'>
        <h1 className='text-3xl'>BOOK LIST</h1>

        {/* Search bar */}
        <SearchBar searchValue={searchValue} handleSearch={handleSearch} />

        <Link to='/books/create'>
          <MdOutlineAddBox className='text-green-700 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-0'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No.</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Author
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Published year
              </th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.author}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.publishedYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center md:gap-x-12 gap-x-2'>
                    <Link to={`/books/details/${book._id}`}>
                      <FaEye className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl text-orange-800' />
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className='text-2xl text-red-800'
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showDeletePopup && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl mb-4'>Confirm Delete</h2>
            <p className='mb-4'>Are you sure you want to delete this book?</p>
            <div className='flex justify-center'>
              <button
                onClick={handleConfirmDelete}
                className='bg-red-600 text-white px-4 py-2 rounded mr-4'
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className='bg-green-600 text-white px-4 py-2 rounded'
              >
                No
              </button>
            </div>
          </div>
          <div
            className='w-screen h-screen absolute -z-10 popup-overlay backdrop-blur-[1px]'
            onClick={handleCancelDelete}
          ></div>{" "}
          OverLay to remove popup
        </div>
      )}
    </div>
  );
};

export default Home;
