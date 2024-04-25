// cardMahasiswa.js

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CardSemuaPraktisi = ({ allpraktisi }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:9090/user/${allpraktisi.user_id_user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      }
      );
  }, [allpraktisi.user_id_user]);

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
                src={user.profileUrl}
                alt=""
              />
              <p className='font-bold text-m text-center'>{user.username}</p>
              <p className='text-xs text-center text-gray-500'>{allpraktisi.asal_perusahaan}</p>
              <p className='text-xs text-center text-gray-500'>{user.location}</p>
            </div>
            <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2" />
            <div className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-2/3 mx-auto">
              <p className='text-xs text-center'>{allpraktisi.posisi}</p>
            </div>
            <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2" />
            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-center px-4 font-bold">
                <p className="text-xs">Bergabung</p>
                <p className="text-xs mr-1">Likes</p>
              </div>
              <div className="flex items-center px-4">
                <div className="flex mr-1">
                  <p className='text-xs text-gray-500 py-1 font-semibold'>{new Date().toLocaleDateString()}</p>
                </div>
                <p className="text-xs font-bold text-gray-600 flex-grow text-right mr-2">1</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardSemuaPraktisi;
