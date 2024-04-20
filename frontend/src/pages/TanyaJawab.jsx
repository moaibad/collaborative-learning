import React from 'react'
import QuestionList from '../components/tanyaJawab/questionList';


const TanyaJawab = () => {
  const handleClick = () => {
    window.location.href = 'http://localhost:3001';
  };
  return (
    <div className="justify-items-start">
      <div className="bg-orange-200 p-12 ">
        <p className="text-3xl font-bold">Tanya Jawab</p>
        <p className="text px-1 pt-2">
          Unlock boundless knowledge and expert insights on Cole's interactive Q&A hub.
        </p>
      </div>
      <div className="flex justify-end mr-7 m-3">
        <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
          Explore
        </button>
      </div>
      <div className="m-7 mt-5 grid grid-flow-col justify-stretch ...">
          
        <QuestionList />
      </div>
    </div>
  )
}

export default TanyaJawab