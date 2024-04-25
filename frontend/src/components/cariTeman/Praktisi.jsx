import React, { useState } from 'react';
import CardPraktisi from './cardPraktisi.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const Praktisi = ({ searchKeyword }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [praktisiList, setpraktisiList] = useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:9090/praktisis';
        if (searchKeyword) {
          url = `http://localhost:9090/praktisi/search/${searchKeyword}`;
        }
        const response = await axios.get(url);
        if (response.data) {
          setpraktisiList(response.data);
        }
      } catch (error) {
        console.error('Error fetching praktisi list:', error);
      }
    };

    fetchData();
  }, [searchKeyword]);

  const handlePrevClick = () => {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(index + 1, praktisiList.length - 1);
    setIndex(newIndex);
  };

  const visiblepraktisiData = praktisiList.slice(index, index + 5);

  return (
    <div
      className="w-1100 overflow-hidden mx-19 my-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4 mr-4 mt-4">
      <p className='text-xl font-bold mb-6 text-blue-400 py-2'>Praktisi</p>
      <Link to="/cari-teman/semua-praktisi" className="text-blue-500">
          Lihat Semua &gt;
        </Link>
      </div>
      <div className="flex relative">
      {visiblepraktisiData.length === 0 ? (
          <p>Tidak ada praktisi yang sesuai</p>
        ) : (
          <>
            {visiblepraktisiData.map((praktisi) => (
              <CardPraktisi key={praktisi.id} praktisi={praktisi} />
            ))}
          </>
        )}
        <div className={`absolute top-28 left-0 right-3 flex justify-between items-center px-4 py-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handlePrevClick} disabled={index === 0}>{'<'}</button>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handleNextClick} disabled={index >= praktisiList.length - 5}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};


export default Praktisi;
