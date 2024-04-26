import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HOST_MOODLE, TOKEN_MOODLE } from "../../lib/env";
import Cookies from "js-cookie";

const HistoryQuiz = () => {
  const [histories, setHistories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userIdMoodle = Cookies.get("userIdMoodle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = `${HOST_MOODLE}/webservice/rest/server.php?wstoken=${TOKEN_MOODLE}&wsfunction=local_colle_get_all_user_best_grades&moodlewsrestformat=json&userid=${userIdMoodle}`;
        const response = await fetch(api);
        const data = await response.json();
        setHistories(data);
      } catch (error) {
        console.error("Error fetching histories data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <div className="justify-items-start">
      <div className="bg-orange-200 p-12 ">
        <p className="text-3xl font-bold">My Quiz</p>
        <p className="text px-1 pt-2">
          We help you prepare for exams and quizes
        </p>
      </div>

      <div className="flex justify-between items-center my-5 mx-5">
        <p className="text-2xl font-bold">History Quiz</p>
      </div>

      <div className="relative">
        {/* Search input */}
        <div className="relative m-[2px] mb-3 mr-5 float-left bg-blue">
          <label htmlFor="inputSearch" className="sr-only">
            Search
          </label>
          <input
            id="inputSearch"
            type="text"
            placeholder="Search..."
            className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 text-neutral-500 dark:text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-700 rounded-lg p-3 mx-5 mt-3">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 bg-orange-400 rounded-t-lg">
            <tr>
              <th scope="col" className="px-6 py-4 text-center">
                Quiz Name
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Sumgrades
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Time Finish
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(histories) &&
              histories
                .filter((history) =>
                  history.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((history, index) => (
                  <tr key={index} className="border-b dark:border-neutral-600">
                    <td className="px-6 py-4 text-center">{history.name}</td>
                    <td className="px-6 py-4 text-center">{history.status}</td>
                    <td className="px-6 py-4 text-center">{history.grade}</td>
                    <td className="px-6 py-4 text-center">
                      {history.timefinish}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={history.url}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryQuiz;
