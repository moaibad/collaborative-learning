import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Importing images and functions from local directories
import { getDataCTB } from '../../lib/fetchData';
import communityBronze from '../../data/achievementCariTeman-1-1.png';
import communitySilver from '../../data/achievementCariTeman-1-2.png';
import communityGold from '../../data/achievementCariTeman-1-3.png';
import communityPlatinum from '../../data/achievementCariTeman-1-4.png';
import upvoteBronze from '../../data/achievementTanyaJawab-3-1.png';
import upvoteSilver from '../../data/achievementTanyaJawab-3-2.png';
import upvoteGold from '../../data/achievementTanyaJawab-3-3.png';
import upvotePlatinum from '../../data/achievementTanyaJawab-3-4.png';
import quizBronze from '../../data/achievementQuiz-1-1.png';
import quizSilver from '../../data/achievementQuiz-1-2.png';
import quizGold from '../../data/achievementQuiz-1-3.png';
import quizPlatinum from '../../data/achievementQuiz-1-4.png';

const CardMahasiswa = ({ mahasiswa }) => {
  const [user, setUser] = useState({});
  const [achievementListCommunity, setAchievementListCommunity] = useState([]);
  const [totalUpvote, setTotalUpvote] = useState(0);
  const [totalQuiz, setTotalQuiz] = useState(0);
  let idmoodle = 4;

  const cookies = new Cookies();
  const userId = cookies.get('userId');

  // Fetch user details
  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${mahasiswa.user_id_user}`);
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        if (error.response && error.response.status === 500) {
          // Handle specific error case here, e.g., notify user, retry logic, etc.
          console.error('Internal Server Error');
        }
      }
    };

    fetchUser();
  }, [mahasiswa.user_id_user]);

  // Fetch Moodle ID and Quiz data after user is fetched
  useEffect(() => {
    const fetchMoodleData = async () => {
      if (user.email) {
        try {
          const quizResponseId = await axios.get(`http://colle.koreacentral.cloudapp.azure.com/moodle/webservice/rest/server.php?wstoken=1f95ee6650d2e1a6aa6e152f6bf4702c&wsfunction=core_user_get_users_by_field&moodlewsrestformat=json&field=email&values[0]=${user.email}`);
          idmoodle = quizResponseId.data.length ? quizResponseId.data[0].id : 4;

          const quizResponse = await axios.get(`http://colle.koreacentral.cloudapp.azure.com/moodle/webservice/rest/server.php?wstoken=1f95ee6650d2e1a6aa6e152f6bf4702c&wsfunction=local_colle_get_all_user_best_grades&moodlewsrestformat=json&userid=${idmoodle}`);
          if (quizResponse.data.length && quizResponse.data[0].status !== "Student has not finished any quiz.") {
            setTotalQuiz(quizResponse.data.length);
          }
        } catch (error) {
          console.error('Failed to fetch Moodle data:', error);
          if (error.response && error.response.status === 500) {
            // Handle specific error case here
            console.error('Internal Server Error');
          }
        }
      }
    };

    fetchMoodleData();
  }, [user.email]);

  // Fetch other data based on user
  useEffect(() => {
    const fetchOtherData = async () => {
      if (user.username) {
        try {
          const achievementResponse = await getDataCTB(`/profiles/achievement/${user.username}`);
          if (achievementResponse) {
            setAchievementListCommunity(achievementResponse.community);
          }

          const userReputation = await axios.get(`http://localhost:3001/api/user?email=${user.email}`);
          if (userReputation.data) {
            setTotalUpvote(userReputation.data.totalUpvotes);
          }
        } catch (error) {
          console.error('Failed to fetch additional user data:', error);
          if (error.response && error.response.status === 500) {
            // Handle specific error case here
            console.error('Internal Server Error');
          }
        }
      }
    };

    fetchOtherData();
  }, [user.username]);


  const getCommunityMedal = () => {
    const count = achievementListCommunity;
    if (count === 0) return 0;
    if (count >= 1 && count < 5) return communityBronze;
    if (count >= 5 && count < 10) return communitySilver;
    if (count >= 10 && count < 20) return communityGold;
    if (count >= 20) return communityPlatinum;
  };

  const getQuizMedal = () => {
    const count = totalQuiz;
    if (count === 0) return 0;
    if (count >= 1 && count < 5) return quizBronze;
    if (count >= 5 && count < 10) return quizSilver;
    if (count >= 10 && count < 20) return quizGold;
    if (count >= 20) return quizPlatinum;
  };

  const getUpvoteMedal = () => {
    const count = totalUpvote;
    if (count === 0) return 0;
    if (count >= 1 && count < 5) return upvoteBronze;
    if (count >= 5 && count < 10) return upvoteSilver;
    if (count >= 10 && count < 20) return upvoteGold;
    if (count >= 20) return upvotePlatinum;
  };


  return (
    <div className="card max-w-52 h-150">
      <ul className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:justify-center lg:justify-start">
        <li className="my-1 px-1 w-full">
          <div className='rounded-lg bg-white shadow-md w-48 pb-2 relative'>
            <img className='rounded-t-lg w-full h-48 object-cover mb-2' src={user.profileUrl} alt="" />
            <div className="absolute -top-4 left-2 mt-6 bg-orange-300 font-bold px-2 py-1 rounded-md">
              <p className='text-xs'>Mahasiswa</p>
            </div>
            <div>
              <div className='text-center space-y-0.5'>
                <p className='font-bold text-xl h-7 truncate'>{user.username}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{mahasiswa.universitas}</p>
                <p className='font-semibold text-xs text-slate-500 truncate'>{mahasiswa.jurusan}</p>
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

export default CardMahasiswa;
