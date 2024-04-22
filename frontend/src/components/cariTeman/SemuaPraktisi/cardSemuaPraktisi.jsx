// cardMahasiswa.js

import React from 'react';

const CardSemuaPraktisi = ({ allpraktisi }) => {
  const topikList = allpraktisi.Topik.split(',');
  return (
    <div className="card w-64 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='bg-gray-50 border-1 border-gray-200 rounded-xl shadow-sm text-left p-2 w-full h-full relative flex flex-col justify-between'>
            <div className="flex flex-col items-center h-full">
              <div className="absolute top-2 left-2 bg-purple-300 text-white px-2 py-1 rounded">
                <p className='text-xs'>Praktisi</p>
              </div>
              <img
                className='rounded-lg w-full h-48 object-cover mb-2'
                src="https://utfs.io/f/b779d32b-cdf9-4ccd-aa59-eeaa7344a03c-nlisfc.png"
                alt=""
              />
              <p className='font-bold text-m text-center'>{allpraktisi.Nama}</p>
              <p className='text-xs text-center text-gray-500'>{allpraktisi.PerguruanTinggi}</p>
              <p className='text-xs text-center text-gray-500'>{allpraktisi.Kota}, {allpraktisi.Provinsi}</p>
              <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2"/>

            </div>
            <div className='flex py-1 font-bold'>
                <p className='text-xs ml-2 mr-16'>Bergabung</p>
                <p className='text-xs'>Likes</p>
            </div>
            <div className='flex py-1 text-gray-500'>
                <p className='text-xs ml-2 mr-10'>{allpraktisi.Bergabung}</p>
                <p className='text-xs'>{allpraktisi.Likes}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardSemuaPraktisi;
