import React, { useState } from 'react';
import CardDosen from './cardDosen.jsx';
import dosen from '../../data/dataDosen.js';
import { Link } from 'react-router-dom';


const Dosen = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevClick = () => {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(index + 1, dosen.length - 1);
    setIndex(newIndex);
  };

  const visibleDosenData = dosen.slice(index, index + 5);

  return (
    <div
      className="w-1100 overflow-hidden mx-19 my-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4 mr-4 mt-4">
      <p className='text-xl font-bold mb-6 text-blue-400 py-2'>Dosen</p>
      <Link to="/cari-teman/semua-dosen" className="text-blue-500">
          Lihat Semua &gt;
        </Link>
      </div>
      <div className="flex relative">
        {visibleDosenData.map((dosen) => (
          <CardDosen key={dosen.id} dosen={dosen} />
        ))}
        <div className={`absolute top-28 left-0 right-3 flex justify-between items-center px-4 py-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handlePrevClick} disabled={index === 0}>{'<'}</button>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handleNextClick} disabled={index >= dosen.length - 5}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Dosen;
