import React from 'react';
import { TiArrowUpThick } from "react-icons/ti";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import dataQuestion from '../../data/dataQuestion';

const DashboardQuestion = () => {

  // Check if dataQuestion is an array, if not, assign an empty array
  const questions = Array.isArray(dataQuestion) ? dataQuestion : [];

  // Slice the first 3 questions to display
  const questionToShow = questions.slice(0, 3);

  return (
    <>
      <div className="border-2 border-slate-200 rounded-xl bg-white p-4 mr-4">
        <p className='text-xl font-bold mb-4'>Your Question</p>
        <div className=''>
          {questionToShow.length > 0 ? (
            questionToShow.map((question, index) => (
              <div key={index} className='flex rounded-lg bg-white shadow-md p-3 min-h-20 max-h-30 w-full mb-2 relative items-center'>
                <div className='ml-2 w-full space-y-1'>
                  <p className='font-bold text-sm line-clamp-2'>{question.title}</p>
                  <p className='text-xs text-slate-500 font-semibold line-clamp-3'>{question.content}</p>
                  <div className='flex justify-between'>
                    <p className='text-slate-500 font-semibold text-xs'>Total Answer: {question.totalAnswer}</p>
                    <div className='flex text-red-600'>
                      <TiArrowUpThick />
                      <p className='font-semibold text-xs'>{question.upvotes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-slate-400 text-center p-8 gap-4 grid grid-cols-1'>
                <div className='place-self-center'>
                <MdOutlineSpeakerNotesOff size={72} />
                </div>
                <p className='font-semibold'>Anda belum membuat pertanyaan</p>
            </div>
          )}
          {questionToShow.length > 2 &&
            <div className='flex items-center justify-center mt-4'>
                <button className='bg-orange-400 hover:bg-orange-600 p-3 text-white rounded-3xl font-bold text-sm px-10'>Lihat Selengkapnya</button>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default DashboardQuestion;
