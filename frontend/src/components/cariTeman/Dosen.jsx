import React, { useState } from 'react';
import CardDosen from './cardDosen.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const Dosen = ({ searchKeyword }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dosenList, setDosenList] = useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:8080/dosens';
        if (searchKeyword) {
          url = `http://localhost:8080/dosen/search/${searchKeyword}`;
        }
        const response = await axios.get(url);
        if (response.data) {
          setDosenList(response.data);
        }
      } catch (error) {
        console.error('Error fetching Dosen list:', error);
      }
    };

    fetchData();
  }, [searchKeyword]);

  const handlePrevClick = () => {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(index + 1, dosenList.length - 1);
    setIndex(newIndex);
  };

  const visibleDosenData = dosenList.slice(index, index + 5);

  return (
    <div
      className="md:w-300 overflow-hidden mx-19"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4 mr-4 mt-4">
      <p className='text-xl font-bold mb-6 text-blue-400 py-2'>Dosen</p>
      <Link to="/cari-teman/semua-dosen" className="text-blue-500">
          Lihat Semua &gt;
        </Link>
      </div>
      <div className="flex gap-5 relative justify-center">
      {visibleDosenData.length === 0 ? (
          <p>Tidak ada Dosen yang sesuai</p>
        ) : (
          <>
            {visibleDosenData.map((dosen) => (
              <CardDosen key={dosen.id} dosen={dosen} />
            ))}
          </>
        )}
        <div className="absolute top-36 left-0 right-0 flex justify-between items-center px-4 py-2" style={{ transition: 'opacity 0.3s ease-in-out' }}>
          <button className='bg-white border-2 border-slate-500 h-12 w-12 rounded-full text-2xl text-slate-500' onClick={handlePrevClick} disabled={index === 0}>{'<'}</button>
          <button className='bg-white border-2 border-slate-500 h-12 w-12 rounded-full text-2xl text-slate-500' onClick={handleNextClick} disabled={index >= dosenList.length - 5}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Dosen;
