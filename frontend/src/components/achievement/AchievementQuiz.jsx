import React from 'react'

import achievement_1_1 from '../../data/achievementQuiz-1-1.png';
import achievement_1_2 from '../../data/achievementQuiz-1-2.png';
import achievement_1_3 from '../../data/achievementQuiz-1-3.png';
import achievement_1_4 from '../../data/achievementQuiz-1-4.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const AchievementQuiz = () => {
    const [totalQuiz, setTotalQuiz] = useState(0);
    const [quizAchievement, setQuizAchievement] = useState([]); 
    const [user, setUser] = useState({});

    useEffect(() => {
        const cookies = new Cookies();
        const userId = cookies.get('userId');

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}`);
                if (response.data) {
                    setUser(response.data);
                }

                //get list quiz achievement
                const quizResponse = await axios.get(`http://colle.koreacentral.cloudapp.azure.com/moodle/webservice/rest/server.php?wstoken=1f95ee6650d2e1a6aa6e152f6bf4702c&wsfunction=local_colle_get_all_user_best_grades&moodlewsrestformat=json&userid=${userId}`);
                if (quizResponse && quizResponse.data[0].status != "Student has not finished any quiz.") {
                  setQuizAchievement(quizResponse.data);
                  setTotalQuiz(quizResponse.data.length);
                }
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        };

        fetchData();
    }, [totalQuiz, quizAchievement, user]);


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
            <p className='font-bold text-2xl m-4 mb-0'>Quiz</p>
            <p className='m-4 mb-1 font-semibold text-xl'>Mengikuti Quiz</p>
            <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center p-4'>
                {totalQuiz >=1
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-brown py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_1} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Quiz Participant</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 1 Quiz</p>
                            </div>
                        </div>
                    :   blank
                }
                {totalQuiz >=5
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-silver py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_2} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Quiz Participant</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 5 Quiz</p>
                            </div>
                        </div>
                    :   blank
                }
                {totalQuiz >=10
                    ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                            <div className="bg-gold py-2 rounded-t-xl">
                                <div className='h-20 m-4 flex justify-center'>
                                    <img className='' src={achievement_1_3} alt="" />
                                </div>
                            </div>
                            <div className='mx-4 my-4'>
                                <p className='font-bold text-lg mb-2'>Quiz Participant</p>
                                <p className='font-semibold text-slate-400'>Mengikuti 10 Quiz</p>
                            </div>
                        </div>
                    :   blank
                }
                {totalQuiz >=20
                ?   <div className='ring ring-slate-300 ring-offset-0 rounded-xl'>
                        <div className="bg-platinum py-2 rounded-t-xl">
                            <div className='h-20 m-4 flex justify-center'>
                                <img className='' src={achievement_1_4} alt="" />
                            </div>
                        </div>
                        <div className='mx-4 my-4'>
                            <p className='font-bold text-lg mb-2'>Quiz Participant</p>
                            <p className='font-semibold text-slate-400'>Mengikuti 20 Quiz</p>
                        </div>
                    </div>
                :   blank
                }
            </div>
        </div>
    </div>
  )
}

export default AchievementQuiz