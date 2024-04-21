import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CardSemuaMahasiswa = ({ allmahasiswa }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:9090/user/${allmahasiswa.user_id_user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }, [allmahasiswa.user_id_user]);
  
  return (
    <div className="card w-64 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='bg-gray-50 border-1 border-gray-200 rounded-xl shadow-sm text-left p-2 w-full h-full relative flex flex-col justify-between'>
            <div className="flex flex-col items-center h-full">
              <div className="absolute top-2 left-2 bg-yellow-300 text-white px-2 py-1 rounded">
                <p className='text-xs'>Mahasiswa</p>
              </div>
              <div className="absolute top-2 left-2 mt-6 bg-blue-300 text-white px-2 py-1 rounded">
                <p className='text-xs'>Semester {allmahasiswa.user_id_user}</p>
              </div>
              <img
                className='rounded-lg w-full h-48 object-cover mb-2'
                src={user.profileUrl}
                alt=""
              />
              <p className='font-bold text-m text-center'>{user.username}</p>
              <p className='text-xs text-center text-gray-500'>{allmahasiswa.universitas}</p>
              <p className='text-xs text-center text-gray-500'>{user.location}</p>
              <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2"/>
              <div className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-2/3 mx-auto">
                <p className='text-xs text-center'>{allmahasiswa.jurusan}</p>
              </div>
              <div className= "text-white px-2 rounded mt-2 flex flex-row">
              </div>
            </div>
            <div className='flex py-1 font-bold'>
                <p className='text-xs  mr-9 ml-6'>Achievement</p>
                <p className='text-xs'>Likes</p>
            </div>
            <div className='flex items-center mr-2 ml-8'>
              <div className='rounded-full h-4 w-4 bg-red-500 mr-1'></div>
              <div className='rounded-full h-4 w-4 bg-yellow-500 mr-1'></div>
              <div className='rounded-full h-4 w-4 bg-green-500'></div>
              <p className='text-s font-bold text-gray-600 ml-12'>{allmahasiswa.Likes}</p>
            </div>
            <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2"/>
            <p className='text-xs px-4 py-1 font-bold'>Bergabung</p>
            <p className='text-xs text-gray-500 px-4 py-1 font-semibold'>{allmahasiswa.Bergabung}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardSemuaMahasiswa;
