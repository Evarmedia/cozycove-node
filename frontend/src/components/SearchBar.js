import React from 'react'
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchValue, handleSearch }) => {

    return (
      <div className="w-1/2 flex justify-center items-center">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full h-8 md:h-12 px-4 md:pl-10 md:pr-4 pr-2 pl-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Search By Name..."
            value={searchValue}
            onChange={handleSearch}
          />
          {/* Search icon */}
          <FaSearch  className="absolute right-3 top-1 md:top-3 text-gray-400 hover:text-red-500 hover:scale-125 text-2xl md:text-3xl cursor-pointer"/>
        </div>
      </div>
    );
  };
  
  export default SearchBar;