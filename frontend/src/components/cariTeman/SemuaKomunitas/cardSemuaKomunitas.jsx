// cardMahasiswa.js

import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const CardSemuaKomunitas = ({ allkomunitas }) => {
  return (
    <div className="card w-64">
    <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
      <li className="my-1 px-1 w-full">
        <div className='rounded-lg bg-white shadow-md w-56 pb-2 relative border my-3'>
          <div className="relative group">
            <img className='rounded-t-lg w-full h-48 object-cover mb-2' src={allkomunitas.imageUrl} alt={allkomunitas.name} />
            <button className="absolute inset-0 w-full h-full opacity-0  group-hover:opacity-100 flex items-center justify-center bg-black bg-opacity-80 text-white font-bold rounded-t-lg transition-opacity duration-300" >
            <a href={`http://localhost:9191/invite/${allkomunitas.inviteCode}`}><span className="text-black font-bold text-xl py-2 px-4 bg-orange-300 rounded-md">Open</span></a>
            </button>
          </div>
          <div>
            <div className='text-center space-y-0.5'>
              <p className='font-bold text-xl h-7 truncate'>{allkomunitas.name}</p>
              <p className='font-semibold text-xs text-slate-500 truncate'>{allkomunitas.description}</p>
            </div>
            <div className='flex justify-center gap-1.5 mt-4 mx-2'>
              {allkomunitas.topics.map((topic) => (
                <div key={topic.id} className="bg-orange-300 font-semibold rounded-md px-4 py-1 text-xs">{topic.name}</div>
              ))}
            </div>
            <hr className='my-2 mx-2 h-0.5 bg-gradient-to-r from-purple-500 to-white' />
            <div className='flex w-full'>
              <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                <p className='font-bold'>Dibuat</p>
                <p>{new Date(allkomunitas.createdAt).getDate()} {new Date(allkomunitas.createdAt).toLocaleString('default', { month: 'long' })} {new Date(allkomunitas.createdAt).getFullYear()}</p>
              </div>
              <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                <p className='font-bold'>Anggota</p>
                <p className='line-clamp-1'>{allkomunitas.totalMembers}</p>
              </div>
            </div>
          </div>
        </div>
      </li>


    </ul>
  </div>
  );
};

export default CardSemuaKomunitas;
