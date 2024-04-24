import React, {useState, useEffect } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import { getDataDashboard } from "../../lib/fetchData";
const ProfileInfo = () => {
  const [user, setUser] = useState("");
  const [mahasiswa, setMahasiswa] = useState("");
  const [dosen, setDosen] = useState("");
  const [praktisi, setPraktisi] = useState("");
  const UserId = Cookies.get('userId');
  const token = Cookies.get('user_token');
  const role = localStorage.getItem("role");

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

const getInfoDosen = async () => {
  try {
      var response = await axios.get(`http://localhost:8080/dosen/${UserId}`);
      setDosen(response.data); 
      console.log("dosen : ", JSON.stringify(response));
  } catch (error) {
      console.error('Error fetching dosen data:', error);
  }
};

const getInfoPraktisi = async () => {
  try {
      var response = await axios.get(`http://localhost:8080/praktisi/${UserId}`);
      setPraktisi(response.data); 
      console.log("praktisi : ", JSON.stringify(response));
  } catch (error) {
      console.error('Error fetching praktisi data:', error);
  }
};

  useEffect(() => {
    if (role === "student"){
      getInfoMahasiswa();
    }else if (role === "teacher"){
      getInfoDosen();
    }else if (role === "practitioners"){
      getInfoPraktisi();
    }
    getInfoUser();
  }, [UserId]); 

  return (
    <div className='bg-white p-6 m-5 w-3/5'>
        <p className='font-bold'>About</p>
        <p>{user.about}</p>
        {mahasiswa && (
          <>
          <div className='w-1/2 leading-loose'>
              <p className='font-bold mt-6'>Academic Information</p>
              <p className='flex justify-between'>University<div></div>{mahasiswa.universitas}</p>
              <p className='flex justify-between'>Major<div></div>{mahasiswa.jurusan}</p>
              <p className='flex justify-between'>Class<div></div>{mahasiswa.angkatan}</p>
          </div>
        </>
        )}
        {dosen && (
          <>
          <div className='w-1/2 leading-loose'>
              <p className='font-bold mt-6'>Academic Information</p>
              <p className='flex justify-between'>University<div></div>{dosen.universitas}</p>
              <p className='flex justify-between'>Major<div></div>{dosen.jurusan}</p>
              <p className='flex justify-between'>Latest Education<div></div>{dosen.pendidikan_terakhir}</p>
          </div>
        </>
        )}
        {praktisi && (
          <>
          <div className='w-1/2 leading-loose'>
              <p className='font-bold mt-6'>Academic Information</p>
              <p className='flex justify-between'>Company Origin<div></div>{praktisi.asal_perusahaan}</p>
              <p className='flex justify-between'>Role in the Company<div></div>{praktisi.posisi}</p>
              <p className='flex justify-between'>Latest Education<div></div>{praktisi.pendidikan_terakhir}</p>
          </div>
        </>
        )}
    </div>
  )
}

export default ProfileInfo