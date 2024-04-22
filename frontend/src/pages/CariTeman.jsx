import React, { useState } from 'react';
import Title from '../components/cariTeman/Title';
import SearchBar from '../components/cariTeman/searchBar';
import Mahasiswa from '../components/cariTeman/Mahasiswa';
import Dosen from '../components/cariTeman/Dosen';
import Praktisi from '../components/cariTeman/Praktisi';
import Komunitas from '../components/cariTeman/Komunitas';

const CariTeman = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
  <>
  <div className='m-4 grid grid-cols-1 gap-4 mt-4'>
   <SearchBar onSearch={handleSearch} />
  </div>
  <div className='text-3xl font-bold text-center my-5 py-5'><Title/></div> 
    <div className='grid grid-cols-3 gap-4 mt-4'>
      <div className='m-4 flex flex-col justify-center max-w-lg'>
        <Mahasiswa searchKeyword={searchTerm} />
        <Dosen />
        <Praktisi />
        <Komunitas searchKeyword={searchTerm} />
      </div>
    </div>
    </>
  );
};

export default CariTeman;
