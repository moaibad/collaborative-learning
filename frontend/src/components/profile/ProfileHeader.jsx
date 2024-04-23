import React, {useState, useEffect } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Flex, Progress } from 'antd';
import cover1 from '../../data/cover2.png'
import avatar from '../../data/avatar.jpg';
import { getDataDashboard } from "../../lib/fetchData";
import { formatTanggalMDY } from "../../lib/utils";

const ProfileHeader = () => {
    const UserId = Cookies.get('userId');
    const [user, setUser] = useState("");

    const token = Cookies.get('user_token');

    useEffect(() => {
      const getInfoUser = async () => {
          try {
              var response = await axios.get(`http://localhost:8080/user/${UserId}`);
           
              const formattedDateOfBirth = formatTanggalMDY(response.data.tanggal_lahir);
              const formattedDateOfRegister = formatTanggalMDY(response.data.tanggal_daftar);
            
              response.data.tanggal_lahir = formattedDateOfBirth;
              response.data.tanggal_daftar = formattedDateOfRegister;

              setUser(response.data); 
            
              console.log("user : ", JSON.stringify(response));
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };
  
      getInfoUser();
    }, []); 

    
  return (
    <div>
        <div className='flex justify-center'>
            {/* Header Image */}
            <div className='relative flex w-full justify-center'>
                <img className='h-32 w-full object-none' src={cover1} alt="cover" />
                <div className='absolute -bottom-10'>
                    <Flex className='absolute -right-1.5 -bottom-1.5' gap="small" wrap="wrap">
                        <Progress strokeColor={"#fb923c"} type="circle" percent={40} size={109} format={() => ''}/>
                    </Flex>
                    <img className='h-24 rounded-full' src={user.profileUrl ? user.profileUrl : avatar} alt="Avatar" />
                </div>
            </div>
        </div>
        <div className='text-center mt-14'>
            <p className='font-bold text-xl'>{user.nama}</p>
            <p>{user.bio}</p>
            <div className='justify-center text-slate-500 flex gap-2 text-sm'>
                <p>@{user.username}</p>
                <span>•</span>
                <p>{user.tanggal_daftar}</p>
                <span>•</span>
                <p>{user.tanggal_lahir}</p>
            </div>
        </div>
        <div className='flex gap-6 justify-center mt-6 mb-6'> 
            <div className='text-center'>
                <p className='font-bold text-sm'>3521</p>
                <p className='text-slate-500 text-xs font-semibold'>Followers</p>
            </div>
            <div className='text-center'>
                <p className='font-bold text-sm'>125</p>
                <p className='text-slate-500 text-xs font-semibold'>Following</p>
            </div>
            <Link to="/profile/edit" className='bg-white hover:bg-slate-200 text-black border-2 border-slate-500 font-bold py-1 px-4 rounded-lg'>Edit Profile</Link>
        </div>
        <hr />
    </div>
  )
}

export default ProfileHeader