// cardMahasiswa.js

import React from 'react';

const CardKomunitas = ({ komunitas }) => {
  // const topikList = komunitas.Topik.split(',');
  return (
    <div className="card w-64 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='bg-gray-50 border-1 border-gray-200 rounded-xl shadow-sm text-left p-2 w-full h-full relative flex flex-col justify-between'>
            <div className="flex flex-col items-center h-full">
              <img
                className='rounded-lg w-full h-48 object-cover mb-2'
                src={komunitas.imageUrl}
                alt=""
              />
              <div className="tooltip">
                  <p className='font-bold text-m text-center'>{komunitas.name}</p>
                <span className="tooltiptext">
                <a href={`http://localhost:9191/invite/${komunitas.inviteCode}`}>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mb-1">Open</button>
                  </a>
                  <p className="text-xs">{komunitas.totalMembers} Members</p>
                  <p className="text-xs">{komunitas.description}</p>
                </span>
              </div>
              <p className='text-xs text-center text-gray-500'>{komunitas.location}</p>
              <hr className="w-2/3 mx-auto border-gray-400 border-solid border-t-2 mt-2"/>
              <div className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-2/3 mx-auto">
                <p className='text-xs text-center'>{komunitas.departement}</p>
              </div>
              <div className="text-white px-2 rounded mt-2 flex flex-row">
                {komunitas.topics.map((topic) => (
                  <div key={topic.id} className="bg-pink-400 text-white px-2 py-1 rounded m-1">
                    <p className='text-xs'>{topic.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex py-1 font-bold'>
                <p className='text-xs  mr-16 ml-6'>Dibuat</p>
                <p className='text-xs'>Anggota</p>
            </div>
            <div className='flex py-1 font-semibold text-gray-500'>
                <p className='text-xs mr-16 ml-6'>{new Date(komunitas.createdAt).toLocaleDateString()}</p>
                <p className='text-xs'>{komunitas.totalMembers}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardKomunitas;
