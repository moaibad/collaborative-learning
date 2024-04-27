import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from 'antd';
import { TbNotesOff } from "react-icons/tb";
import avatar from "../../data/avatar.jpg";
import courses from '../../data/dataCourse';
import coursePage2 from "../../data/online-course.png";
import dummyLecturePic from "../../data/lecturer-role.png";
import { message } from 'antd';
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";
import Cookies from 'js-cookie';

const DashboardCourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    let userIdMoodle = Cookies.get('userIdMoodle');

    const handleClick = () => {
      navigate('/all-course');
    };

    const fetchData = async () => {
      
      if(userIdMoodle == null){
        userIdMoodle = '4'
      }

      const params = new URLSearchParams();
      params.append('wstoken', "1f95ee6650d2e1a6aa6e152f6bf4702c");
      params.append('wsfunction', 'core_enrol_get_users_courses');
      params.append('moodlewsrestformat', 'json');
      params.append('userid', userIdMoodle.toString());

      const apiUrl = `${HOST_MOODLE}/webservice/rest/server.php?${params.toString()}`;

      try {
        const response = await axios.get(apiUrl);
        console.log("Berhasil mendapatkan data kursus pengguna dari API Moodle:");
        console.log("DATA COURSE MOODLE : ",response.data);

        setCourses(response.data);

      } catch (error) {
        console.error('Error fetching user courses data from Moodle API:', error);
        message.error('get data course in dashboard');
      }

    }

    useEffect (()=>{
      
      fetchData();

    },[]); 

      // Menampilkan pesan jika tidak ada kursus atau kurang dari 3 kursus
      if ((!Array.isArray(courses) || courses.length === 0) || (courses.length === 1 && courses[0].displayname === "Quiz")) {
        return (
            <div className="w-full">
                <p className='text-xl font-bold mb-6'>Course List</p>
                <div className='w-full rounded-lg bg-white text-center h-82 border-4 border-dashed'>
                    <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                        <div className='place-self-center'>
                            <TbNotesOff size={72} />
                        </div>
                        <p className='font-semibold'>Tidak ada kursus yang diikuti</p>
                    </div>
                </div>
            </div>
        );
    }

    // Menampilkan maksimal 3 kursus
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