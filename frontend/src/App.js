import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from  "react-router-dom";
import { FiSettings }  from 'react-icons/fi';
import {Sidebar, Button, Footer, Header, Navbar, Notification, UserProfile} from './components';
import {Profile, ProfileEdit, Home, TanyaJawab, Achievement, CariTeman, Quiz, SemuaMahasiswa, SemuaDosen, SemuaPraktisi, SemuaKomunitas} from './pages/';

import { useStateContext } from './contexts/ContextProvider';

import './App.css'

const App = () => {
    const activeMenu = true;
    return (
        <div>
            <BrowserRouter>
                <div className='flex relative'>
                    { activeMenu ? (
                        <div className='w-72 fixed sidebar bg-white'>
                            <Sidebar/>
                        </div>
                    ) : (
                        <div className='w-0'>
                            <Sidebar/>
                        </div>
                    )}
                    <div className={
                        `bg-main-bg min-h-screen md:ml-72 w-full 
                        ${activeMenu ? ' md:ml-72 '
                        : 'bg-main-bg flex-2 w-full min-h-screen'}`
                        
                    }>
                        <div className='fixed md:static bg-white navbar w-full'>
                            <Navbar/>
                        </div>


                        <div>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/profile' element={<Profile />} />
                                    <Route path='/profile/edit' element={<ProfileEdit/>} />
                                    <Route path='/profile/achievement' element={<Achievement/>}/>
                                <Route path='/tanya-jawab' element={<TanyaJawab/>}/>
                                <Route path='/cari-teman' element={<CariTeman/>}/>
                                    <Route path='/cari-teman/semua-mahasiswa' element={<SemuaMahasiswa/>}/>
                                    <Route path='/cari-teman/semua-dosen' element={<SemuaDosen/>}/>
                                    <Route path='/cari-teman/semua-praktisi' element={<SemuaPraktisi/>}/>
                                    <Route path='/cari-teman/semua-komunitas' element={<SemuaKomunitas/>}/>
                                <Route path='/quiz' element={<Quiz/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App