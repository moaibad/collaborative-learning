import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import avatar from "../../data/avatar.jpg";
import coursePage2 from "../../data/online-course.png";
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";
import Cookies from 'js-cookie';

const CourseList = ({ role }) => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai pencarian
  const userIdMoodle = Cookies.get('userIdMoodle');

  useEffect(() => {
    // Fetch course data from the appropriate endpoint based on role
    const fetchData = async () => {
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
  }, [role]); // Fetch data whenever role changes

  // Fungsi untuk melakukan pencarian berdasarkan displayname
  const searchCourses = (term) => {
    if (!Array.isArray(courses)) {
      console.error("courses is not an array");
      return [];
    }
    return courses.filter((course) =>
      course.displayname.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Handler untuk mengupdate nilai pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter courses based on search term
  const filteredCourses = searchCourses(searchTerm);

  return (
    <div>
      {/* search box */}
      <div className="max-w-full mx-1 mb-3">
        <div
          className="relative flex items-center w-full h-full rounded-lg focus-within:shadow-l overflow-hidden"
          style={{ backgroundColor: "#F5F6F8" }}
        >
          <div className="grid place-items-center h-full w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#B2B5BC"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 py-3 pr-2"
            style={{ backgroundColor: "#F5F6F8" }}
            type="text"
            id="search"
            placeholder="Search for courses.."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/* list course  */}
      <div className="grid grid-cols-3 gap-4">
        {filteredCourses.length > 1 ? (
          filteredCourses.map((course) => (
            // Check if displayname is not 'Quiz' and not 'Collaborative Learning'
            course.displayname !== 'Quiz' && course.displayname !== 'Collaborative Learning' && (
              <div
                key={course.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img
                    className="w-full object-cover h-48"
                    src={coursePage2}
                    alt={coursePage2}
                  />
                  {role === "teacher" && (
                    <button
                      onClick={() =>
                        (window.location.href = `${HOST_MOODLE}/course/edit.php?id=${course.id}`)
                      }
                      className="absolute top-0 right-0 text-xl font-bold text-orange-500 p-2 rounded bg-transparent hover:bg-orange-600 hover:text-white"
                    >
                      <LuPencilLine />
                    </button>
                  )}
                </div>
                <div className="px-6 py-4">
                  <Link
                    key={course.id}
                    to={`${HOST_MOODLE}/course/view.php?id=${course.id}`}
                  >
                    <div className="font-bold text-xl mb-2">
                      {course.displayname}
                    </div>
                  </Link>
                  {role !== "teacher" && (
                    <>
                      <hr className="border-1 border-gray-600" />
                      <div className="flex items-center justify-between gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                        <img
                          className="rounded-full w-8 h-8"
                          src={avatar}
                          alt="user-profile"
                        />
                        <div className="w-full ">
                          <div className="flex w-full justify-between mt-1">
                            <span className="ml-1 text-14">Lecturer</span>
                            <p className="">
                              <span className="inline-block truncate bg-orange-400 rounded-full px-3 py-1 text-xs text-white ml-2">
                                Topic
                              </span>
                            </p>
                          </div>
                          <div className="-mt-3">
                            <span className="ml-1  text-14">Position</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          ))
        ) : (
          <div className="text-gray-700 text-center py-4 col-span-3">
            No courses have been enrolled yet
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
