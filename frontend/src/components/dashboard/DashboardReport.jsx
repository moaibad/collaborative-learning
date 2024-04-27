import React from 'react'
import { Link } from 'react-router-dom';
import { FaPeopleGroup, FaArrowRightLong  } from "react-icons/fa6";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import avatar from "../../data/dashboard-profile.png"
import achievement1 from "../../data/achievement1.png"
import achievement2 from "../../data/achievement2.png"
import achievement3 from "../../data/achievement3.png"
import figure from "../../data/dashboard-profile.png"

const DashboardReport = () => {
  
  const role = localStorage.getItem("role");

  return (
  <>
    <div className=" w-full">
        {role === "student" ?
        <div className='bg-orange-400 rounded-3xl w-full h-40 flex justify-center items-center card-pattern opacity-1'>
            <div className='py-4 px-2 space-y-2.5 w-3/5 text-white -ml-8'>
                <p className='text-2xl font-bold'>Learning is Fun!</p>
                <p className='text-sm font-medium'>Explore your unlocked achievements and relive the moments of success and progress you've made on your journey.</p>
                <Link
                    to="/profile/achievement"
                >
                    <button className='mt-3 bg-white text-black font-semibold text-xs py-2 px-4 rounded-xl transition ease-in-out delay-50 hover:scale-110 duration-300'>View More</button>
                </Link>
            </div>
            <div className='flex'>
                <img className='h-24 w-24 bg-white p-2 rounded-full z-20' src={achievement1} alt="" />
                <img className='h-24 w-24 bg-white p-2 rounded-full -ml-8 z-10' src={achievement2} alt="" />
                <img className='h-24 w-24 bg-white p-2 rounded-full -ml-8' src={achievement3} alt="" />
            </div>
        </div>
        :
        <div className='bg-orange-400 rounded-3xl w-full h-40 flex justify-center items-center card-pattern opacity-1'>
            <div className='py-4 px-2 space-y-1 w-3/5 text-white -ml-8'>
                <p className='text-2xl font-bold'>Learning is Fun!</p>
                <p className='text-sm font-medium'>Join our collaborative learning app and be part of an engaging community where users, contribute to the knowledge pool by asking and answering questions. Let's enhance learning together!</p>
                <Link
                    to="/tanya-jawab"
                >
                    <button className='mt-3 bg-white text-black font-semibold text-xs py-2 px-4 rounded-xl transition ease-in-out delay-50 hover:scale-110 duration-300'>View More</button>
                </Link>
            </div>
            <div className='flex'>
                <img className='h-56 w-56 z-20' src={figure} alt="" />
            </div>
        </div>
        }
    </div>

    </>
  )
}

export default DashboardReport