import React, { useState } from 'react';
import CardSemuaPraktisi from './cardSemuaPraktisi.jsx';
import axios from 'axios';
import { useEffect } from 'react';

const SemuaPraktisi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePraktisiData,setVisiblePraktisiData ] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const response = await axios.get('http://localhost:8080/praktisis');
        const allpraktisi = response.data; // Assuming your API returns an array of all mahasiswa
        const totalItems = allpraktisi.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const visibleData = allpraktisi.slice(startIndex, endIndex);
        setVisiblePraktisiData(visibleData);
      } catch (error) {
        console.error('Error fetching mahasiswa data:', error);
      }
    };

    fetchMahasiswa();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`mr-4 cursor-pointer ${
            currentPage === i ? 'text-blue-700 font-bold' : 'text-blue-500'
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
    <div className="w-300 overflow-hidden mx-6">
      <div className="grid grid-cols-4 gap-4 ">
        {visiblePraktisiData.map((praktisi) => (
          <CardSemuaPraktisi key={praktisi.id} allpraktisi={praktisi} />
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

export default SemuaPraktisi;
