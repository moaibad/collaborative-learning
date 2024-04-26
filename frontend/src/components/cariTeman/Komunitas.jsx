import React, { useState, useEffect } from 'react';
import CardKomunitas from './cardKomunitas.jsx';
import { getDataCTB } from '../../lib/fetchData';
import { Link } from 'react-router-dom'

const Komunitas = ({ searchKeyword }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let datanya = await getDataCTB(`/servers/allserver/all`);
        if (searchKeyword) {
          datanya = await getDataCTB(`/servers/findallserver/${searchKeyword}`);
        }
        if (datanya) {
          setCommunityList(datanya.servers);
        }
      } catch (error) {
        console.error('Error fetching mahasiswa list:', error);
      }
    };

    fetchData();
  }, [searchKeyword]);

  const handlePrevClick = () => {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(index + 1, communityList.length - 1);
    setIndex(newIndex);
  };

  const visibleCommunityData = communityList.slice(index, index + 5);

  return (
    <div
    className="w-300 overflow-hidden mx-19"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className="flex justify-between items-center mb-4 mr-4 mt-4">
      <p className='text-xl font-bold mb-6 text-blue-400 py-2'>Komunitas</p>
      <Link to="/cari-teman/semua-komunitas" className="text-blue-500">
          Lihat Semua &gt;
        </Link>
        </div>
      <div className="flex gap-5 relative justify-center">
        {visibleCommunityData.length === 0 ? (
          <p>Tidak ada Komunitas yang sesuai</p>
        ) : (
          <>
            {visibleCommunityData.map((komunitas) => (
              <CardKomunitas key={komunitas.id} komunitas={komunitas} />
            ))}
          </>
        )}
        <div className="absolute top-36 left-0 right-0 flex justify-between items-center px-4 py-2" style={{ transition: 'opacity 0.3s ease-in-out' }}>
          <button className='bg-white border-2 border-slate-500 h-12 w-12 rounded-full text-2xl text-slate-500' onClick={handlePrevClick} disabled={index === 0}>{'<'}</button>
          <button className='bg-white border-2 border-slate-500 h-12 w-12 rounded-full text-2xl text-slate-500' onClick={handleNextClick} disabled={index >= communityList.length - 5}>{'>'}</button>
        </div>
        </div>
      </div>
  );
};

export default Komunitas;
