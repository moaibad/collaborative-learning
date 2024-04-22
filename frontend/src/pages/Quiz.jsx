import React, {useState} from "react";
import ListQuiz from "../components/quiz/listQuiz";
// import HistoryQuiz from "../components/quiz/historyQuiz";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";

const Quiz = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("student"); //Defaultnya mahasiswa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // const [quizData, setQuizData] = useState({
  //   name: "",
  // });

  // const handleCreateQuiz = () => {
  //   // Tambahkan logika untuk membuat kuis di sini
  //   console.log("Membuat kuis...");
  //   setModalVisible(false); // Sembunyikan modal setelah membuat kuis
  // };
  
  const handleViewHistory = () => {
    setShowHistory(true);
    navigate('/quiz/histories');
  };

  //buat button untuk melihat history di student view di page quiz 
  //edit data data di component historyQuiz nya sama bentuk tampilannya
  //buat button create quiz untuk dosen, dan alurnya ada di salma
  //

  return (
    <div className="justify-items-start">
      <div className="bg-orange-200 p-12 ">
        <p className="text-3xl font-bold">My Quiz</p>
        <p className="text px-1 pt-2">
          We help you prepare for exams and quizes
        </p>
      </div>
      <div className='mx-10'>
        <div className="flex justify-between items-center my-5">
          <p className="text-2xl font-bold">Quiz List</p>
          {userRole === "teacher" && (
            <Button 
              onClick={() => setIsModalOpen(true)}
              className=" bg-orange-400 hover:bg-orange-600 text-white font-bold  px-4 rounded"          
            >
              Create Quiz
            </Button>
          )}
        </div>

        
        <div className="m-7 mt-5 grid grid-flow-col justify-stretch ...">
          <ListQuiz userRole={userRole} />
        </div>
      
        <Button onClick={() => setUserRole("student")} className="mx-2">
          Student View
        </Button>
        
        <Button onClick={handleViewHistory} className="mx-2">
          View History
        </Button>

        <Button onClick={() => setUserRole("teacher")} className="mx-2">
          Teacher View
        </Button>

      </div>
    </div>
  )
}

export default Quiz;