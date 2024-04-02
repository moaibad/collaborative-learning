import React, { useState, useEffect } from 'react';
import course1 from '../../data/product1.jpg';
import course2 from '../../data/product2.jpg';
import course3 from '../../data/product3.jpg';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { getDataCTB } from '../../lib/fetchData';

const DashboardCommunityList = () => {
  const [communityList, setCommunityList] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('user_token');

  useEffect(() => {
    const fetchCommunityList = async () => {
      try {
        // Fetch community list from the backend
        const datanya = await getDataCTB('/profiles/findallserver/0bf38bc8-9a2f-41c3-b260-fe04eba788dc');
        console.log(datanya);
        if (datanya) {
            setCommunityList(datanya);
            }
        } catch (error) {
            console.error('Error fetching community list:', error);
        }
    };        
    //     // Access the response data directly from Axios
    //     if (response.status === 200) {
    //       const data = response.data;
    //       setCommunityList(data);
    //       console.log(data); // Log the fetched data, not communityList
    //     }
    //   } catch (error) {
    //     console.error('Error fetching community list:', error);
    //   }
    // };
  
    fetchCommunityList();
  }, []); 

  return (
    <div>
      <div className="shadow-md rounded-xl bg-white p-4 mr-4">
        <p className='text-xl font-bold mb-4'>Community Lists</p>
        <div className=''>
          {/* Mapping over communityList to render each community */}
          {communityList.map((community, index) => (
            <div key={index} className='flex rounded-lg bg-white shadow-md p-3 h-20 w-full mb-2 relative items-center'>
              <img className='m-0 p-0 w-16 h-16 object-cover rounded-lg' src={course1} alt="" />
              <div className='ml-2'>
                <div className=''>
                  <p className='font-bold text-sm'>{community.name}</p>
                  <p className='text-sm text-slate-500 font-semibold'>Jumlah Anggota: {community.totalMember}</p>
                </div>
              </div>
            </div>
          ))}
          <div className='flex items-center justify-center mt-4'>
            <button className='bg-orange-400 hover:bg-orange-600 p-3 text-white rounded-3xl font-bold text-sm px-10'>Lihat Selengkapnya</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCommunityList;
