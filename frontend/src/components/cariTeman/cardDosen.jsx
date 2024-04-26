import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CardDosen = ({ dosen }) => {
  const [user, setUser] = useState({});
  const [reputation, setReputation] = useState([]);
  const [totalReputation, setTotalReputation] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:9090/user/${dosen.user_id_user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }, [dosen.user_id_user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userReputation = await axios.get(`http://localhost:3001/api/user?email=${user.email}`);
        setReputation(userReputation.data);
        setTotalReputation(reputation.reputation);
      } catch (error) {
        console.error('Error fetching allmahasiswa list:', error);
      }
    }
  
    fetchData();
  }, [totalReputation]);

  return (
    <div className="card w-64">
      <ul className="flex flex-wrap mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='bg-gray-50 border-1 border-gray-200 rounded-xl shadow-sm text-left p-2 w-full h-full relative flex flex-col justify-between'>
            <div className="flex flex-col items-center h-full">
              <div className="absolute top-2 left-2 bg-green-300 text-white px-2 py-1 rounded">
                <p className='text-xs'>Dosen</p>
              </div>
              <img
                className='rounded-lg w-full h-48 object-cover mb-2'
                src={user.profileUrl}
                alt=""
              />
              <p className='font-bold text-m text-center'>{user.username}</p>
              <p className='text-xs text-center text-gray-500 truncate'>{dosen.universitas}</p>
              <p className='text-xs text-center text-gray-500'>{user.location}</p>
              <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2"/>
              <div className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-2/3 mx-auto">
                <p className='text-xs text-center'>{dosen.jurusan}</p>
              </div>
            </div>
            <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2"/>
            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-center px-4 font-bold">
                <p className="text-xs">Bergabung</p>
                <p className="text-xs mr-1">Reputasi</p>
              </div>
              <div className="flex items-center px-4 mt-1">
              <p className='text-xs text-gray-500 py-1 font-semibold'>{new Date(user.tanggal_daftar).toLocaleDateString()}</p>
                <p className="text-xs font-bold text-gray-600 flex-grow text-right mr-2">{totalReputation}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardDosen;
