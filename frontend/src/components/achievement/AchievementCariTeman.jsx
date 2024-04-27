import React from 'react'

import achievement_1_1 from '../../data/achievementCariTeman-1-1.png';
import achievement_1_2 from '../../data/achievementCariTeman-1-2.png';
import achievement_1_3 from '../../data/achievementCariTeman-1-3.png';
import achievement_1_4 from '../../data/achievementCariTeman-1-4.png';
import achievement_2_1 from '../../data/achievementCariTeman-2-1.png';
import achievement_2_2 from '../../data/achievementCariTeman-2-2.png';
import achievement_2_3 from '../../data/achievementCariTeman-2-3.png';
import achievement_2_4 from '../../data/achievementCariTeman-2-4.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getDataCTB } from '../../lib/fetchData';

const AchievementCariTeman = () => {
    const [user, setUser] = useState({});
    const [achievementListCommunity, setAchievementListCommunity] = useState([]);
    const [achievementFriend, setAchievementFriend] = useState([]);
    const [community, setCommunity] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        const cookies = new Cookies();
        const userId = cookies.get('userId');

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}`);
                if (response.data) {
                    setUser(response.data);
                }

                //get list community achievement
                const achievementResponse = await getDataCTB(`/profiles/achievement/${user.username}`);
                if (achievementResponse) {
                    setAchievementListCommunity(achievementResponse.community);
                    setCommunity(achievementResponse.community);
                }

                //get list friend achievement
                const levelResponse = await getDataCTB(`/profiles/leveling/${user.username}`);
                if (levelResponse) {
                    setAchievementFriend(levelResponse.level);
                    //set level
                    if (levelResponse.level < 50) {
                        setLevel(1);
                    } else if (levelResponse.level >= 50 && levelResponse.level < 150) {
                        setLevel(2);
                    } else if (levelResponse.level >= 150 && levelResponse.level < 350) {
                        setLevel(3);
                    } else if (levelResponse.level >= 350) {
                        setLevel(4);
                    }
                }
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        };

        fetchData();
    }, [community, user.nama, achievementListCommunity, level]);

    const blank =
        <div className='border-4 border-slate-300 border-dashed rounded-xl'>
            <div className="py-2 rounded-t-xl">
                <div className='h-40 m-4 flex justify-center'>
                </div>
            </div>
            <div className='mx-4 my-4'>
            </div>
        </div>

    return (
        <>
            <div className='border-3 border-slate-300 rounded-xl'>
                <p className='font-bold text-2xl m-4 mb-0'>Cari Teman</p>
                {/* Start Achievement 1 */}
                <p className='m-4 mb-1 font-semibold text-xl'>Mengikuti Komunitas</p>
                <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                    {community >= 1
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-brown py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_1} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Social Butterfly</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 1 Komunitas</p>
                            </div>
                        </div>
                        : blank
                    }
                    {community >= 5
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-silver py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_2} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Social Butterfly</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 5 Komunitas</p>
                            </div>
                        </div>
                        : blank
                    }
                    {community >= 10
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-gold py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_3} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Social Butterfly</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 10 Komunitas</p>
                            </div>
                        </div>
                        : blank
                    }
                    {community >= 20
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-platinum py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_4} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Social Butterfly</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 20 Komunitas</p>
                            </div>
                        </div>
                        : blank
                    }
                </div>
                {/* End Achievement 1 */}
                {/* Start Achievement 2 */}
                <p className='m-4 mb-1 font-semibold text-xl'>Mencapai Level Pertemenan</p>
                <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                    {level >= 1
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-brown py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_2_1} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Friendship Explorer</p>
                                <p className='font-semibold text-slate-400'>Mencapai Level Pertemanan Stranger</p>
                            </div>
                        </div>
                        : blank
                    }
                    {level >= 2
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-silver py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_2_2} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Friendship Explorer</p>
                                <p className='font-semibold text-slate-400'>Mencapai Level Pertemanan Friend</p>
                            </div>
                        </div>
                        : blank
                    }
                    {level >= 3
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-gold py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_2_3} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Friendship Explorer</p>
                                <p className='font-semibold text-slate-400'>Mencapai Level Pertemanan Acquintance</p>
                            </div>
                        </div>
                        : blank
                    }
                    {level >= 4
                        ? <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-platinum py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_2_4} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Friendship Explorer</p>
                                <p className='font-semibold text-slate-400'>Mencapai Level Pertemanan Best Friend Forever</p>
                            </div>
                        </div>
                        : blank
                    }
                </div>
                {/* End Achievement 2 */}
            </div>
        </>
    )
}

export default AchievementCariTeman