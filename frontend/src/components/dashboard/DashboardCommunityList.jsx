import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { getDataCTB } from '../../lib/fetchData';
import { MdGroupOff } from "react-icons/md";

const DashboardCommunityList = () => {
    const [communityList, setCommunityList] = useState([]);
    const [profile, setProfile] = useState([]); // Add this line
    const [email, setEmail] = useState(''); // Add this line
    const [showAllCommunities, setShowAllCommunities] = useState(false); // State to track whether to show all communities
    const [minimize, setMinimize] = useState(false);

    useEffect(() => {
        const cookies = new Cookies();
        const email = cookies.get('email');
        setEmail(email);

        const fetchProfileAndCommunityList = async () => {
            try {
                const profileResponse = await getDataCTB(`/profiles/findidbyemail/${email}`);
                if (profileResponse && profileResponse.user && profileResponse.user.id) {
                    const profileId = profileResponse.user.id;
                    setProfile(profileId);
                    
                    const communityListResponse = await getDataCTB(`/profiles/findallserver/${profileId}`);
                    if (communityListResponse && communityListResponse.community) {
                        setCommunityList(communityListResponse.community);
                    }
                }
            } catch (error) {
                console.error('Error fetching profile and community list:', error);
            }
        };
    
        if (email) {
            fetchProfileAndCommunityList();
        }
    }, [email]);

    return (
        <div>
            <div className="border-2 border-slate-200 rounded-xl bg-white p-4 mr-4">
                <p className='text-xl font-bold mb-4'>Community Lists</p>
                <div className=''>
                    {/* Render all communities if showAllCommunities is true, otherwise render the first three */}
                    {(showAllCommunities ? communityList : communityList.slice(0, 3)).map((community, index) => (
                        <div key={index} className='flex items-center justify-between border-b-2 border-gray-100 p-4'>
                            <div className='flex items-center'>
                                <img src={community.imageUrl} alt="community" className='w-16 h-16 rounded-full' />
                                <div className='ml-4'>
                                    <p className='font-bold'>{community.name}</p>
                                    <p className='text-sm'>{community.totalMember} Members</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Check if there are more than three communities and show appropriate button based on minimize state */}
                    {communityList.length > 3 && (
                        <div className='flex items-center justify-center mt-4'>
                            <button onClick={() => setShowAllCommunities(!showAllCommunities)} className='bg-orange-400 hover:bg-orange-600 p-3 text-white rounded-3xl font-bold text-sm px-10'>
                                {showAllCommunities ? 'Minimize' : 'Lihat Selengkapnya'}
                            </button>
                        </div>
                    )}
                </div>
                {/* Else statement */}
                {!showAllCommunities && communityList.length < 1 && (
                    <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                        <div className='place-self-center'>
                          <MdGroupOff size={72} />
                        </div>
                        <p className='font-semibold'>Tidak ada community yang diikuti</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardCommunityList;