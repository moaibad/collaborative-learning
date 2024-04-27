import React, { useState } from "react";
import ListQuiz from "../components/quiz/listQuiz";
// import HistoryQuiz from "../components/quiz/historyQuiz";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Input } from "antd";
import { HOST_MOODLE, TOKEN_MOODLE } from "../lib/env";
import Cookies from 'js-cookie';

const Quiz = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // const [role, setRole] = useState("student");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [quizData, setQuizData] = useState({
    quizname: "",
    intro: "",
  });

  const userIdMoodle = Cookies.get('userIdMoodle');

  const handleCreateQuiz = async () => {
    try {
      const response = await fetch(
        `${HOST_MOODLE}/webservice/rest/server.php?wstoken=${TOKEN_MOODLE}&moodlewsrestformat=json&wsfunction=local_colle_create_quiz&courseid=2&quizname=${quizData.quizname}&intro=${quizData.intro}&userid=${userIdMoodle}`
      );

      // Handle response
      if (response.ok) {
        console.log("Quiz created successfully!");
        setIsModalOpen(false); // Close modal after successful creation
      } else {
        console.error("Failed to create quiz:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleViewHistory = () => {
    setShowHistory(true);
    navigate("/quiz/histories");
  };

  return (
    <div className="justify-items-start">
      <div className="bg-orange-200 p-12 ">
        <p className="text-3xl font-bold">My Quiz</p>
        <p className="text px-1 pt-2">
          We help you prepare for exams and quizes
        </p>
      </div>
      <div className="mx-10">
        <div className="flex justify-between items-center my-5">
          <p className="text-2xl font-bold">Quiz List</p>
          {role === "teacher" && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className=" bg-orange-400 hover:bg-orange-600 text-white font-bold  px-4 rounded"
            >
              Create Quiz
            </Button>
          )}
          {role === "student" && (
            <Button
              onClick={handleViewHistory}
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold px-4 rounded"
            >
              View History
            </Button>
          )}
        </div>

        <Modal
          title="Create Quiz"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="create"
              type="text"
              onClick={handleCreateQuiz}
              className="bg-orange-400 hover:bg-orange-600 text-white"
            >
              Create
            </Button>,
          ]}
        >
          <Input
            type="text"
            placeholder="Quiz Name"
            value={quizData.quizname}
            onChange={(e) =>
              setQuizData({ ...quizData, quizname: e.target.value })
            }
            className="appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 border-red-500"
          />
          <Input
            placeholder="Introduction"
            value={quizData.intro}
            onChange={(e) =>
              setQuizData({ ...quizData, intro: e.target.value })
            }
            className=" mb-2 appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 border-red-500"
          />
        </Modal>

        <div className="m-7 mt-5 grid grid-flow-col justify-stretch ...">
          <ListQuiz role={role} />
        </div>

        {/* <Button onClick={() => setRole("student")} className="mx-2">
          Student View
        </Button>

        <Button onClick={handleViewHistory} className="mx-2">
          View History
        </Button>

        <Button onClick={() => setRole("teacher")} className="mx-2">
          Teacher View
        </Button> */}

      </div>
    </div>
  );
};

export default Quiz;
