// cardMahasiswa.js

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import communityBronze from '../../data/communityBronze.jpeg';
import communitySilver from '../../data/communitySilver.jpeg';
import communityGold from '../../data/communityGold.jpeg';
import communityPlatinum from '../../data/communityPlatinum.jpeg';
import { getDataCTB } from '../../lib/fetchData';


const CardMahasiswa = ({ mahasiswa }) => {
  const [user, setUser] = useState({});
  const [achievementList, setAchievementList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${mahasiswa.user_id_user}`);
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
      } catch (error) {
        console.error('Error fetching mahasiswa list:', error);
      }
    };

    fetchData();
  }, [mahasiswa.user_id_user, user.nama]);

  const getCommunityMedal = () => {
    const count = achievementList;
    if (count == 0) return communityPlatinum;
    if (count >= 1) return communityPlatinum;
    if (count >=5 ) return communityBronze;
    if (count >= 10) return communitySilver;
    if (count >= 15) return communityGold;
  };

  return (
    <div className="card max-w-52 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='rounded-lg bg-white shadow-md w-48 pb-2 relative'>
            <img className='rounded-t-lg w-full h-48 object-cover mb-2' src={user.profileUrl} alt="" />
            <div className="absolute -top-4 left-2 mt-6 bg-orange-300 font-bold px-2 py-1 rounded-md">
              <p className='text-xs'>Mahasiswa</p>
            </div>
            <div>
              <div className='text-center space-y-0.5'>
                <p className='font-bold text-xl h-7 truncate'>{user.username}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{mahasiswa.universitas}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{mahasiswa.jurusan}</p>
              </div>
              <div className='my-2 mx-2 max-h-0.5 min-h-0.5 border-0 bg-gradient-to-r from-purple-500 to-white'></div>
              <div className='flex justify-evenly items-center mx-3 font-bold text-xs'>
                <div className='-ml-1.5'>
                  <p>Achievement</p>
                  <div className='flex mt-1'>
                    <img src={getCommunityMedal()} alt="medal" className="w-6 h-6 mr-1" />
                    <div className="rounded-full h-6 w-6 bg-yellow-500 mr-1"></div>
                    <div className="rounded-full h-6 w-6 bg-green-500 mr-1"></div>
                  </div>
                </div>
                <div className='text-center'>
                  <p className=''>Upvote</p>
                  <p className='text-lg'>120</p>
                </div>
              </div>
              <div className='my-2 mx-2 max-h-0.5 min-h-0.5 border-0 bg-gradient-to-r from-purple-500 to-white'></div>
              <div className='flex w-full'>
                <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                  <p className='font-bold'>Bergabung</p>
                  <p className='line-clamp-1'>{new Date(user.tanggal_daftar).getDate()} {new Date(user.tanggal_daftar).toLocaleString('default', { month: 'long' })} {new Date(user.tanggal_daftar).getFullYear()}</p>
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

export default CardMahasiswa;
