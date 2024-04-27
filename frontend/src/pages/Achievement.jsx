import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AchievementList from '../components/achievement/AchievementList';
import AchievementListPolygon from '../components/achievement/AchievementListPolygon';
import AchievementCariTeman from '../components/achievement/AchievementCariTeman'
import AchievementTanyaJawab from '../components/achievement/AchievementTanyaJawab';
import AchievementQuiz from '../components/achievement/AchievementQuiz';
import AchievementCourse from '../components/achievement/AchievementCourse';

const Achievement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='mx-20'>
      <div className='my-6'>
        <p className='w-full text-center text-3xl font-bold'>My Achievement</p>
      </div>
      {/* <div className='flex w-full justify-between my-6'>
        <div className='flex items-center gap-4 bg-white shadow-sm rounded-xl w-120 border-2 border-slate-300 p-4'>
          <div className='w-8'>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path d="M16 44L24 40L32 44V24.9444C29.877 26.8446 27.0734 28 24 28C20.9266 28 18.123 26.8446 16 24.9444V44Z" fill="#FB923C" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M36 16C36 19.554 34.455 22.7471 32 24.9444C29.877 26.8446 27.0734 28 24 28C20.9266 28 18.123 26.8446 16 24.9444C13.545 22.7471 12 19.554 12 16C12 9.37258 17.3726 4 24 4C30.6274 4 36 9.37258 36 16Z" fill="#FB923C" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24 21V11L22 12M24 21H26M24 21H22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </div>
          <p className='font-semibold'><span className='font-bold mr-2'>4/28</span>Unlocked Achievements</p>
        </div>
        <div className='w-full items-center flex justify-end'>

        </div>
      </div> */}
      <div className='my-8'>
        <AchievementCariTeman/>
      </div>
      <div className='my-8'>
        <AchievementTanyaJawab/>
      </div>
      <div className='my-8'>
        <AchievementQuiz/>
      </div>
      <div className='my-8'>
        <AchievementCourse/>
      </div>
    </div>
  );
};

export default Achievement;
