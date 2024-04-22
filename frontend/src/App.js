import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {
  Sidebar,
  Button,
  Footer,
  Header,
  Navbar,
  Notification,
  UserProfile,
} from "./components";
import Course from "./pages/Course";
import DetailCourse from "./components/course/detailCourse";
import MateriCourse from "./components/course/materiCourse";
import { Profile, ProfileEdit, Home, TanyaJawab, Achievement, CariTeman, Quiz, Login, Register, HomeDosen, Landing,  SemuaMahasiswa, SemuaDosen, SemuaPraktisi, SemuaKomunitas} from './pages/';
import './App.css'
import {getUserInfo} from './lib/fetchData';
import Cookies from 'universal-cookie';
import CourseAllList from "./components/course/courseAllList";
import RegistData from "./pages/RegistData";
import HistoryQuiz from "./components/quiz/historyQuiz";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Add this line for navigation
  const cookies = new Cookies();

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Move the setUser function here
    const updateUserProfile = async () => {
      try {
        const userProfile = await getUserInfo();
        if (!userProfile) {
          setIsLoggedIn(false);
          cookies.remove("user_token");
        } else {
          setUser(userProfile);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    };
    // Call the function
    updateUserProfile();
  }, []);
  //   useEffect(() =>{
  //     // load and init google api scripts
  //     gapi.load("client:auth2", initializeGapi);
  //   },[])
  return (
    <div>
      {!isLoggedIn ? (
        // Show the main app content if not logged in
        <div className="bg-main-bg min-h-screen">
          <Routes>
            <Route
              path="/landing"
              element={<Landing onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register onLogin={handleLogin} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/registData"
              element={<RegistData onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/landing" />} />
          </Routes>
        </div>
      ) : (
        // Show the main app content if logged in
        <div className="flex relative">
          <div className="w-72 fixed sidebar bg-white">
            <Sidebar />
          </div>
          <div className="bg-main-bg min-h-screen md:ml-72 w-full">
            <div className="fixed md:static bg-white navbar w-full">
              <Navbar onLogout={handleLogout} />
            </div>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dosen" element={<HomeDosen />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/profile/achievement" element={<Achievement />} />
                <Route path="/tanya-jawab" element={<TanyaJawab />} />
                <Route path='/cari-teman' element={<CariTeman />} />
                <Route path='/cari-teman/semua-mahasiswa' element={<SemuaMahasiswa/>}/>
                <Route path='/cari-teman/semua-dosen' element={<SemuaDosen/>}/>
                <Route path='/cari-teman/semua-praktisi' element={<SemuaPraktisi/>}/>
                <Route path='/cari-teman/semua-komunitas' element={<SemuaKomunitas/>}/>
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/course" element={<Course />} />
                <Route path="/all-course" element={<CourseAllList />} />
                <Route path="/detail-course/:id" element={<DetailCourse />} />
                <Route path="/materi-course/:id" element={<MateriCourse />} />
                <Route path="/quiz/histories" element={<HistoryQuiz />} />
                {/* Add a default route to redirect to Home if no route matches */}
                <Route path="*" element={<Navigate to="/course" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
