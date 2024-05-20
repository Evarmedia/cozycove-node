import React from 'react'
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    return (
      <div className="w-1/2 flex justify-center items-center">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full h-8 md:h-12 px-4 md:pl-10 md:pr-4 pr-2 pl-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Search By Name..."
          />
          {/* Search icon */}
          <FaSearch  className="absolute right-3 top-1 md:top-3 text-gray-400 hover:text-red-500 hover:scale-125 text-2xl md:text-3xl cursor-pointer"/>
          {/* <svg
            className="absolute right-3 top-1 md:top-3 w-6 h-6 text-gray-400 hover:text-red-500 hover:scale-125" //absolute right-3 top-3 w-6 h-6 text-gray-400
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.06-1.06L21 21z"
            ></path>
          </svg> */}
        </div>
      </div>
    );
  };
  
  export default SearchBar;