import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { FaRegEye, FaHistory } from "react-icons/fa";
import { Link } from 'react-router-dom';


const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const authorId = "65dfee47d87246ca81ba274e";

  const getTimestamp = (createdAt) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(createdAt).toLocaleDateString("en-US", options);
  };

  const getFormattedNumber = (number) => {
    return number.toLocaleString();
  };

  const ActionButtons = ({ question }) => {
    // Implement your action buttons logic here
    // For example, you can add share, edit, and delete buttons

    return (
      <div className="flex gap-2">
        {/* Add your action buttons here */}
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/questions?authorId=${authorId}`
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchData();
  }, [authorId]);

  return (
    <div className="w-full">
      <div className="flex items-center text-2xl font-bold ml-10">
        <FaHistory className="mr-2" />
        History
      </div>
      {questions.map((question) => (
        <div key={question.id} className="w-5/6 bg-white border-1 border-slate-200 shadow-sm rounded-xl transition ease-in-out delay-130 hover:-translate-y-1 hover:scale-110 duration-200 m-10 ml-20">
          <Link to={`http://localhost:3001/question/${question._id}`}>
          <div className="bg-white card-pattern opacity-1 w-full shadow-sm rounded-t-xl h-20 font-bold text-xl pl-10 pt-7"> 
            {question.title}
          </div>
          <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
            <div className="pl-10"> 
              <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
                {getTimestamp(question.createdAt)}
              </span>
              {/* <h3 className="font-bold text-xl mt-8">
                {question.title}
              </h3> */}
            </div>
            <ActionButtons question={question} />
          </div>

          <div className="m-10 mb-5 mt-5 flex flex-wrap">
            {question.tags.map((tag, index) => (
              <div key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                {'#'+tag.name}
              </div>
            ))}
          </div>
          
          <div className="flex-between m-10 mt-7 mb-8 w-7/8 flex-wrap gap-3" style={{ justifyContent: 'space-between' }}>
            <div className="flex items-center gap-3">
              <img
                src={question.author.picture}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
              <p className="text-base font-medium text-gray-800">
                {question.author.name}
              </p>
              <p className="text-sm text-gray-600">
                {getTimestamp(question.createdAt)}
              </p>
              <div className="flex items-center text-sm font-semibold text-gray-800 mr-3" style={{ marginLeft: 'auto' }}>
                <AiOutlineLike className="mr-2" /> {getFormattedNumber(question.upvotes.length)} Votes
              </div>
              <div className="flex items-center text-sm font-semibold text-gray-800 mr-3" >
                <FaRegComment className="mr-2"/> {getFormattedNumber(question.answers.length)} Answer
              </div> 
              <div className="flex items-center text-sm font-semibold text-gray-800" > 
                <FaRegEye className="mr-2"/> {getFormattedNumber(question.views)} Views 
              </div> 
            </div> 
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;


