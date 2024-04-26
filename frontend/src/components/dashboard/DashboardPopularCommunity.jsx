import React, { useState } from 'react'
import { IoMdPeople } from "react-icons/io";
import { useEffect } from 'react';
import { getDataCTB } from '../../lib/fetchData';

  
  const DashboardPopularCommunity = () => {
    const [komunitas, setKomunitas] = useState([]);

    useEffect(() => {
      const fetchProfileAndCommunityList = async () => {
        try {
          const response = await getDataCTB(`/servers/popular/all`);
          setKomunitas(response.servers);
          console.log(komunitas);
        } catch (error) {
          console.error('Error fetching popular community:', error);
        }
      }
      fetchProfileAndCommunityList();
    }, []);

        
    return (
      <div className="w-full">
        <div className='flex justify-between'>
          <p className='text-xl font-bold mb-6'>Popular Community</p>
            <p className='text-orange-400 font-bold'>Lihat Selengkapnya</p>
        </div>
        <div className='flex gap-5'>
          {komunitas.map((komunitas, index) => (
            <div key={index} className='shadow-md rounded-2xl'>
              <img className='m-0 p-0 w-72 h-36 object-cover rounded-2xl border' src={komunitas.imageUrl} alt="" />
              <div className='flex justify-between py-3'>
                <div className='bottom-2 leading-6'>
                  <p className='font-bold text-xl ml-1'>{komunitas.name}</p>
                  <div className='flex gap-1 items-center font-semibold text-slate-500 text-sm ml-1'>
                    <IoMdPeople/>
                    <p>{komunitas.totalMembers}</p>
                  </div>
                </div>
                <div className='flex items-center mr-3'>
                <a href={`http://localhost:9191/invite/${komunitas.inviteCode}`}>
                    <button className='bg-white hover:bg-orange-400 px-4 py-1 rounded-md border-2 border-orange-400 font-bold text-slate-600 hover:text-white text-sm'>Open</button>
                </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default DashboardPopularCommunity