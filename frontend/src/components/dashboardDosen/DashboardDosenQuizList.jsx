import React, { useState, useEffect } from 'react'
import { TbNotesOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";
import Cookies from 'js-cookie';
import courses from '../../data/dataCourse';

const DashboardQuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const userIdMoodle = Cookies.get('userIdMoodle');

    useEffect(() => {
      const fetchData = async () => {
        try {
          let api;
          api = `${HOST_MOODLE}/webservice/rest/server.php?wstoken=${TOKEN_MOODLE}&moodlewsrestformat=json&wsfunction=local_colle_get_quiz&userid=${userIdMoodle}`;
          const response = await fetch(api);
          const data = await response.json();
          setQuizzes(data);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      };

      fetchData();
    });

    // Check if courses array is empty
    if (!Array.isArray(quizzes) || quizzes.length === 0) {
        return (
          <div className="w-full">
            <p className='text-xl font-bold mb-6'>Course List</p>
            <div className='w-full rounded-lg bg-white text-center h-82 border-4 border-dashed'>
                {/* <img className='m-0 p-0 w-72 h-36 object-cover rounded-t-lg' src={courseImages[index]} alt="" /> */}
                <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                    <div className='place-self-center'>
                      <TbNotesOff size={72} />
                    </div>
                    <p className='font-semibold'>Tidak ada Quiz yang dibuat</p>
                </div>
            </div>
          </div>
        );
      }

    const quizToShow = quizzes.slice(0, 3);

    return (
      <div className="w-full">
        <div className='flex justify-between'>
          <p className='text-xl font-bold mb-6'>Your Quiz List</p>
          {quizToShow.length > 2 &&
            <Link to="/quiz" className='text-orange-400 font-bold'>Lihat Selengkapnya</Link>
          }
        </div>
        <div className='flex gap-4'>
          {quizToShow.map((quiz) => (
            <Link key={quiz.id} to={quiz.url}>
              <div className='rounded-lg bg-white shadow-md h-full w-60'>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{quiz.name}</div>
                  <hr className="border-1 border-black" />
                  <p className="text-gray-700 text-base">{quiz.intro}</p>
                  <br></br>
                  <p className="text-gray-700 text-base font-bold italic">
                    Total Questions : <span className="font-bold italic">{quiz.total_questions}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}

export default DashboardQuizList;