import React, { useState, useEffect } from 'react';
import course1 from '../../data/product1.jpg';
import course2 from '../../data/product2.jpg';
import course3 from '../../data/product3.jpg';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { getDataCTB } from '../../lib/fetchData';

const DashboardCommunityList = () => {
    const [communityList, setCommunityList] = useState([]);

    useEffect(() => {
        const fetchCommunityList = async () => {
            try {
                // Fetch community list from the backend
                const datanya = await getDataCTB('/profiles/findallserver/af9384c7-519a-443f-b538-1183f4e0ff8a');
                console.log(datanya.community);
                if (datanya) {
                    setCommunityList(datanya.community);
                }
            } catch (error) {
                console.error('Error fetching community list:', error);
            }
        };

        fetchCommunityList();
    }, []);


    return (
        <div>
            <div className="shadow-md rounded-xl bg-white p-4 mr-4">
                <p className='text-xl font-bold mb-4'>Community Lists</p>
                <div className=''>
                    {/* Conditionally render based on whether communityList is empty or not */}
                    {communityList.length > 0 ? (
                        communityList.map((community, index) => (
                            <div key={index} className='flex items-center justify-between border-b-2 border-gray-100 p-4'>
                                <div className='flex items-center'>
                                    <img src={community.imageUrl} alt="community" className='w-16 h-16 rounded-full' />
                                    <div className='ml-4'>
                                        <p className='font-bold'>{community.name}</p>
                                        <p className='text-sm'>{community.totalMember} Members</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p> // Show a loading message if communityList is empty during initial render
                    )}
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <button className='bg-orange-400 hover:bg-orange-600 p-3 text-white rounded-3xl font-bold text-sm px-10'>Lihat Selengkapnya</button>
                </div>
            </div>
        </div>
    );
}

export default DashboardCommunityList;