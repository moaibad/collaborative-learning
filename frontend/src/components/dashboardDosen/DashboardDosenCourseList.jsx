import React, { useState, useEffect } from 'react'
import { TbNotesOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import avatar from "../../data/avatar.jpg";
import coursePage2 from "../../data/online-course.png";
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";
import Cookies from 'js-cookie';
  
  const DashboardCourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    let userIdMoodle = Cookies.get('userIdMoodle');

    const handleClick = () => {
      navigate('/course');
    };

    useEffect(() => {
      // Fetch course data from the appropriate endpoint based on role
      const fetchData = async () => {

        if(userIdMoodle == null){
          userIdMoodle = '4'
        }
        
        try {
          const endpoint = `${HOST_MOODLE}/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${TOKEN_MOODLE}&wsfunction=core_enrol_get_users_courses&userid=${userIdMoodle}`;

          const response = await fetch(endpoint);
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchData();
    });
  
    // Check if courses array is empty
    if ((!Array.isArray(courses) || courses.length === 0) && (courses.length === 1 && courses[0].displayname === "Quiz")) {
        return (
          <div className="w-full">
            <p className='text-xl font-bold mb-6'>Course List</p>
            <div className='w-full rounded-lg bg-white text-center h-82 border-4 border-dashed'>
                {/* <img className='m-0 p-0 w-72 h-36 object-cover rounded-t-lg' src={courseImages[index]} alt="" /> */}
                <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                    <div className='place-self-center'>
                      <TbNotesOff size={72} />
                    </div>
                    <p className='font-semibold'>Tidak ada course yang diikuti</p>
                </div>
            </div>
          </div>
        );
      }

    const coursesToShow = courses.slice(0, 3);

    return (
      <div className="w-full">
        <div className='flex justify-between'>
          <p className='text-xl font-bold mb-6'>Course List</p>
          {coursesToShow.length > 3 &&
            <p className='text-orange-400 font-bold' onClick={handleClick}>Lihat Selengkapnya</p>
          }
        </div>
        <div className='flex gap-4'>
          {coursesToShow.map((course, index) => (
            // Check if displayname is not 'Quiz'
            course.displayname !== 'Quiz' && (
              <div key={index} className='rounded-lg bg-white shadow-md h-82 w-72'>
                <Link to={`${HOST_MOODLE}/course/view.php?id=${course.id}`}>
                  <img className='m-0 p-0 w-72 h-36 object-cover rounded-t-lg' src={coursePage2} alt="" />
                  {/* <img className='m-0 p-0 w-72 h-36 object-cover rounded-t-lg' src={course.courseimage} alt="" /> */}
                  <div className='p-3'>
                    <div className='bottom-2 leading-6'>
                      {/* Menggunakan Link untuk mengelilingi judul kursus */}
                      <Link to={`${HOST_MOODLE}/course/view.php?id=${course.id}`}>
                        <p className='font-bold text-xl'>{course.displayname}</p>
                      </Link>
                      {/* <p className='font-bold text-xl'>awe</p> */}
                      {/* <div className='mt-2 items-center'>
                          <Progress percent={course.progress} status="active" />
                      </div> */}
                    </div>
                  </div>
                </Link>
              </div>
            )
          ))}
        </div>
      </div>
    );  
  };

export default DashboardCourseList