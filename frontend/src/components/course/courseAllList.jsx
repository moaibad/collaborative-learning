import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import avatar from "../../data/avatar.jpg";
import coursePage2 from "../../data/online-course.png";
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";

const CourseAllList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai pencarian

  useEffect(() => {
    // Fetch course data from the appropriate endpoint based on role
    const fetchData = async () => {
      try {
        let endpoint =
          `${HOST_MOODLE}/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${TOKEN_MOODLE}&wsfunction=core_course_get_courses`;

        const response = await fetch(endpoint);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when component mounts

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
      <div className="max-w-full mx-4 m-3">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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

      {/* list all course */}
      <div className="grid grid-cols-3 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-700 text-center py-4 col-span-3">
            Course not found
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAllList;
