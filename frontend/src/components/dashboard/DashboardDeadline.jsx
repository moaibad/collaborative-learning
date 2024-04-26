import React, { useState, useEffect } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const DashboardQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const cookies = new Cookies();
  const userEmail = cookies.get('email'); // Retrieve email from cookies
  const [email, setEmail] = useState('');

  const handleClick = () => {
    navigate('/tanya-jawab');
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/questions?email=${userEmail}`
      );
      const data = await response.json();
      data.sort((a, b) => b.upvotes.length - a.upvotes.length);
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const removeHTMLTags = (str) => {
    if (!str) return '';
    return str.replace(/<[^>]*>?/gm, '');
  };
  
  const getFormattedNumber = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    fetchData();
  }, [email]);

  const handleQuestionClick = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <>
      <div className="border-2 border-slate-200 rounded-xl bg-white p-4 mr-4">
        <p className='text-xl font-bold mb-4'>Your Question</p>
        <div className=''>
          {questions.length > 0 ? (
            questions.slice(0, 3).map((question, index) => (
              <Link key={index} to={`http://localhost:3001/question/${question._id}`} className='flex rounded-lg bg-white shadow-md p-3 min-h-20 max-h-30 w-full mb-2 relative items-center' onClick={() => handleQuestionClick(question._id)}>
                <div className='ml-2 w-full space-y-1'>
                  <p className='font-bold text-sm line-clamp-2'>{question.title}</p>
                  <p className='text-xs text-slate-500 font-semibold line-clamp-3'>{removeHTMLTags(question.content)}</p>
                  <div className='flex justify-between'>
                    <p className='text-slate-500 font-semibold text-xs'>Total Answer: {getFormattedNumber(question.answers.length)}</p>
                    <div className='flex text-red-600'>
                      <TiArrowUpThick />
                      <p className='font-semibold text-xs'>{getFormattedNumber(question.upvotes.length)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                <div className='place-self-center'>
                <MdOutlineSpeakerNotesOff size={72} />
                </div>
                <p className='font-semibold'>Anda belum membuat pertanyaan</p>
            </div>
          )}
          {questions.length > 2 &&
            <div className='flex items-center justify-center mt-4'>
                <button className='bg-orange-400 hover:bg-orange-600 p-3 text-white rounded-3xl font-bold text-sm px-10' onClick={handleClick}>Lihat Selengkapnya</button>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default DashboardQuestion;
