import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { AiOutlineSlackSquare } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdRecommend, MdGroups, MdReduceCapacity } from "react-icons/md";
import { BiSolidCustomize } from "react-icons/bi";
import { ConfigProvider, message, Steps } from 'antd';

import student from '../data/student-role.png';
import lecturer from '../data/lecturer-role.png';
import practitioners from '../data/practitioners-role.png';
import welcome from '../data/welcome.jpg'
import { classOptions } from '../data/dummy';

const RegistData = () => {
    const [current, setCurrent] = useState(0);
    const [selectedRole, setSelectedRole] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        birth: '',
        location: '',
        about: '',
        major: '',
        class: '',
        university: '',
        education: '',
        company: '',
        role: '',
        roleInCompany: ''
    });
    const navigate = useNavigate();

    const continues = () => {
        setCurrent(current + 1);
    }

    const next = () => {
        let isFormValid = true;
    
        // Validasi apakah semua input pada langkah saat ini telah diisi
        switch (current) {
            case 1:
                // Validasi untuk langkah 2
                if (selectedRole === '') {
                    message.error('Please select a role before continuing.');
                    isFormValid = false;
                }
                break;
            case 2:
                // Validasi untuk langkah 3
                if (formData.firstname === '' || formData.lastname === '' || formData.username === '' || formData.birth === '' || formData.location === '' || formData.about === '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }
                break;
            default:
                break;
        }
        
        // Jika semua input diisi, maka lanjut ke langkah berikutnya
        if (isFormValid) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleRoleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setSelectedRole(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onFinish = () => {
        let isFormValid = true;

        // Validasi untuk langkah ke-4
        if (current === 3) {
            if (selectedRole === 'student') {
                if (formData.major === '' || formData.class === '' || formData.university === '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }
            } else if (selectedRole === 'teacher') {
                if (formData.major === '' || formData.university === '' || formData.education === '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }
            } else if (selectedRole === 'practitioners') {
                if (formData.company === '' || formData.roleInCompany === '' || formData.education === '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }
            }
        }
    
        // Jika semua input diisi, maka lanjutkan ke langkah berikutnya
        if (isFormValid) {
            // Handle form submission
            message.success('Registration Successful!');
            console.log('Form values:', formData);
            navigate('/'); // Redirect to home or any other route
        }
    };

    const academicInfo  = (
        <div className='w-10/12 space-y-2 rounded-2xl cursor-default select-none'>
            <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-1'>
                <div className='flex justify-left items-center gap-2'>
                    <MdGroups/>
                    <p className='font-bold text-sm'>Peningkatan Kolaborasi</p>
                </div>
                <p className='text-xs'>Platform collaborative learning dapat mempertemukan siswa yang memiliki minat, kemampuan, atau proyek pembelajaran yang serupa.</p>
            </div>
            <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-2'>
                <div className='flex justify-left items-center gap-2'>
                    <MdReduceCapacity/>
                    <p className='font-bold text-sm'>Diversifikasi Perspektif</p>
                </div>
                <p className='text-xs'>Platform collaborative learning dapat memfasilitasi pertukaran ide dan perspektif dari berbagai latar belakang akademik.</p>
            </div>
        </div>
    );

    const personalInformationForm = (
        <div className='flex'>
            <div className='w-5/12 space-y-4'>
                <div className='flex gap-4 w-full'>
                    <div className='w-4/12'>
                        <label>First Name</label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="firstname" 
                            value={formData.firstname} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='w-8/12'>
                        <label>Last Name</label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="lastname" 
                            value={formData.lastname} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <div>
                    <label>Username</label>
                    <input 
                        className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                    />
                </div>
                <div className='flex gap-4 w-full'>
                    <div>
                        <label>Date of Birth</label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="date" 
                            name="birth" 
                            value={formData.birth} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='w-full'>
                        <label>Location (City)</label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label>About</label>
                    <textarea className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                        name="about" 
                        value={formData.about} 
                        placeholder='Tell us about you..' 
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <div className='w-7/12 flex justify-center'>
                <div className='w-10/12 space-y-2 rounded-2xl cursor-default select-none'>
                    <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-1'>
                        <div className='flex justify-left items-center gap-2'>
                            <BsFillPersonVcardFill/>
                            <p className='font-bold text-sm'>Profil Pengguna yang Komprehensif</p>
                        </div>
                        <p className='text-xs'>Setiap pengguna dapat memiliki profil yang mencakup informasi pribadi seperti nama, foto profil, minat, keahlian, dan preferensi pembelajaran.</p>
                    </div>
                    <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-2'>
                        <div className='flex justify-left items-center gap-2'>
                            <MdRecommend/>
                            <p className='font-bold text-sm'>Sistem Rekomendasi Berbasis Personalisasi</p>
                        </div>
                        <p className='text-xs'>Platform collaborative learning dapat menyajikan rekomendasi yang disesuaikan dengan kebutuhan dan minat individu.</p>
                    </div>
                    <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-3'>
                        <div className='flex justify-left items-center gap-2'>
                            <BiSolidCustomize/>
                            <p className='font-bold text-sm'>Fitur Kustomisasi dan Personalisasi Pembelajaran</p>
                        </div>
                        <p className='text-xs'>Collaborative learning yang menggunakan informasi personal dapat menawarkan fitur kustomisasi dan personalisasi pembelajaran.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const academicInformationForms = {
        student: (
            <div className='flex'>
                <div className='w-5/12 space-y-4'>
                    <div>
                        <label>University</label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="university" 
                            value={formData.university} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Major</label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="major" 
                            value={formData.major} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Class</label>
                        <select
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            defaultValue="2021"
                        >
                            <option value="">Select Class</option>
                            {classOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-7/12 flex justify-center'>
                    {academicInfo}
                </div>
            </div>
        ),
        teacher: (
            <div className='flex'>
                <div className='w-5/12 space-y-4'>
                    <div>
                        <label>Major</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'  type="text" name="major" value={formData.major} onChange={handleChange} />
                    </div>
                    <div>
                        <label>University</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="university" value={formData.university} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="education" value={formData.education} onChange={handleChange} />
                    </div>
                </div>
                <div className='w-7/12 flex justify-center'>
                    {academicInfo}
                </div>
            </div>
        ),
        practitioners: (
            <div className='flex'>
                <div className='w-5/12 space-y-4'>
                    <div>
                        <label>Company Origin</label>
                        <input  className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="company" value={formData.company} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Role in the Company</label>
                        <input  className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="roleInCompany" value={formData.roleInCompany} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input  className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="education" value={formData.education} onChange={handleChange} />
                    </div>
                </div>
                <div className='w-7/12 flex justify-center'>
                    {academicInfo}
                </div>
            </div>
        )
    };

    const steps = [
        { title: 'Welcome' },
        { title: 'Role Selection' },
        { title: 'Personal Information' },
        { title: 'Academic Information' }
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <ConfigProvider theme={{
            components: {
                Steps: {
                    colorPrimary: '#fb923c',
                    fontFamily: 'Wix Madefor Display',
                },
              },
            componentSize: 'large',
          }}
        >
        <div class='bg-orange-100 min-h-screen'>
            <div className='flex pt-5 px-10 pb-5'>
                <AiOutlineSlackSquare style={{ fontSize: '40px' }} /><h1 className='font-extrabold text-4xl'>Colle</h1>
                <Link to="/landing" className="ml-auto">
                    <button className="bg-orange-400 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                    Back
                    </button>
                </Link>
            </div>
            
            <div className="mt-4">
                <div className='flex justify-between mx-48 mb-4 bg-white p-4 rounded-xl welcome'>                
                    <Steps 
                    className='' 
                    current={current} 
                    items={items} 
                      />
                </div>
                <div className='flex justify-center mt-8 welcome'>
                    <div className='bg-white border rounded-xl p-10 w-9/12 mb-12'>
                        <div>
                            {current === 0 && (
                                <div className='text-center'>
                                    <h2 className='font-bold text-3xl mb-8 -mt-2'>Welcome to Colle!</h2>
                                    <div className='w-full flex justify-center'>
                                        <img className='rounded-3xl w-4/12' src={welcome} alt="" />
                                    </div>
                                    <div className='mt-8 font-semibold'>
                                        {/* <p className='text-md'>Welcome to <span className='font-bold text-orange-500'>Collaborative Learning! </span></p>
                                        <p>Before we get started. First, let's create an account!</p> */}
                                        <p>You don't have an account on our collaborative learning platform yet!</p> 
                                        <p>Let's start your learning journey by registering here.</p>
                                    </div>
                                </div>
                            )}
                            {current === 1 && (
                                <div className='text-center'>
                                    <h2 className='font-bold text-2xl mb-12 -mt-2'>Select Your Role</h2>
                                    <div className="flex justify-center gap-10 content-slide-down-1">
                                        <label>
                                            <div className={`w-52 border-2 shadow-md rounded-xl p-4 duration-300 ${selectedRole === 'student' ? 'border-orange-400 border-4 transition ease-in-out -translate-y-1 scale-105 ' : 'transition ease-in-out translate-y-0 scale-100'}`}>
                                                <div className='relative mb-3'>
                                                    <input className='absolute -top-8 inset-70px bg-white hidden checked:block checked:appearance-none checked:border-4 checked:border-solid checked:border-orange-400 checked:rounded-full transition ease-in-out duration-300 w-8 h-8' type="radio" name="role" value="student" onChange={handleRoleChange} />
                                                    {selectedRole === 'student' && (
                                                        <FaCheck className='absolute -top-6 inset-78px text-orange-500 w-4 h-4 ' />
                                                    )}
                                                    <p className='font-bold'>Student</p>
                                                </div>
                                                <img src={student} alt="Student" />
                                            </div>
                                        </label>
                                        <label>
                                            <div className={`w-52 border-2 shadow-md rounded-xl p-4 duration-300 ${selectedRole === 'teacher' ? 'border-orange-400 border-4 transition ease-in-out -translate-y-1 scale-105 ' : 'transition ease-in-out translate-y-0 scale-100'}`}>
                                                <div className='relative mb-3'>
                                                    <input className='absolute -top-8 inset-70px bg-white hidden checked:block checked:appearance-none checked:border-4 checked:border-solid checked:border-orange-400 checked:rounded-full transition ease-in-out duration-300 w-8 h-8' type="radio" name="role" value="teacher" onChange={handleRoleChange} />
                                                    {selectedRole === 'teacher' && (
                                                        <FaCheck className='absolute -top-6 inset-78px text-orange-500 w-4 h-4 ' />
                                                    )}
                                                    <p className='font-bold'>Teacher</p>
                                                </div>
                                                <img src={lecturer} alt="Teacher" />
                                            </div>
                                        </label>
                                        <label>
                                            <div className={`w-52 border-2 shadow-lg rounded-xl p-4 duration-300 ${selectedRole === 'practitioners' ? 'border-orange-400 border-4 transition ease-in-out -translate-y-1 scale-105 ' : 'transition ease-in-out translate-y-0 scale-100'}`}>
                                                <div className='relative mb-3'>
                                                <input className='absolute -top-8 inset-70px bg-white hidden checked:block checked:appearance-none checked:border-4 checked:border-solid checked:border-orange-400 checked:rounded-full transition ease-in-out duration-300 w-8 h-8' type="radio" name="role" value="practitioners" onChange={handleRoleChange} />
                                                    {selectedRole === 'practitioners' && (
                                                        <FaCheck className='absolute -top-6 inset-78px text-orange-500 w-4 h-4 ' />
                                                    )}
                                                    <p className='font-bold'>Practitioners</p>
                                                </div>
                                                <img src={practitioners} alt="practitioners" />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}
                            {current === 2 && (
                                <div className='animate-slide-right'>
                                    <h2 className='font-bold text-2xl mb-8 -mt-2'>Personal Information</h2>
                                    {personalInformationForm}
                                </div>
                            )}
                            {current === 3 && (
                                <div className='animate-slide-right'>
                                    <h2 className='font-bold text-2xl mb-12 -mt-2'>Academic Information</h2>
                                    {academicInformationForms[selectedRole]}
                                </div>
                            )}
                            <div className='mt-8'>
                                {current === 0 && (
                                    <div className='flex justify-center'>
                                        <button className='bg-orange-400 text-white font-bold py-2 px-6 rounded-lg' onClick={() => continues()}>
                                            Continue
                                        </button>
                                    </div>
                                )}
                                {current > 0 && (
                                    <div className='flex justify-between'>
                                        <button className='py-2 px-6 font-bold bg-gray-200 rounded-lg' onClick={() => prev()}>
                                            Previous
                                        </button>
                                        {current < steps.length - 1 && (
                                            <button className='bg-orange-400 text-white font-bold py-2 px-6 rounded-lg' onClick={() => next()}>
                                                Next
                                            </button>
                                        )}
                                        {current === steps.length - 1 && (
                                            <button className='bg-orange-400 text-white font-bold py-2 px-6 rounded-lg' onClick={onFinish}>
                                                Done
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </ConfigProvider>
    );
}

export default RegistData;
