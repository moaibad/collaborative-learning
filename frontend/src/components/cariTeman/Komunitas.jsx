import React, { useState , useEffect} from 'react';
import komunitas from '../../data/dataKomunitas.js';
import CardKomunitas from './cardKomunitas.jsx';
import { getDataCTB } from '../../lib/fetchData';

const Komunitas = ({ searchKeyword }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    const fetchCommunityList = async () => {
      try {
        // Fetch community list based on the search keyword
        const datanya = await getDataCTB(`/servers/findallserver/${searchKeyword}`);
        console.log(datanya.servers);
        if (datanya) {
          setCommunityList(datanya.servers);
        }
      } catch (error) {
        console.error('Error fetching community list:', error);
      }
    };

    fetchCommunityList();
    console.log(communityList);

  }, [searchKeyword]); // Fetch community list when searchKeyword changes


  const handlePrevClick = () => {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(index + 1, filteredKomunitas.length - 1);
    setIndex(newIndex);
  };

  const filteredKomunitas = komunitas.filter(komunitas => {
    const searchRegex = new RegExp(searchKeyword, 'i'); // Case-insensitive search
    return (
      searchRegex.test(komunitas.Nama)
    );
  });

  const visibleKomunitasData = filteredKomunitas.slice(index, index + 5);

  return (
    <div className="w-1100 overflow-hidden mx-19">
      <p className='text-xl font-bold mb-6 text-blue-400'>Komunitas</p>
      <div className="flex relative">
      {communityList.length === 0 ? (
          <p>Tidak ada Komunitas yang sesuai</p>
        ) : (
          <>
            {communityList.map((komunitas) => (
              <CardKomunitas key={komunitas.id} komunitas={komunitas} />
            ))}
          </>
        )}
        {/* {visibleKomunitasData.map((komunitas) => (
          <CardKomunitas key={komunitas.id} komunitas={komunitas} />
        ))} */}
        <div className={`absolute top-28 left-0 right-3 flex justify-between items-center px-4 py-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handlePrevClick} disabled={index === 0}>{'<'}</button>
          <button className='bg-orange-400 opacity-65 hover:opacity-80 h-16 w-16 rounded-full text-4xl' onClick={handleNextClick} disabled={index >= filteredKomunitas.length - 5}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Komunitas;
