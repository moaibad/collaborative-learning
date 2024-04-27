import React, { useState } from 'react'
import { IoMdPeople } from "react-icons/io";
import { useEffect } from 'react';
import { getDataCTB } from '../../lib/fetchData';
import { MdGroupOff } from "react-icons/md";
  
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

    
      // Menampilkan pesan jika tidak ada kursus atau kurang dari 3 kursus
      if (!Array.isArray(komunitas) || komunitas.length === 0) {
        return (
            <div className="w-full">
                <p className='text-xl font-bold mb-6'>Popular Community</p>
                <div className='w-full rounded-lg bg-white text-center h-82 border-4 border-dashed'>
                    <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                        <div className='place-self-center'>
                            <MdGroupOff size={72} />
                        </div>
                        <p className='font-semibold'>Belum ada komunitas yang tersedia</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
      <div className="w-full">
        <div className='flex justify-between'>
          <p className='text-xl font-bold mb-6'>Popular Community</p>
        </div>
        <div className='flex gap-5'>
          {komunitas.map((komunitas, index) => (
            <div key={index} className='shadow-md rounded-2xl'>
              <img className='m-0 p-0 w-72 h-36 object-cover rounded-2xl border' src={komunitas.imageUrl} alt="" />
              <div className='flex justify-center py-3 text-center items-center'>
                <p className='font-bold text-md px-2 truncate'>{komunitas.name}</p>
              </div>
              <div className='flex justify-between py-3'>
                <div className='bottom-2 leading-6 px-3'>
                  <div className='flex gap-1 items-center font-semibold text-slate-500 text-sm ml-1'>
                    <IoMdPeople/>
                    <p>{komunitas.totalMembers}</p>
                  </div>
                </div>
                <div className='flex items-center mr-3 px-1'>
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