import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FaCheck } from "react-icons/fa";
import { AiOutlineSlackSquare } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdRecommend, MdGroups, MdReduceCapacity } from "react-icons/md";
import { BiSolidCustomize } from "react-icons/bi";
import { ConfigProvider, message, Steps } from 'antd';
import logo_transparant from "../data/logo-transparant.png"
import student from '../data/student-role.png';
import lecturer from '../data/lecturer-role.png';
import practitioners from '../data/practitioners-role.png';
import welcome from '../data/welcome.jpg'
import { classOptions } from '../data/dummy';
import { TOKEN_MOODLE, HOST_MOODLE} from "../lib/env";
import { setTokenToOther } from "../lib/fetchData";


const RegistData = ({onLogin}) => {
    const [current, setCurrent] = useState(0);
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
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

    const cookies = new Cookies();
    const id = cookies.get('userId');
    const user_token = cookies.get('user_token');
    const emailCookie = cookies.get('userEmail');
    const navigate = useNavigate();

    useEffect(() => {

    }, [formData]);
    

    const registerUser = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:8080/user/PersonalInfo/${id}`, formData);

            console.log(response.status);
            console.log(response.data); // Mengakses data langsung dari respons

        } catch (error) {
            // Handle registration errors
            console.error('Error registering:', error);
            message.error('An error occurred. Please try again later.');
        }
    };

    const academicInfoMHS = async (formData) => {
        try {
            console.log(formData.major);
            console.log(formData.class);
            console.log(formData.university);
            const response = await axios.post(`http://localhost:8080/mahasiswa`, {
                jurusan : formData.major,
                angkatan : formData.class,
                universitas : formData.university,
                user_id_user : id
            });

            console.log(response.status);
            console.log(response.data); // Mengakses data langsung dari respons

        } catch (error) {
            // Handle registration errors
            console.error('Error Add Academic Data Mahasiswa:', error);
            message.error('An error occurred. Please try again later.');
        }
    };

    const academicInfoDosen = async (formData) => {
        try {
            console.log(formData.major); // Jurusan
            console.log(formData.university); // Universitas
            console.log(formData.education); // Pendidikan Terakhir
            const response = await axios.post(`http://localhost:8080/dosen`, {
                jurusan: formData.major,
                universitas: formData.university,
                pendidikan_terakhir: formData.education,
                user_id_user: id // Asumsi id sudah didefinisikan sebelumnya
            });
    
            console.log(response.status);
            console.log(response.data); // Mengakses data langsung dari respons
    
        } catch (error) {
            // Handle registration errors
            console.error('Error Add Academic Data Dosen:', error);
            message.error('An error occurred. Please try again later.');
        }
    };

    const academicInfoPraktisi = async (formData) => {
        try {
            console.log(formData.education); // Bidang Keahlian
            console.log(formData.company); // Perusahaan
            console.log(formData.roleInCompany); // Posisi
            const response = await axios.post(`http://localhost:8080/praktisi`, {
                pendidikan_terakhir: formData.education,
                asal_perusahaan: formData.company,
                posisi: formData.roleInCompany,
                user_id_user: id // Asumsi id sudah didefinisikan sebelumnya
            });
    
            console.log(response.status);
            console.log(response.data); // Mengakses data langsung dari respons
    
        } catch (error) {
            // Handle registration errors
            console.error('Error Add Academic Data Praktisi:', error);
            message.error('An error occurred. Please try again later.');
        }
    };
    
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
                if (formData.firstname === '' || formData.lastname === '' || formData.username === '' || formData.tanggal_lahir === '' || formData.location === '' || formData.about === '') {
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

    const createUserInMoodle = (userData) => {
        const params = new URLSearchParams();
        params.append("wstoken", TOKEN_MOODLE);
        params.append("wsfunction", "core_user_create_users");
        params.append("moodlewsrestformat", "json");
        params.append("users[0][username]", userData.usernameMoodle);
        params.append("users[0][password]", userData.passwordMoodle);
        params.append("users[0][firstname]", userData.firstname);
        params.append("users[0][lastname]", userData.lastname);
        params.append("users[0][email]", userData.email);
    
        const url = `${HOST_MOODLE}/webservice/rest/server.php?${params.toString()}`;
    
        return axios
            .post(url)
            .then((response) => {
                console.log("Berhasil Hit API Moodle Register");
                console.log(response.data);

                getDataAccMoodle(emailCookie); // Get user moodle

                return response.data;
            })
            .catch((error) => {
                console.error("Error creating user in Moodle:", error);
                throw new Error("Failed to create user in Moodle");
            });
    };
    
    const registerUserInMoodle = (formData) => {
        // Ambil email dari cookie
        const userEmail = emailCookie;
    
        const usernameMoodle = userEmail.split('@')[0]; // Mengambil bagian sebelum '@' dari alamat email sebagai nama pengguna Moodle
        const passwordMoodle =
            usernameMoodle.charAt(0).toUpperCase() +
            usernameMoodle.slice(1) +
            id +
            "."; // Menggabungkan username dengan id_user untuk membuat kata sandi Moodle
        // const passwordMoodle = "Bibbidibobbidiboo123.";
    
        console.log("USERNAME MOODLE : ", usernameMoodle);
        console.log("PASSWORD MOODLE : ", passwordMoodle);
    
        //SET COOKIE FOR USERNAME AND PASSWORD MOODLE
        cookies.set("userUsernameMoodle", usernameMoodle, { path: "/", maxAge: 3600 });
        cookies.set("userPasswordMoodle", passwordMoodle, { path: "/", maxAge: 3600 });
    
        // Kirim data pengguna ke Moodle
        createUserInMoodle({
            id_user: formData.id_user,
            email: userEmail,
            firstname: formData.firstname,
            lastname: formData.lastname,
            usernameMoodle: usernameMoodle,
            passwordMoodle: passwordMoodle,
        })
            .then(() => {
                console.log("User Moodle Created");
            })
            .catch((error) => {
                // Tangani kesalahan saat pendaftaran pengguna di Moodle
                message.error("Failed to register user in Moodle. Please try again later.");
                console.error("Error registering user in Moodle:", error);
            });
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
          enrollUserInCourse(response.data[0].id);
          return response.data[0].id;
    
        } catch (error) {
          console.error('Error fetching data from Moodle API:', error);
          message.error('Error GET Data Account Moodle.');
        }
      };

    //ENROLL COURSE in Moodle
    const enrollUserInCourse = async (userIdMoodle) => {
        const apiUrl = `http://colle.koreacentral.cloudapp.azure.com/moodle/webservice/rest/server.php`;
      
        try {
          // Parameter yang diperlukan untuk permintaan
          const params = new URLSearchParams();
          params.append('wstoken', '1f95ee6650d2e1a6aa6e152f6bf4702c');
          params.append('wsfunction', 'enrol_manual_enrol_users');
          params.append('moodlewsrestformat', 'json');
          params.append('enrolments[0][roleid]', '5');
          params.append('enrolments[0][userid]', userIdMoodle.toString());
          params.append('enrolments[0][courseid]', '2');
      
          // Lakukan permintaan POST menggunakan axios
          const response = await axios.post(apiUrl, params);
      
          console.log("Berhasil melakukan enrol user in course dengan id: ", userIdMoodle);

          return response.data;
        } catch (error) {
          console.error('Error enrolling user in course:', error);
          message.error('Error Enroll Course in MOODLE.');
        }
    };

    const onFinish = () => {
        let isFormValid = true;

        // Validasi untuk langkah ke-4
        if (current === 3) {
            if (selectedRole === 'student') {
                if (formData.major === '' || formData.class === '' || formData.university === '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }else{
                    academicInfoMHS(formData); // Add data Academic Mahasiswa
                }
            } else if (selectedRole === 'teacher') {
                if (formData.major === '' || formData.university === '' || formData.education === '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }else{
                    academicInfoDosen(formData); // Add data Academic DOSEN
                }

            } else if (selectedRole === 'practitioners') {
                if (formData.education === '' || formData.company=== '' || formData.roleInCompany=== '') {
                    message.error('Please fill in all fields before continuing.');
                    isFormValid = false;
                }else{
                    academicInfoPraktisi(formData); // Add data Academic PRAKTISI
                }

            }
        }

        // Jika semua input diisi, maka lanjutkan ke langkah berikutnya
        if (isFormValid) {
            // Handle form submission
            console.log('Form values:', formData);

            registerUser(formData); // Add data personal account to DB dashboard

            //SET data role to localStorage
            localStorage.setItem("role", selectedRole);
            console.log("role : ", localStorage.getItem("role"));

            //Kebutuhan akun moodle
            registerUserInMoodle(formData); // Add user moodle

            //Kirim data akun ke fitur CTB dan TJ setelah register
            // setTokenToOther(user_token);

            message.success('Registration Successful!, Please Login!');
            // onLogin();

            cookies.remove("user_token");
            cookies.remove("userId");
            cookies.remove("userEmail");

            navigate('/landing'); // Redirect to home or any other route
        }
    };


    const academicInfo = (
        <div className='w-10/12 space-y-2 rounded-2xl cursor-default select-none'>
            <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-1'>
                <div className='flex justify-left items-center gap-2'>
                    <MdGroups />
                    <p className='font-bold text-sm'>Peningkatan Kolaborasi</p>
                </div>
                <p className='text-xs'>Platform collaborative learning dapat mempertemukan siswa yang memiliki minat, kemampuan, atau proyek pembelajaran yang serupa.</p>
            </div>
            <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-2'>
                <div className='flex justify-left items-center gap-2'>
                    <MdReduceCapacity />
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
                            <BsFillPersonVcardFill />
                            <p className='font-bold text-sm'>Profil Pengguna yang Komprehensif</p>
                        </div>
                        <p className='text-xs'>Setiap pengguna dapat memiliki profil yang mencakup informasi pribadi seperti nama, foto profil, minat, keahlian, dan preferensi pembelajaran.</p>
                    </div>
                    <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-2'>
                        <div className='flex justify-left items-center gap-2'>
                            <MdRecommend />
                            <p className='font-bold text-sm'>Sistem Rekomendasi Berbasis Personalisasi</p>
                        </div>
                        <p className='text-xs'>Platform collaborative learning dapat menyajikan rekomendasi yang disesuaikan dengan kebutuhan dan minat individu.</p>
                    </div>
                    <div className='bg-gradient-to-b from-orange-400 to-orange-300 shadow-md rounded-2xl w-auto m-2 h-24 p-5 space-y-1 content-slide-down-3'>
                        <div className='flex justify-left items-center gap-2'>
                            <BiSolidCustomize />
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
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" name="major" value={formData.major} onChange={handleChange} placeholder=''
                        />
                    </div>
                    <div>
                        <label>University</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" name="university" value={formData.university} onChange={handleChange} placeholder=''
                        />
                    </div>
                    <div>
                        <label>Latest Education</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' 
                            type="text" name="education" value={formData.education} onChange={handleChange} placeholder='Ex: S2 ITB'
                        />
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
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="company" value={formData.company} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Role in the Company</label>
                        <input className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 transition duration-300 outline-none' type="text" name="roleInCompany" value={formData.roleInCompany} onChange={handleChange} />
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
                <div className='flex pt-5 px-10 pb-5 gap-1'>
                    {/* <AiOutlineSlackSquare style={{ fontSize: '40px' }} /><h1 className='font-extrabold text-4xl'>Colle</h1> */}
                    <img className='w-10' src={logo_transparant} alt="" /><h1 className='font-extrabold text-4xl'>Colle</h1>
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
