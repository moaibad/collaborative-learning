import React, { useEffect, useState } from 'react';
import CardMahasiswa from './cardMahasiswa.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Mahasiswa = ({ searchKeyword }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mahasiswaList, setMahasiswaList] = useState ([]);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/mahasiswa/search/${searchKeyword}`);
        if (response.data) {
          setMahasiswaList(response.data);
        }
      } catch (error) {
        console.error('Error fetching mahasiswa list:', error);
      }
    };

    fetchMahasiswa();
  }, [searchKeyword]);

  console.log(mahasiswaList);

  const handlePrevClick = () => {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(index + 1, mahasiswaList.length - 1);
    setIndex(newIndex);
  };

  const visibleMahasiswaData = mahasiswaList.slice(index, index + 5);
  return (
    <div
      className="w-1100 overflow-hidden mx-19"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4 mr-4 mt-4">
      <p className='text-xl font-bold text-blue-400'>Mahasiswa</p>
      <Link to="/cari-teman/semua-mahasiswa" className="text-blue-500">
          Lihat Semua &gt;
        </Link>
      </div>
      <div className="flex relative">
        {visibleMahasiswaData.length === 0 ? (
          <p>Tidak ada Mahasiswa yang sesuai</p>
        ) : (
          <>
            {visibleMahasiswaData.map((mahasiswa) => (
              <CardMahasiswa key={mahasiswa.id} mahasiswa={mahasiswa} />
            ))}
          </>
        )}
        <div className={`absolute top-28 left-0 right-3 flex justify-between items-center px-4 py-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handlePrevClick} disabled={index === 0}>{'<'}</button>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handleNextClick} disabled={index >= mahasiswaList.length - 5}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Mahasiswa;
