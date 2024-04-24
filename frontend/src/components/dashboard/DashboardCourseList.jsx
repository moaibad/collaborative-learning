import React from 'react'
import { Progress } from 'antd';
import { TbNotesOff } from "react-icons/tb";
import courses from '../../data/dataCourse';
  
  const DashboardCourseList = () => {
  
    // Check if courses array is empty
    if (!Array.isArray(courses) || courses.length === 0) {
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
          {coursesToShow.length > 2 &&
            <p className='text-orange-400 font-bold'>Lihat Selengkapnya</p>
          }
        </div>
        <div className='flex gap-4'>
          {coursesToShow.map((course, index) => (
            <div key={index} className='rounded-lg bg-white shadow-md h-82 w-72'>
              <img className='m-0 p-0 w-72 h-36 object-cover rounded-t-lg' src={course.imageCourse} alt="" />
              <div className='p-3'>
                <div className='bottom-2 leading-6'>
                  <div className='flex gap-2'>
                    <img className='h-6 w-6 rounded-full' src={course.imageLecturer} alt="" />
                    <p>{course.instructor}</p>
                  </div>
                  <p className='font-bold text-xl'>{course.title}</p>
                  {/* <div className='mt-2 items-center'>
                    <Progress percent={course.progress} status="active" />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default DashboardCourseList