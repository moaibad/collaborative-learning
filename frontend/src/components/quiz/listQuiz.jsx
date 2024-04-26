import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";
import Cookies from 'js-cookie';

const ListQuiz = ({ role }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userIdMoodle = Cookies.get('userIdMoodle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api;
        if (role === "student") {
          api = `${HOST_MOODLE}/webservice/rest/server.php?wstoken=${TOKEN_MOODLE}&moodlewsrestformat=json&wsfunction=local_colle_get_all_quiz`;
        } else if (role === "teacher") {
          api = `${HOST_MOODLE}/webservice/rest/server.php?wstoken=${TOKEN_MOODLE}&moodlewsrestformat=json&wsfunction=local_colle_get_quiz&userid=${userIdMoodle}`;
        }
        const response = await fetch(api);
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, [role]);

  // Fungsi untuk melakukan pencarian kuis berdasarkan nama
  const searchQuizzes = (term) => {
    return quizzes.filter((quiz) =>
      quiz.name.toLowerCase().includes(term.toLowerCase())
    );
  };

   // Handler untuk mengupdate nilai pencarian
   const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter daftar kuis berdasarkan nilai pencarian
  const filteredQuizzes = searchQuizzes(searchTerm);

  return (
    <div>
      {/* Form pencarian */}
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 py-3 pr-2"
            style={{ backgroundColor: "#F5F6F8" }}
            type="text"
            id="search"
            placeholder="Search for quizzes.."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {/* Daftar kuis */}
      <div className="grid grid-cols-3 gap-4">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Link key={quiz.id} to={quiz.url}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg h-full">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{quiz.name}</div>
                  <hr className="border-1 border-black" />
                  <p className="text-gray-700 text-base">{quiz.intro}</p>
                  <br></br>
                  <p className="text-gray-700 text-base font-bold italic">
                    Total Questions : <span className="font-bold italic">{quiz.total_questions}</span>
                  </p>
                </div>
                <div className="px-6 py-4">
                  <span className="inline-block bg-orange-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Teacher: {quiz.created_by}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-700 text-center py-4 col-span-3">
            Quiz not found
          </div>
        )}
      </div>
    </div>
  );
};

export default ListQuiz;
