import React from 'react'

import achievement_1_1 from '../../data/achievementCariTeman-1-1.png';
import achievement_1_2 from '../../data/achievementCariTeman-1-2.png';
import achievement_1_3 from '../../data/achievementCariTeman-1-3.png';
import achievement_1_4 from '../../data/achievementCariTeman-1-4.png';
import achievement_2_1 from '../../data/achievementCariTeman-2-1.png';
import achievement_2_2 from '../../data/achievementCariTeman-2-2.png';
import achievement_2_3 from '../../data/achievementCariTeman-2-3.png';
import achievement_2_4 from '../../data/achievementCariTeman-2-4.png';

const AchievementCariTeman = () => {

    const community = 20;
    const level = 4;


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
    <div>
        <div className='border-3 border-slate-300 rounded-xl'>
            <p className='font-bold text-2xl m-4 mb-0'>Cari Teman</p>
            {/* Start Achievement 1 */}
            <p className='m-4 mb-1 font-semibold text-xl'>Mengikuti Komunitas</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {community >=1
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                    :   blank
                }
                {community >=5
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                    :   blank
                }
                {community >=10
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                    :   blank
                }
                {community >=20
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                :   blank
                }
            </div>
            {/* End Achievement 1 */}
            {/* Start Achievement 2 */}
            <p className='m-4 mb-1 font-semibold text-xl'>Mencapai Level Pertemenan</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {level >=1
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                    :   blank
                }
                {level >=2
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                    :   blank
                }
                {level >=3
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                    :   blank
                }
                {level >=4
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
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
                :   blank
                }
            </div>
            {/* End Achievement 2 */}
        </div>
    </div>
  )
}

export default AchievementCariTeman