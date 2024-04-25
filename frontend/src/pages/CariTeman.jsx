import React, { useState } from 'react';
import Title from '../components/cariTeman/Title';
import SearchBar from '../components/cariTeman/searchBar';
import Mahasiswa from '../components/cariTeman/Mahasiswa';
import Dosen from '../components/cariTeman/Dosen';
import Praktisi from '../components/cariTeman/Praktisi';
import Komunitas from '../components/cariTeman/Komunitas';
import { Button } from 'antd';

const CariTeman = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState("mahasiswa"); //Defaultnya mahasiswa


  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const shouldShowKomunitas = userRole !== "Dosen";

  return (
    <>
      <div className='m-4 grid grid-cols-1 gap-4 mt-4'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className='text-3xl font-bold text-center my-5 py-5'><Title /></div>
      <div className='grid grid-cols-3 gap-4 mt-4'>
        <div className='m-4 flex flex-col justify-center max-w-lg'>
          <Mahasiswa searchKeyword={searchTerm} />
          <Dosen searchKeyword={searchTerm} />
          <Praktisi searchKeyword={searchTerm} />
          {shouldShowKomunitas && (
            <Komunitas searchKeyword={searchTerm} />
          )}
        </div>
      </div>
      <div className='flex my-5 mx-3'>
        <Button onClick={() => setUserRole("Dosen")} className="mx-2" style={{
          backgroundColor: userRole === 'Dosen' ? '#008CBA' : undefined,
          color: userRole === 'Dosen' ? 'white' : undefined,
          borderColor: userRole === 'Dosen' ? '#008CBA' : undefined
        }}>
          Dosen and Praktisi View
        </Button>
        <Button onClick={() => setUserRole("mahasiswa")} className="mx-2" style={{
          backgroundColor: userRole === 'mahasiswa' ? '#008CBA' : undefined,
          color: userRole === 'mahasiswa' ? 'white' : undefined,
          borderColor: userRole === 'mahasiswa' ? '#008CBA' : undefined
        }}>
          Mahasiswa View
        </Button>
      </div>
    </>
  );
};

export default CariTeman;
