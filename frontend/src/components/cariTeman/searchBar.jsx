import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <input
      type="search"
      placeholder='Cari komunitas berdasarkan kata kunci'
      className='w-full p-4 rounded-md bg-slate-200'
      onChange={handleChange}
    />
  );
};

export default SearchBar;
