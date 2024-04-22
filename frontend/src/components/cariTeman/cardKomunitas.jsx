// cardMahasiswa.js

import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

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
                  <div class="grid grid-rows-3 grid-flow-col gap-0">
                    <div class="row-span-3 "><img class="rounded-full w-9 h-9" src={komunitas.imageUrl} alt="user-profile" /></div>
                    <div class="col-span-2 flex items-center">
                      <p className='font-bold text-xs'>{komunitas.name}</p>
                      <a href={`http://localhost:9191/invite/${komunitas.inviteCode}`}><FaArrowRightFromBracket size={14} className="ml-2" /></a>
                    </div>
                    <div class="row-span-2 col-span-3">
                      <div class="row-span-2 col-span-3 flex items-center">
                        <FaUserAlt size={10} />
                        <p className='font-bold text-xs ml-2'>{komunitas.totalMembers}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <p className="text-xs mt-2">{komunitas.description}</p>
                </span>
              </div>
              <p className='text-xs text-center text-gray-500'>{komunitas.location}</p>
              <hr className="w-2/3 mx-auto border-gray-400 border-solid border-t-2 mt-2" />
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
