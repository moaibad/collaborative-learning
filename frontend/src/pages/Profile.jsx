import React from 'react'
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileDetail from '../components/profile/ProfileDetail';
const role = localStorage.getItem("role");

const Profile = () => {
  return (
    <div>
      <ProfileHeader/>
      <div className='flex'>
        <ProfileInfo/>
        {role === "student" &&
          <ProfileDetail/>
        }
      </div>
    </div>
  )
}

export default Profile