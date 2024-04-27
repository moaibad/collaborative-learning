import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "universal-cookie";
import axios from "axios";
import { GrTask } from "react-icons/gr";
import { GiOpenBook } from "react-icons/gi";
import { IoMdContacts } from "react-icons/io";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { loginMahasiswa, setTokenToOther } from "../lib/fetchData";
import { FcGoogle } from "react-icons/fc";
import gsap from 'gsap';
import { message  } from 'antd';
import { data_akun } from '../data/dummy';

import avatar from "../data/landing-profile.png";
import SplitType from "split-type";

const Landing = ({ onLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const bar = useRef(null);
  const card = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bar.current, // element to animate
      { scaleY: 0, transformOrigin: "bottom" }, // initial state
      { scaleY: 1, duration: 1.0, delay: 1.8 } // final state
    );

    gsap.fromTo(
      card.current, // element to animate
      { opacity: 0, y: 50 }, // initial state
      { opacity: 1, y: 0, duration: 1, delay: 1.0 } // final state
    );

    new SplitType("#title");
    gsap.to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.2,
      duration: 1.5,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //LOGIN MOODLE
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const formRef = useRef(null); // Ref untuk mengakses form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan proses login atau tindakan lainnya di sini dengan formData
    console.log("Data yang akan dikirim:", formData);
  };

  const handleHiddenFormSubmit = () => {
    if (formRef.current) {
      formRef.current.submit(); // Mengirimkan form tersembunyi
    }
  };

  const getDataAccMoodle = async (email) => {
    const params = new URLSearchParams();
    params.append('wstoken', '1f95ee6650d2e1a6aa6e152f6bf4702c');
    params.append('wsfunction', 'core_user_get_users_by_field');
    params.append('moodlewsrestformat', 'json');
    params.append('field', 'email');
    params.append('values[0]', email);
  
    const apiUrl = `http://colle.koreacentral.cloudapp.azure.com/moodle/webservice/rest/server.php?${params.toString()}`;
  
    try {
      const response = await axios.get(apiUrl);

      cookies.set('userIdMoodle', response.data[0].id, { path: '/', maxAge: 3600 });
      return response.data[0].id;

    } catch (error) {
      console.error('Error fetching data from Moodle API:', error);
      message.error('Error GET Data Account Moodle.');
    }
  };
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
        cookies.set('user_token', codeResponse["access_token"], { path: '/', maxAge: 3600 });
        setUser(codeResponse);
        axios.post("http://localhost:8080/oauth/user", data_akun, {
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${codeResponse["access_token"]}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        .then((response) => {
            console.log("ga error", JSON.stringify(response.data));
            // Set cookie untuk userId setelah berhasil login
            cookies.set('userId', response.data.userId, { path: '/', maxAge: 3600 });
            cookies.set('userEmail', response.data.email, { path: '/', maxAge: 3600 });

            console.log(response.status);
            console.log(response.data.userId);
            console.log(response.data.email);
            console.log("TOKEN :", codeResponse["access_token"]);

            // LOGIN 
            if (response.status === 200) {  
              //SET COOKIE FOR USERNAME AND PASSWORD MOODLE
              cookies.set('userUsernameMoodle', response.data.usernameMoodle, { path: '/', maxAge: 3600 });
              cookies.set('userPasswordMoodle', response.data.passwordMoodle, { path: '/', maxAge: 3600 });

              setFormData({
                username: response.data.usernameMoodle,
                password: response.data.passwordMoodle
              })

              //Kirim data akun ke fitur TJ dan CTB
              setTokenToOther(codeResponse["access_token"]);

              //Set data role account ke localStorage
              localStorage.setItem("role", response.data.role);
              console.log("role : ", localStorage.getItem("role"));
              
              //get data account from moodle
              getDataAccMoodle(response.data.email);
  
              //LOGIN MOODLE WITH HIDDEN FORM
              handleHiddenFormSubmit();
              
              //Set login = true dan redirect to dashboard page
              onLogin();

              navigate('/')

            } else if (response.status === 201) { // REGISTER
              // Redirect to registration page
              navigate("/registData");
            } else {
              message.error('Error bro.');
            }
        })
        .catch((err) => console.log("error ges", JSON.stringify(err)));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    console.log(`user : ${JSON.stringify(user)}`);
  }, [user]);

  return (
    <div>
      <div className="grid grid-rows-3 grid-cols-4 content-center w-full h-screen">
        <div className="row-span-3 col-span-2 -mt-20 ml-20 items-center flex justify-center">
          <div className="space-y-6">
            <div className="space-y-6">
              <p id="title" className="text-4xl font-bold tracking-wide py-1 ">
                <span className="text-orange-400">Col</span>laborative{" "}
                <span className="text-orange-400">le</span>arning
              </p>
              <p className="text-6xl font-extrabold leading-snug">
                Unlock Knowledge, Grow Skills
                <span
                  ref={card}
                  className="bg-orange-400 h-16 w-28 rounded-xl inline-block p-3 pl-5 mx-4 -mb-3"
                >
                  <svg
                    width="69"
                    height="41"
                    viewBox="0 0 69 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={bar}
                      d="M1.17157 33.3054C-0.390524 34.8675 -0.390524 37.4001 1.17157 38.9622C2.73367 40.5243 5.26633 40.5243 6.82843 38.9622L1.17157 33.3054ZM6.82843 38.9622L26.1618 19.6289L20.5049 13.972L1.17157 33.3054L6.82843 38.9622Z M26.1618 13.972C24.5997 12.4099 22.067 12.4099 20.5049 13.972C18.9428 15.5341 18.9428 18.0668 20.5049 19.6289L26.1618 13.972ZM40.6618 28.472L26.1618 13.972L20.5049 19.6289L35.0049 34.1289L40.6618 28.472Z M35.0049 28.472C33.4428 30.0341 33.4428 32.5668 35.0049 34.1289C36.567 35.691 39.0997 35.691 40.6618 34.1289L35.0049 28.472ZM40.6618 34.1289L64.8285 9.96221L59.1716 4.30536L35.0049 28.472L40.6618 34.1289Z M45.5311 2.56038C43.3343 2.79368 41.7426 4.76366 41.9759 6.96045C42.2092 9.15723 44.1792 10.7489 46.376 10.5156L45.5311 2.56038ZM65.9225 0.39476L45.5311 2.56038L46.376 10.5156L66.7674 8.35002L65.9225 0.39476Z M60.2721 21.821C60.5142 24.0168 62.4906 25.6006 64.6864 25.3584C66.8823 25.1162 68.466 23.1398 68.2238 20.944L60.2721 21.821ZM58.0241 1.43849L60.2721 21.821L68.2238 20.944L65.9759 0.561507L58.0241 1.43849Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Achieve Success.
              </p>
              <p className="font-semibold py-2">
                Temukan pengalaman pembelajaran kolaboratif dan interaktif
                dengan <span className="font-extrabold">COLLE</span> - platform
                web inovatif untuk mahasiswa dan dosen perguruan tinggi, hadir
                dengan materi pembelajaran, kuis, forum, dan kesempatan untuk
                berhubungan dengan teman belajar. Bergabunglah sekarang untuk
                memanfaatkan potensi belajar Anda secara maksimal!
              </p>
            </div>
            <div className="gap-4 flex justify-center">
              <button
                onClick={login}
                className="flex items-center justify-center gap-2 rounded-full py-4 px-16 font-bold text-white bg-blue-400 text-lg transition ease-in-out delay-150 hover:scale-110 hover:bg-blue-500 duration-300"
              >
                <div className="bg-white rounded-full p-1">
                  <FcGoogle />
                </div>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-orange-400 rounded-tl-full h-screen relative landing-pattern">
          <img
            className="absolute bottom-0 left-24 h-full w-auto"
            src={avatar}
            alt=""
          />
          <div
            className="p-4 text-white rounded-2xl bg-red-500 w-16 h-16 absolute top-56 left-24 opacity-0 animate-bounce"
            style={{
              animation:
                "show-up 1.5s ease forwards, bounce 1.2s ease infinite",
              animationDelay: "3s",
            }}
          >
            <HiChatBubbleLeftRight style={{ fontSize: "32px" }} />
          </div>
          <div
            className="p-4 text-white rounded-2xl bg-green-500 w-16 h-16 absolute top-36 right-56 opacity-0 animate-bounce"
            style={{
              animation:
                "show-up 1.5s ease forwards, bounce 1.3s ease infinite",
              animationDelay: "3.5s",
            }}
          >
            <IoMdContacts style={{ fontSize: "32px" }} />
          </div>
          <div
            className="p-4 text-white rounded-2xl bg-yellow-400 w-16 h-16 absolute top-32 left-44 opacity-0 animate-bounce"
            style={{
              animation:
                "show-up 1.5s ease forwards, bounce 1.35s ease infinite",
              animationDelay: "4s",
            }}
          >
            <GrTask style={{ fontSize: "32px" }} />
          </div>
          <div
            className="p-4 text-white rounded-2xl bg-blue-500 w-16 h-16 absolute top-60 right-36 opacity-0 animate-bounce"
            style={{
              animation:
                "show-up 1.5s ease forwards, bounce 1.25s ease infinite",
              animationDelay: "4.5s",
            }}
          >
            <GiOpenBook style={{ fontSize: "32px" }} />
          </div>
        </div>
      </div>
      
      {/* HIDEN FORM MOODLE FOR LOGIN */}
      <form
        ref={formRef} // Menggunakan ref untuk mengakses form
        className="loginform"
        name="login"
        method="post"
        action="http://colle.koreacentral.cloudapp.azure.com/moodle/login/index.php"
        onSubmit={handleSubmit}
        style={{ display: "none" }}
      >
        <p>
          Username :
          <input
            size="10"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </p>
        <p>
          Password :
          <input
            size="10"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <input name="Submit" value="Login" type="submit" />
        </p>
      </form>
      
    </div>
  );
};

export default Landing;
