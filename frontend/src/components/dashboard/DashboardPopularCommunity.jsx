import React from 'react'
import { Progress } from 'antd';
import { TbNotesOff } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";
import komunitas from '../../data/dataKomunitas';
  
  const DashboardPopularCommunity = () => {

    const komunitasToShow = komunitas.slice(0, 3);

    return (
      <div className="w-full">
        <div className='flex justify-between'>
          <p className='text-xl font-bold mb-6'>Popular Community</p>
          {komunitasToShow.length > 2 &&
            <p className='text-orange-400 font-bold'>Lihat Selengkapnya</p>
          }
        </div>
        <div className='flex gap-5'>
          {komunitasToShow.map((komunitas, index) => (
            <div key={index} className=''>
              <img className='m-0 p-0 w-72 h-36 object-cover rounded-2xl' src={komunitas.Image} alt="" />
              <div className='flex justify-between py-3'>
                <div className='bottom-2 leading-6'>
                  <p className='font-bold text-xl'>{komunitas.Nama}</p>
                  <div className='flex gap-1 justify-center items-center font-semibold text-slate-500 text-sm'>
                    <IoMdPeople/>
                    <p>{komunitas.Anggota}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                    <button className='bg-white hover:bg-orange-400 px-4 py-1 rounded-md border-2 border-orange-400 font-bold text-slate-600 hover:text-white text-sm'>Join</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default DashboardPopularCommunity