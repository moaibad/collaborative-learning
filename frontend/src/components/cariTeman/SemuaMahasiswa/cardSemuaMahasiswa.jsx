import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import communityBronze from '../../../data/communityBronze.jpeg';
import communitySilver from '../../../data/communitySilver.jpeg';
import communityGold from '../../../data/communityGold.jpeg';
import communityPlatinum from '../../../data/communityPlatinum.jpeg';
import { getDataCTB } from '../../../lib/fetchData';
import Cookies from 'universal-cookie';


const CardSemuaMahasiswa = ({ allmahasiswa }) => {
  const [user, setUser] = useState({});
  const [achievementList, setAchievementList] = useState([]);
  const [reputation, setReputation] = useState([]);
  const [totalReputation, setTotalReputation] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${allmahasiswa.user_id_user}`);
        if (response.data) {
          setUser(response.data);
        }

        console.log(user);
        const achievementResponse = await getDataCTB(`/profiles/achievement/${user.username}`);
        console.log("achievementResponse:", achievementResponse);
        if (achievementResponse) {
          setAchievementList(achievementResponse.community);
          console.log("achievementList:", achievementList);
        }

        //set user reputation
        const userReputation = await axios.get(`http://localhost:3001/api/user?email=${user.email}`);
        setReputation(userReputation.data);
        setTotalReputation(reputation.reputation);
        console.log("totalReputation:", totalReputation);
      } catch (error) {
        console.error('Error fetching allmahasiswa list:', error);
      }
    };

    fetchData();
  }, [allmahasiswa.user_id_user, user.nama, totalReputation]);

  const getCommunityMedal = () => {
    const count = achievementList;
    if (count == 0) return communityPlatinum;
    if (count >= 1) return communityPlatinum;
    if (count >= 5) return communityBronze;
    if (count >= 10) return communitySilver;
    if (count >= 15) return communityGold;
  };

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
                <p className='text-xs'>Angkatan {allmahasiswa.angkatan}</p>
              </div>
              <img
                className='rounded-lg w-full h-48 object-cover mb-2'
                src={user.profileUrl}
                alt=""
              />
              <p className='font-bold text-m text-center'>{user.username}</p>
              <p className='text-xs text-center text-gray-500'>{allmahasiswa.universitas}</p>
              <p className='text-xs text-center text-gray-500'>{user.location}</p>
              <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2" />
              <div className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-2/3 mx-auto">
                <p className='text-xs text-center'>{allmahasiswa.jurusan}</p>
              </div>
              <div className="text-white px-2 rounded mt-2 flex flex-row">
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-center px-4 font-bold">
                <p className="text-xs">Achievement</p>
                <p className="text-xs mr-1">Reputasi</p>
              </div>
              <div className="flex items-center px-4 mt-1">
                <div className="flex mr-1">
                  {/* <div className="rounded-full h-4 w-4 bg-red-500 mr-1"></div> */}
                  <img src={getCommunityMedal()} alt="medal" className="w-7 h-7 mr-1" />
                  <div className="rounded-full h-7 w-7 bg-yellow-500 mr-1"></div>
                  <div className="rounded-full h-7 w-7 bg-green-500 mr-1"></div>
                  <div className="rounded-full h-7 w-7 bg-blue-500 mr-1"></div>
                </div>
                <p className="text-xs font-bold text-gray-600 flex-grow text-right mr-2">{totalReputation}</p>
              </div>
            </div>
            <hr className="w-full mx-auto border-gray-400 border-solid border-t-2 mt-2" />
            <p className='text-xs px-4 py-1 font-bold'>Bergabung</p>
            <p className='text-xs text-gray-500 px-4 py-1 font-semibold'>{new Date(user.tanggal_daftar).toLocaleDateString()}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardSemuaMahasiswa;
