import React, {useState, useEffect } from "react"
import axios from "axios";
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
import Cookies from 'js-cookie';
import { formatDate } from "../lib/utils";
import { message } from 'antd';

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
        roleInCompany: '',
        profileGambar : ''
    });
    const UserId = Cookies.get('userId');
    const role = localStorage.getItem("role");
    
    const [personalInfo, setPersonalInfo] = useState('');

    const updateDataPersonal = async (formData) => {
        console.log("MAU TEST Form Data username : ", formData.username);
        console.log("MAU TEST Form Data tanggal_lahir : ", formData.tanggal_lahir);
        console.log("MAU TEST Form Data location : ", formData.location);
        console.log("MAU TEST Form Data about : ", formData.about);
        console.log("MAU TEST Form Data firstname : ", formData.firstname);
        console.log("MAU TEST Form Data lastname : ", formData.lastname);
        try {
            const response = await axios.put(`http://localhost:8080/user/${UserId}`, {
                username : formData.username,
                tanggal_lahir : formData.tanggal_lahir,
                location : formData.location,
                about : formData.about,
                firstname : formData.firstname,
                lastname : formData.lastname
            });

            console.log(response.status);
            console.log(response.data); // Mengakses data langsung dari respons

        } catch (error) {
            // Handle registration errors
            console.error('Error Update:', error);
            message.error('An error occurred. Please try again later.');
        }
    };

    const updateDataMHS = async (formData) => {
        console.log("MAU TEST Form Data jurusan : ", formData.major);
        console.log("MAU TEST Form Data angkatan : ", formData.class);
        console.log("MAU TEST Form Data universitas : ", formData.university);
        try {
            const response = await axios.put(`http://localhost:8080/mahasiswa/${UserId}`, {
                jurusan : formData.major,
                angkatan : formData.class,
                universitas : formData.university
            });

            console.log("STATUS Update Data MHS : ", response.status);
            console.log("UPDATE Data MHS : ", response.data);

        } catch (error) {
            // Handle registration errors
            console.error('Error Update:', error);
            message.error('An error occurred. Please try again later.');
        }
    };

    const updateDataDSN = async (formData) => {
        try {
            const response = await axios.put(`http://localhost:8080/dosen/${UserId}`, {
                jurusan : formData.major,
                pendidikan_terakhir : formData.education,
                universitas : formData.university
            });

            console.log("STATUS Update Data DSN : ", response.status);
            console.log("Update Data DSN : ",response.data); // Mengakses data langsung dari respons

        } catch (error) {
            // Handle registration errors
            console.error('Error Update:', error);
            message.error('An error occurred. Please try again later.');
        }
    };

    const updateDataPraktisi = async (formData) => {
        console.log("MAU TEST Form Data asal perusahaan : ", formData.company);
        console.log("MAU TEST Form Data pendidikan terakhir : ", formData.education);
        console.log("MAU TEST Form Data posisi : ", formData.roleInCompany);
        try {
            const response = await axios.put(`http://localhost:8080/praktisi/${UserId}`, {
                asal_perusahaan : formData.company,
                pendidikan_terakhir : formData.education,
                posisi : formData.roleInCompany
            });

            console.log("STATUS Update Data PRAKTISI : ", response.status);
            console.log("Update Data PRAKTISI : ",response.data); // Mengakses data langsung dari respons

        } catch (error) {
            // Handle registration errors
            console.error('Error Update:', error);
            message.error('An error occurred. Please try again later.');
        }
    };


    const onFinish = () => {
        updateDataPersonal(formData);
        
        if (role === "student"){
            updateDataMHS(formData);
        }else if (role === "teacher"){
            updateDataDSN(formData);
        }else if (role === "practitioners"){
            updateDataPraktisi(formData);
        }

        message.success('Update Successfuly!');
    };

    const getDataPersonalInfo = async () =>{
        const response = await axios.get(`http://localhost:8080/user/${UserId}`);
        // const formattedDateOfBirth = formatDate(response.data.tanggal_lahir);
        // response.data.tanggal_lahir = formattedDateOfBirth;
        // console.log(formattedDateOfBirth); 
        setFormData({
            firstname : response.data.firstname,
            lastname : response.data.lastname,
            username : response.data.username,
            profileGambar : response.data.profileUrl,
            tanggal_lahir : response.data.tanggal_lahir,
            location : response.data.location, 
            about : response.data.about
        });
        setPersonalInfo(response.data);
    }

    const getDataAcademicMHS = async () =>{
        const response = await axios.get(`http://localhost:8080/mahasiswa/${UserId}`);
        setFormData({
            major : response.data.jurusan,
            class : response.data.angkatan,
            university : response.data.universitas
        });
        console.log("(UPDATE) Current Data MHS : ", JSON.stringify(response));
    }

    const getDataAcademicDOSEN = async () =>{
        const response = await axios.get(`http://localhost:8080/dosen/${UserId}`);
        setFormData({
            major : response.data.jurusan,
            university : response.data.universitas,
            education : response.data.pendidikan_terakhir
        });
        console.log("(UPDATE) Current Data DSN : : ", JSON.stringify(response));
    }

    const getDataAcademicPraktisi = async () =>{
        const response = await axios.get(`http://localhost:8080/praktisi/${UserId}`);
        setFormData({
            company : response.data.asal_perusahaan,
            education : response.data.pendidikan_terakhir,
            roleInCompany : response.data.posisi
        });
        console.log("(UPDATE) Current Data PRAKTISI : : ", JSON.stringify(response));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        
        getDataPersonalInfo();

        if (role === "student"){
            getDataAcademicMHS();
        }else if (role === "teacher"){
            getDataAcademicDOSEN();
        }else if (role === "practitioners"){
            getDataAcademicPraktisi();
        }

      }, []);

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
            </div>
        ),
        teacher: (
            <div className='flex w-full'>
                <div className='space-y-4 w-full'>
                    <div>
                        <label>Major</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="major" 
                            value={formData.major} 
                            onChange={handleChange} 
                            placeholder=''
                        />
                    </div>
                    <div>
                        <label>University</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="university" 
                            value={formData.university} 
                            onChange={handleChange} 
                            placeholder=''
                        />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="education" 
                            value={formData.education} 
                            onChange={handleChange} 
                            placeholder='Ex: S2 ITB'
                        />
                    </div>
                </div>
            </div>
        ),
        practitioners: (
            <div className='flex w-full'>
                <div className='space-y-4 w-full'>
                    <div>
                        <label>Company Origin</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Role in the Company</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="roleInCompany" 
                            value={formData.roleInCompany} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" 
                            name="education" 
                            value={formData.education} 
                            onChange={handleChange} 
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
                    <img className='h-36 rounded-full relative' src={personalInfo.profileUrl} alt="Avatar" />
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
                                <label>Firstname</label>
                                <input
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='w-8/12'>
                                <label>Lastname</label>
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
                                <label>Date of birth</label>
                                <input
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                    type="date"
                                    name="tanggal_lahir"
                                    value={formData.tanggal_lahir}
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
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div>
                            <label>About</label>
                            <textarea className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none'
                                name="about"
                                placeholder='Tell us about you..'
                                value={formData.about}
                                onChange={handleChange}
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
                            {academicInformationForms[role]}
                        </div> 
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    {/* <button className='py-2 px-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-xl text-white font-semibold text-sm' onClick={onFinish()}>Save & Update</button> */}
                    <button onClick={onFinish} className='py-2 px-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-xl text-white font-semibold text-sm'>Save & Update</button>
                    {/* <button className='py-2 px-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-xl text-white font-semibold text-sm'>Save & Update</button> */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileEdit;
