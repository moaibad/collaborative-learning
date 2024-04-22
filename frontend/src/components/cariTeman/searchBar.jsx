import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <input
      type="search"
      placeholder='Keyword [Nama Pengguna/Nama Komunitas] [Perguruan Tinggi] [Jurusan] [Topik]'
      className='w-full p-4 rounded-md bg-slate-200'
      style={{ fontSize: '1.0 rem' }}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
