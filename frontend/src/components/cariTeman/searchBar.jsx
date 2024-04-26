import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center w-full p-2 rounded-md bg-slate-200">
    <FaSearch className="ml-3 mr-1 text-gray-500" />
    <input
      type="search"
      placeholder='Keyword'
      className='w-full p-1 rounded-md bg-slate-200'
      style={{ fontSize: '1.0 rem' }}
      onChange={handleChange}
    />
    </div>
  );
};

export default SearchBar;
