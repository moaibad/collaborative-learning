import React, { useState } from 'react';
import alldosen from '../../../data/dataSemuaDosen.js';
import CardSemuaDosen from './cardSemuaDosen.jsx';

const SemuaDosen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = alldosen.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const visibleDosenData = alldosen.slice(startIndex, endIndex);

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
    <div className="w-1100 overflow-hidden mx-19">
      <div className="flex flex-wrap">
        {visibleDosenData.map((dosen) => (
          <CardSemuaDosen key={dosen.id} alldosen={dosen} />
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

export default SemuaDosen;