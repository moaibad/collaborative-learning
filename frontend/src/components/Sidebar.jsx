import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSlackSquare, AiOutlineLeftSquare } from "react-icons/ai";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { links } from "../data/dummy";
import Cookies from "universal-cookie";
import { getUserInfo } from "../lib/fetchData";
const Sidebar = () => {
  const [profile, setProfile] = useState([]);
  const cookies = new Cookies();
  const navigation = useNavigate();
  console.log("role : ", JSON.parse(localStorage.getItem("role")));
  const role = JSON.parse(localStorage.getItem("role"));

  const logOut = () => {
    cookies.remove("user_token");
    cookies.remove("userId");
    googleLogout();
    setProfile(null);
    window.location.href = "/landing";
  };

  useEffect(() => {
    const get_user = async () => {
      const user = await getUserInfo();
      if (user) {
        console.log(user);
        setProfile(user);

        // Tambahkan pengecekan role di sini
        const username = role === "teacher" ? "anastasia" : "cinderella";
        setFormData((prevData) => ({
          ...prevData,
          username: username,
        }));
      }
    };
    get_user();
  }, [role]); // Pastikan useEffect dipanggil ulang saat role berubah

  const activeMenu = true;
  const activeLink =
    "flex items-center gap-5 pl-8 -ml-3 pt-3 pb-2.5 text-orange-400 border-l-4 border-l-orange-400 font-semibold text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white font-semibold text-md hover:text-orange-300 m-2";

  //LOGIN MOODLE
  const [formData, setFormData] = useState({
    // user Lecturer
    username: "cinderella",
    password: "Bibbidibobbidiboo123.",
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

  return (
    <div className="pl-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-slate-950">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center pb-5">
            <Link
              to="/"
              onClick={() => {}}
              className="items-center ml-4 flex text-xl tracking-tight gap-3 mt-8 font-extrabold text-orange-400"
            >
              <AiOutlineSlackSquare style={{ fontSize: "40px" }} />
              <span className="text-white text-2xl">Colle</span>
            </Link>
            <button
              type="button"
              onClick={() => {}}
              className="text-2xl p-1 mx-2 hover:bg-light-gray mt-4 block md:hidden"
            >
              <AiOutlineLeftSquare />
            </button>
          </div>
          <div className="">
            {links.map((item) => (
              <div key={item.title}>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.url}`}
                    key={link.name}
                    onClick={() => {
                      if (link.url === "course") {
                        handleHiddenFormSubmit(); // Submit form when "course" is clicked
                      }
                    }}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
            <div className="">
              <button
                onClick={logOut}
                className="w-11/12 bg-slate-950 text-orange-400 border-2 border-orange-400 font-bold py-2 px-4 ml-1 rounded-2xl hover:bg-orange-400 hover:text-black"
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      )}

      <form
        ref={formRef} // Menggunakan ref untuk mengakses form
        className="loginform"
        name="login"
        method="post"
        action="http://colle.southeastasia.cloudapp.azure.com/moodle/login/index.php"
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

export default Sidebar;
