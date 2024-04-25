import React from 'react'

import achievement_1_1 from '../../data/achievementTanyaJawab-1-1.png';
import achievement_1_2 from '../../data/achievementTanyaJawab-1-2.png';
import achievement_1_3 from '../../data/achievementTanyaJawab-1-3.png';
import achievement_1_4 from '../../data/achievementTanyaJawab-1-4.png';
import achievement_2_1 from '../../data/achievementTanyaJawab-2-1.png';
import achievement_2_2 from '../../data/achievementTanyaJawab-2-2.png';
import achievement_2_3 from '../../data/achievementTanyaJawab-2-3.png';
import achievement_2_4 from '../../data/achievementTanyaJawab-2-4.png';

const AchievementTanyaJawab = () => {

    const membuatPertanyaan = 20
    const menjawabPertanyaan = 10
    const upvote = 0

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
            <p className='font-bold text-2xl m-4 mb-0'>Tanya Jawab</p>
            {/* Start Achievement 1 */}
            <p className='m-4 mb-1 font-semibold text-xl'>Membuat Pertanyaan</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {membuatPertanyaan >=1
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-brown py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_1} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Curious Mind</p>
                            <p className='font-semibold text-slate-400'>Berhasil Membuat 1 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
                {membuatPertanyaan >=5
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-silver py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_2} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Question Fever</p>
                            <p className='font-semibold text-slate-400'>Berhasil Membuat 5 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
                {membuatPertanyaan >=10
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-gold py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_3} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Question Fever</p>
                            <p className='font-semibold text-slate-400'>Berhasil Membuat 10 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
                {membuatPertanyaan >=20
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-platinum py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_4} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Question Fever</p>
                            <p className='font-semibold text-slate-400'>Berhasil Membuat 20 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
            </div>
            {/* End Achievement 1 */}
            {/* Start Achievement 2 */}
            <p className='m-4 mb-1 font-semibold text-xl'>Menjawab Pertanyaan</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {menjawabPertanyaan >=1
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-brown py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_2_1} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Knowledge Seeker</p>
                            <p className='font-semibold text-slate-400'>Berhasil Menjawab 1 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
                {menjawabPertanyaan >=5
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-silver py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_2_2} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Knowledge Seeker</p>
                            <p className='font-semibold text-slate-400'>Berhasil Menjawab 5 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
                {menjawabPertanyaan >=10
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-gold py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_2_3} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Knowledge Seeker</p>
                            <p className='font-semibold text-slate-400'>Berhasil Menjawab 10 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
                {menjawabPertanyaan >=20
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-platinum py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_2_4} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Knowledge Seeker</p>
                            <p className='font-semibold text-slate-400'>Berhasil Menjawab 20 Pertanyaan</p>
                        </div>
                    </div>
                :   blank
                }
            </div>
            {/* End Achievement 2 */}
            {/* Start Achievement 3 */}
            <p className='m-4 mb-1 font-semibold text-xl'>Mendapat Upvote</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {upvote >=1
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-brown py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_1} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Upvote Recognition</p>
                            <p className='font-semibold text-slate-400'>Mendapat 1 Upvote</p>
                        </div>
                    </div>
                :   blank
                }
                {upvote >=5
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-silver py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_2} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Upvote Recognition</p>
                            <p className='font-semibold text-slate-400'>Mendapat 5 Upvote</p>
                        </div>
                    </div>
                :   blank
                }
                {upvote >=10
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-gold py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_3} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Upvote Recognition</p>
                            <p className='font-semibold text-slate-400'>Mendapat 10 Upvote</p>
                        </div>
                    </div>
                :   blank
                }
                {upvote >=20
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-platinum py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_4} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Upvote Recognition</p>
                            <p className='font-semibold text-slate-400'>Mendapat 20 Upvote</p>
                        </div>
                    </div>
                :   blank
                }
            </div>
            {/* End Achievement 3 */}
        </div>
    </div>
  )
}

export default AchievementTanyaJawab