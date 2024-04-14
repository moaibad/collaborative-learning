import React, { useState, useEffect } from 'react';
import CardSemuaKomunitas from './cardSemuaKomunitas.jsx';
import { getDataCTB } from '../../../lib/fetchData';

const SemuaKomunitas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [allkomunitas, setAllKomunitas] = useState([]);
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchCommunityList = async () => {
      try {
        const datanya = await getDataCTB(`/servers/findallservers`);
        if (datanya) {
          setAllKomunitas(datanya.servers);
        }
      } catch (error) {
        console.error('Error fetching community list:', error);
      }
    };

    fetchCommunityList();
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle sort order if the same field is clicked again
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set the new sorting field and default to ascending order
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedKomunitas = [...allkomunitas].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'totalMembers') {
      return sortOrder === 'asc' ? a.totalMembers - b.totalMembers : b.totalMembers - a.totalMembers;
    } else if (sortBy === 'createdDate') {
      return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const totalItems = sortedKomunitas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const visibleKomunitasData = sortedKomunitas.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`mr-4 cursor-pointer ${currentPage === i ? 'text-blue-700 font-bold' : 'text-blue-500'
            }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="w-1100 overflow-hidden mx-19">
      <div className="flex items-center">
        <p className='text-xl font-bold text-blue-400'>Filter Berdasarkan: </p>
      <div className="flex items-center mt-2 mb-2 ml-4">
        {/* <button className="mr-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm text-xs" onClick={() => handleSort('name')}>
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button> */}
        <button className="mr-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm text-xs" onClick={() => handleSort('totalMembers')}>
          Anggota {sortBy === 'totalMembers' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
        <button className="mr-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm text-xs" onClick={() => handleSort('createdDate')}>
          Tgl.Dibentuk {sortBy === 'createdDate' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
      </div>
      </div>

      <div className="flex flex-wrap">
        {visibleKomunitasData.map((komunitas) => (
          <CardSemuaKomunitas key={komunitas.id} allkomunitas={komunitas} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          {currentPage !== 1 && (
            <span
              className="mr-4 cursor-pointer text-blue-500"
              onClick={handlePrevPage}
            >
              Prev
            </span>
          )}
          {renderPageNumbers()}
          {currentPage !== totalPages && (
            <span
              className="ml-4 cursor-pointer text-blue-500"
              onClick={handleNextPage}
            >
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SemuaKomunitas;
