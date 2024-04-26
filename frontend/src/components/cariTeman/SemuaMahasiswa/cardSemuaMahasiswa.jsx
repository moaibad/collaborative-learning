import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import communityBronze from '../../../data/achievementCariTeman-1-1.png';
import communitySilver from '../../../data/achievementCariTeman-1-2.png';
import communityGold from '../../../data/achievementCariTeman-1-3.png';
import communityPlatinum from '../../../data/achievementCariTeman-1-4.png';
import upvoteBronze from '../../../data/achievementTanyaJawab-3-1.png';
import upvoteSilver from '../../../data/achievementTanyaJawab-3-2.png';
import upvoteGold from '../../../data/achievementTanyaJawab-3-3.png';
import upvotePlatinum from '../../../data/achievementTanyaJawab-3-4.png';
import quizBronze from '../../../data/achievementQuiz-1-1.png';
import quizSilver from '../../../data/achievementQuiz-1-2.png';
import quizGold from '../../../data/achievementQuiz-1-3.png';
import quizPlatinum from '../../../data/achievementQuiz-1-4.png';
import { getDataCTB } from '../../../lib/fetchData';
import Cookies from 'universal-cookie';


const CardSemuaMahasiswa = ({ allmahasiswa }) => {
  const [user, setUser] = useState({});
  const [achievementList, setAchievementList] = useState([]);
  const [tanyajawabData, setTanyajawabData] = useState([]);
  const [totalCommunity, setTotalCommunity] = useState(0);
  const [totalUpvote, setTotalUpvote] = useState(0);
  const [totalQuiz, setTotalQuiz] = useState(0);

  useEffect(() => {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${allmahasiswa.user_id_user}`);
        if (response.data) {
          setUser(response.data);
        }

        console.log(user);
        const achievementResponse = await getDataCTB(`/profiles/achievement/${user.username}`);
        console.log("achievementResponse:", achievementResponse);
        if (achievementResponse) {
          setAchievementList(achievementResponse.community);
          setTotalCommunity(achievementResponse.community.length);
          console.log("achievementList:", achievementList);
        }

        //set user reputation
        const userReputation = await axios.get(`http://localhost:3001/api/user?email=${user.email}`);
        setTanyajawabData(userReputation.data);
        setTotalUpvote(userReputation.data.totalUpvotes);

        //set quiz achievement
        const quizResponse = await axios.get(`http://colle.koreacentral.cloudapp.azure.com/moodle/webservice/rest/server.php?wstoken=1f95ee6650d2e1a6aa6e152f6bf4702c&wsfunction=local_colle_get_all_user_best_grades&moodlewsrestformat=json&userid=${userId}`);
        if (quizResponse && quizResponse.data[0].status != "Student has not finished any quiz.") {
          setTotalQuiz(quizResponse.data.length);
        }
      } catch (error) {
        console.error('Error fetching allmahasiswa list:', error);
      }
    };

    fetchData();
  }, [allmahasiswa.user_id_user, user.nama, totalUpvote, achievementList, totalQuiz]);

  const getCommunityMedal = () => {
    const count = achievementList;
    if (count === 0) return 0;
    if (count >= 1) return communityBronze;
    if (count >= 5) return communitySilver;
    if (count >= 10) return communityGold;
    if (count >= 20) return communityPlatinum;
  };

  const getQuizMedal = () => {
    const count = totalQuiz;
    if (count === 0) return 0;
    if (count >= 1) return quizBronze;
    if (count >= 5) return quizSilver;
    if (count >= 10) return quizGold;
    if (count >= 20) return quizPlatinum;
  };

  const getUpvoteMedal = () => {
    const count = totalUpvote;
    if (count === 0) return 0;
    if (count >= 1) return upvoteBronze;
    if (count >= 5) return upvoteSilver;
    if (count >= 10) return upvoteGold;
    if (count >= 20) return upvotePlatinum;
  };

  return (
    <div className="card w-64 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='rounded-lg bg-white shadow-md w-56 pb-2 relative'>
            <img className='rounded-t-lg w-full h-48 object-cover mb-2' src={user.profileUrl} alt="" />
            <div className="absolute -top-4 left-2 mt-6 bg-orange-300 font-bold px-2 py-1 rounded-md">
              <p className='text-xs'>Mahasiswa</p>
            </div>
            <div>
              <div className='text-center space-y-0.5'>
                <p className='font-bold text-xl h-7 truncate'>{user.username}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{allmahasiswa.universitas}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{allmahasiswa.jurusan}</p>
              </div>
              <div className='my-2 mx-2 max-h-0.5 min-h-0.5 border-0 bg-gradient-to-r from-purple-500 to-white'></div>
              <div className='flex justify-evenly items-center mx-3 font-bold text-xs'>
                <div className='-ml-1.5'>
                  <p>Achievement</p>
                  <div className='flex mt-1'>
                    {getCommunityMedal() === 0 && getQuizMedal() === 0 && getUpvoteMedal() === 0 ? (
                      <>
                      <p className='text-xs m-1'>Belum ada</p>
                      </>
                    ) : (
                      <>
                        {getCommunityMedal() !== 0 && <img src={getCommunityMedal()} alt="medal" className="w-6 h-6 mr-1" />}
                        {getQuizMedal() !== 0 && <img src={getQuizMedal()} alt="medal" className="w-6 h-6 mr-1" />}
                        {getUpvoteMedal() !== 0 && <img src={getUpvoteMedal()} alt="medal" className="w-6 h-6 mr-1" />}
                      </>
                    )}
                  </div>
                </div>
                <div className='text-center'>
                  <p className=''>Upvote</p>
                  <p className='text-lg'>{totalUpvote}</p>
                </div>
              </div>
              <div className='my-2 mx-2 max-h-0.5 min-h-0.5 border-0 bg-gradient-to-r from-purple-500 to-white'></div>
              <div className='flex w-full'>
                <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                  <p className='font-bold'>Bergabung</p>
                  <p className='line-clamp-1'>{new Date(user.tanggal_daftar).getDate()} {new Date(user.tanggal_daftar).toLocaleString('default', { month: 'long' })} {new Date(user.tanggal_daftar).getFullYear()}</p>
                </div>
                <div className='mx-2 text-xxs space-y-0.5 w-1/2 text-center'>
                  <p className='font-bold'>Kota/Kabupaten</p>
                  <p className='line-clamp-1'>{user.location}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardSemuaMahasiswa;
