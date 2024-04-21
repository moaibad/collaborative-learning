import React, {useState, useEffect } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import { getDataDashboard } from "../../lib/fetchData";
const ProfileInfo = () => {
  const [user, setUser] = useState("");
  const [mahasiswa, setMahasiswa] = useState("");
  const UserId = Cookies.get('userId');
  const token = Cookies.get('user_token');

  useEffect(() => {
    const getInfoUser = async () => {
        try {
            var response = await axios.get(`http://localhost:8080/user/${UserId}`);
            setUser(response.data); 
            console.log("user : ", JSON.stringify(response));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const getInfoMahasiswa = async () => {
      try {
          var response = await axios.get(`http://localhost:8080/mahasiswa/${UserId}`);
          setMahasiswa(response.data); 
          console.log("mahasiswa : ", JSON.stringify(response));
      } catch (error) {
          console.error('Error fetching mahasiswa data:', error);
      }
  };

    getInfoMahasiswa();
    getInfoUser();
  }, [token]); // Perubahan token akan memicu useEffect untuk dijalankan kembali

  return (
    <div className='bg-white p-6 m-5 w-3/5'>
        <p className='font-bold'>About</p>
        <p>{user.about}</p>
        {mahasiswa && (
          <>
          <div className='w-1/2 leading-loose'>
              <p className='font-bold mt-6'>General Information</p>
              <p className='flex justify-between'>Asal Kampus<div></div>{mahasiswa.universitas}</p>
              <p className='flex justify-between'>Jurusan<div></div>{mahasiswa.jurusan}</p>
              <p className='flex justify-between'>Semester<div></div>{mahasiswa.angkatan}</p>
          </div>
        </>
        )}
        
    </div>
  )
}

export default ProfileInfo