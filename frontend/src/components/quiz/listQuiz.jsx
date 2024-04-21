import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListQuiz = ({userRole}) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = "";
        if (userRole === "student"){
          api = "http://colle.southeastasia.cloudapp.azure.com/moodle/webservice/rest/server.php?wstoken=1f95ee6650d2e1a6aa6e152f6bf4702c&moodlewsrestformat=json&wsfunction=local_colle_get_all_quiz";
        } else if (userRole === "teacher"){
          api = "http://colle.southeastasia.cloudapp.azure.com/moodle/webservice/rest/server.php?wstoken=1f95ee6650d2e1a6aa6e152f6bf4702c&moodlewsrestformat=json&wsfunction=local_colle_get_quiz&userid=5";
        }
        const response = await fetch(api);
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, [userRole]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <Link key={quiz.id} to={quiz.url}>
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg h-full"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{quiz.name}</div>
              <hr className="border-1 border-black" />
              <p className="text-gray-700 text-base">
                {quiz.intro}
              </p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-orange-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Teacher: {quiz.created_by}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListQuiz;
