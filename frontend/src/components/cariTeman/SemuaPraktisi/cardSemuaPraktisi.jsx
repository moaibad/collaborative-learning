// cardMahasiswa.js

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CardSemuaPraktisi = ({ allpraktisi }) => {
  const [user, setUser] = useState({});
  const [reputation, setReputation] = useState([]);
  const [totalReputation, setTotalReputation] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${allpraktisi.user_id_user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      }
      );
  }, [allpraktisi.user_id_user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userReputation = await axios.get(`http://localhost:3001/api/user?email=${user.email}`);
        setReputation(userReputation.data);
        setTotalReputation(reputation.reputation);
      } catch (error) {
        console.error('Error reputation list:', error);
      }
    }
  
    fetchData();
  }, [totalReputation]);

  return (
    <div className="card w-64 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='rounded-lg bg-white shadow-md w-56 pb-2 relative'>
            <img className='rounded-t-lg w-full h-48 object-cover mb-2' src={user.profileUrl} alt="" />
            <div className="absolute -top-4 left-2 mt-6 bg-yellow-300 font-bold px-2 py-1 rounded-md">
              <p className='text-xs'>Praktisi</p>
            </div>
            <div>
              <div className='text-center space-y-0.5'>
                <p className='font-bold text-xl h-7 truncate'>{user.username}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{allpraktisi.asal_perusahaan}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{allpraktisi.posisi}</p>
              </div>
              <hr className='my-2 mx-2 h-0.5 bg-gradient-to-r from-purple-500 to-white'/>
                <div className='text-center font-bold'>
                  <p className='text-xs'>Upvote</p>
                  <p className='text-lg'>120</p>
                </div>
              <hr className='my-2 mx-2 h-0.5 bg-gradient-to-r from-purple-500 to-white'/>
              <div className='flex w-full'>
                <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                  <p className='font-bold'>Bergabung</p>
                  <p className=''>{new Date(user.tanggal_daftar).getDate()} {new Date(user.tanggal_daftar).toLocaleString('default', { month: 'long' })} {new Date(user.tanggal_daftar).getFullYear()}</p>
                </div>
                <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                  <p className='font-bold'>Kota/Kabupaten</p>
                  <p className='line-clamp-1'>{user.location}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardSemuaPraktisi;
