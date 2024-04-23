import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Upload,
    Row,
    Col,
  } from 'antd';
import { FaPencilAlt } from "react-icons/fa";
import { classOptions } from '../data/dummy';
import cover1 from '../data/cover2.png';
import avatar from '../data/avatar.jpg';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ProfileEdit = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        tanggal_lahir: '',
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
    const [selectedRole, setSelectedRole] = useState('');

    const academicInformationForms = {
        student: (
            <div className='flex w-full'>
                <div className='space-y-4 w-full'>
                    <div>
                        <label>University</label>
                        <input
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                            type="text"
                            name="university"
                            // value={formData.university}
                            // onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Major</label>
                        <input
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                            type="text"
                            name="major"
                            // value={formData.major}
                            // onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Class</label>
                        <select
                            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                            name="class"
                            // value={formData.class}
                            // onChange={handleChange}
                            defaultValue="2021"
                        >
                            <option value="">Select Class</option>
                            {classOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        ),
        teacher: (
            <div className='flex'>
                <div className='space-y-4'>
                    <div>
                        <label>Major</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="major" 
                            // value={formData.major} 
                            // onChange={handleChange} 
                            placeholder=''
                        />
                    </div>
                    <div>
                        <label>University</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="university" 
                            // value={formData.university} 
                            // onChange={handleChange} 
                            placeholder=''
                        />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="education" 
                            // value={formData.education} 
                            // onChange={handleChange} 
                            placeholder='Ex: S2 ITB'
                        />
                    </div>
                </div>
            </div>
        ),
        practitioners: (
            <div className='flex'>
                <div className='space-y-4'>
                    <div>
                        <label>Company Origin</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="company" 
                            // value={formData.company} 
                            // onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Role in the Company</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="roleInCompany" 
                            // value={formData.roleInCompany} 
                            // onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="education" 
                            // value={formData.education} 
                            // onChange={handleChange} 
                        />
                    </div>
                </div>
            </div>
        )
    };

  return (
    <div>
        <div className='flex justify-center'>
            <div className='relative flex w-full mx-6 justify-center'>
                <img className='h-32 w-full object-none rounded-lg relative' src={cover1} alt="cover" />
                <div className='absolute left-10 -bottom-16'>
                    <img className='h-36 rounded-full relative' src={avatar} alt="Avatar" />
                    <Form.Item className='absolute -bottom-4 right-1 bg-slate-50 hover:bg-slate-200 rounded-full h-8 w-8 items-center flex justify-center border-1 border-slate-300' valuePropName="fileList">
                        <Upload action="/upload.do">
                            <button type="button">
                                <FaPencilAlt />
                            </button>
                        </Upload>
                    </Form.Item>
                </div>
            </div>
        </div>
        <div className='text-left mt-6 mx-56'>
            <p className='font-bold text-xl mb-6'>User Profile</p>
        </div>
        <div className='flex w-full justify-center'>
            <div className='w-7/12'>
                <div className='rounded-xl bg-white border-2 border-slate-200 m-6 mt-2 pb-6'>
                    <p className='font-bold m-4 text-xl'>General Information</p>
                    <div className='space-y-4 mx-4'>
                        <div className='flex gap-4 w-full'>
                            <div className='w-4/12'>
                                <label>First Name</label>
                                <input
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                    type="text"
                                    name="firstname"
                                    // value={formData.firstname}
                                    // onChange={handleChange}
                                />
                            </div>
                            <div className='w-8/12'>
                                <label>Last Name</label>
                                <input
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                    type="text"
                                    name="lastname"
                                    // value={formData.lastname}
                                    // onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Username</label>
                            <input
                                className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                type="text"
                                name="username"
                                // value={formData.username}
                                // onChange={handleChange}
                            />
                        </div>
                        <div className='flex gap-4 w-full'>
                            <div>
                                <label>Date of birth</label>
                                <input
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                    type="date"
                                    name="tanggal_lahir"
                                    // value={formData.tanggal_lahir}
                                    // onChange={handleChange}
                                />
                            </div>
                            <div className='w-full'>
                                <label>Location (City)</label>
                                <input
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                    type="text"
                                    name="location"
                                    // value={formData.location}
                                    // onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div>
                            <label>About</label>
                            <textarea className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                name="about"
                                placeholder='Tell us about you..'
                                // value={formData.about}
                                // onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-5/12'>
                <div className='rounded-xl bg-white border-2 border-slate-200 m-6 mt-2 ml-0 pb-6'>
                    <p className='font-bold m-4 text-xl'>Academic Information</p>
                    <div className='space-y-4 mx-4'>
                        <div className='flex gap-4 w-full'>
                            {academicInformationForms["student"]}
                        </div> 
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    <button className='py-2 px-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-xl text-white font-semibold text-sm'>Save & Update</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileEdit;
