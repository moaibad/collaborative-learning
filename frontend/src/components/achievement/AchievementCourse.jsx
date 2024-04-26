import React from 'react'

import achievement_1_1 from '../../data/achievementCourse-1-1.png';
import achievement_1_2 from '../../data/achievementCourse-1-2.png';
import achievement_1_3 from '../../data/achievementCourse-1-3.png';
import achievement_1_4 from '../../data/achievementCourse-1-4.png';

const AchievementCourse = () => {

    const joinCourse = 20;

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
            <p className='font-bold text-2xl m-4 mb-0'>Course</p>
            <p className='m-4 mb-1 font-semibold text-xl'>Bergabung dengan Course</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {joinCourse >=1
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-brown py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_1} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Course Adventurer</p>
                                <p className='font-semibold text-slate-400'>Bergabung dengan 1 Course</p>
                            </div>
                        </div>
                    :   blank
                }
                {joinCourse >=5
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-silver py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_2} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Course Adventurer</p>
                                <p className='font-semibold text-slate-400'>Bergabung dengan 5 Course</p>
                            </div>
                        </div>
                    :   blank
                }
                {joinCourse >=10
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-gold py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_3} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Course Adventurer</p>
                                <p className='font-semibold text-slate-400'>Bergabung dengan 10 Course</p>
                            </div>
                        </div>
                    :   blank
                }
                {joinCourse >=20
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-platinum py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_4} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Course Adventurer</p>
                            <p className='font-semibold text-slate-400'>Bergabung dengan 20 Course</p>
                        </div>
                    </div>
                :   blank
                }
            </div>
        </div>
    </div>
  )
}

export default AchievementCourse