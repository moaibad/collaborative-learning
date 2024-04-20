import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import CourseList from "../components/course/courseList";
import { RiErrorWarningFill } from "react-icons/ri";

const Course = () => {
  const role = "Teachers";
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    fullname: "",
    shortname: "",
    summary: "",
    userid: 4,
  });
  const [coursePrivateData, setCoursePrivateData] = useState({
    fullname: "",
    shortname: "",
    summary: "",
    enrolmentkey: "",
    userid: 4,
  });
  const [formErrors, setFormErrors] = useState({});
  const [formErrors2, setFormErrors2] = useState({});
  const [shortnameTaken, setShortnameTaken] = useState(false); // State untuk menangani pesan shortname taken
  const [successMessage, setSuccessMessage] = useState(false); // State untuk menampilkan pesan sukses

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      // Tambah userid ke courseData
      const dataToSend = { ...courseData };
      const response = await createCourse(dataToSend);
      console.log("Ini responseee", response);

      // Mengecek apakah respons dari server menunjukkan bahwa kursus berhasil dibuat
      if (
        response &&
        response.firstObject &&
        response.firstObject.id &&
        response.firstObject.shortname &&
        response.secondObject &&
        response.secondObject.courseid &&
        response.secondObject.message
      ) {
        setSuccessMessage(true); // Menampilkan pesan sukses
        setIsModalOpen(false); // Menutup modal setelah berhasil membuat kursus
        clearForm(); // Mengosongkan formulir setelah berhasil membuat kursus
        window.location.href = "/course";
        return; // Keluar dari fungsi setelah menampilkan pesan sukses
      }

      // Jika respons tidak menunjukkan bahwa kursus berhasil dibuat, lanjutkan seperti biasa
      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error:", error.message);
      if (
        error.message ===
        "Failed to create course: Short name is already used for another course"
      ) {
        setShortnameTaken(true);
      } else {
        setIsModalOpen(false); // Tutup modal hanya jika tidak ada error "shortnametaken"
      }
      // Handle error
    }
  };

  const handleOk2 = async () => {
    const isValid = validateForm2();
    if (!isValid) {
      return;
    }

    try {
      // Tambah userid ke courseData
      const dataToSend = { ...coursePrivateData };
      const response = await createPrivateCourse(dataToSend);
      console.log("Ini responseee", response);

      // Mengecek apakah respons dari server menunjukkan bahwa kursus berhasil dibuat
      if (
        response &&
        response.firstObject &&
        response.firstObject.id &&
        response.firstObject.shortname &&
        response.secondObject &&
        response.secondObject.courseid &&
        response.secondObject.message
      ) {
        setSuccessMessage(true); // Menampilkan pesan sukses
        setIsModalOpen(false); // Menutup modal setelah berhasil membuat kursus
        clearForm(); // Mengosongkan formulir setelah berhasil membuat kursus
        window.location.href = "/course";
        return; // Keluar dari fungsi setelah menampilkan pesan sukses
      }

      // Jika respons tidak menunjukkan bahwa kursus berhasil dibuat, lanjutkan seperti biasa
      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error:", error.message);
      if (
        error.message ===
        "Failed to create course: Short name is already used for another course"
      ) {
        setShortnameTaken(true);
      } else {
        setIsModalOpen(false); // Tutup modal hanya jika tidak ada error "shortnametaken"
      }
      // Handle error
    }
  };

  const clearForm = () => {
    setCourseData({
      fullname: "",
      shortname: "",
      summary: "",
    });
    setFormErrors({});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { id, value } = e.target;
    setCoursePrivateData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!courseData.fullname.trim()) {
      errors.fullname = "Fullname is required";
    }
    if (!courseData.shortname.trim()) {
      errors.shortname = "Shortname is required";
    }
    if (!courseData.summary.trim()) {
      errors.summary = "Summary is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateForm2 = () => {
    const errors = {};
    if (!coursePrivateData.fullname.trim()) {
      errors.fullname = "Fullname is required";
    }
    if (!coursePrivateData.shortname.trim()) {
      errors.shortname = "Shortname is required";
    }
    if (!coursePrivateData.summary.trim()) {
      errors.summary = "Summary is required";
    }
    if (!coursePrivateData.enrolmentkey.trim()) {
      errors.enrolmentkey = "Enrolment key is required";
    }
    setFormErrors2(errors);
    return Object.keys(errors).length === 0;
  };

  const createCourse = async (courseData) => {
    const apiUrl = `http://moaibad.southeastasia.cloudapp.azure.com/moodle/webservice/rest/server.php`;
    const token = "5aa6c5a9f9e54193407b3dcd6ec9ab4b";
    const wsfunction = "local_colle_create_course";

    const fullUrl = `${apiUrl}?moodlewsrestformat=json&wstoken=${token}&wsfunction=${wsfunction}&fullname=${encodeURIComponent(
      courseData.fullname
    )}&shortname=${encodeURIComponent(
      courseData.shortname
    )}&enrolmentkey&summary=${encodeURIComponent(courseData.summary)}&userid=${
      courseData.userid
    }`;

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
      });

      // Mengecek jika respons tidak berhasil (status code bukan 200)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Mengambil respons sebagai teks
      const responseDataText = await response.text();
      console.log("Server Response:", responseDataText);

      // Memisahkan objek JSON pertama dan kedua
      const firstObjectEndIndex = responseDataText.indexOf("}") + 1;
      const firstObjectText = responseDataText.slice(0, firstObjectEndIndex);
      const secondObjectText = responseDataText.slice(firstObjectEndIndex);

      // Parsing kedua objek sebagai JSON
      const firstObject = JSON.parse(firstObjectText);
      const secondObject = JSON.parse(secondObjectText);
      console.log(firstObject);
      console.log(secondObject);

      // Menangani respons sesuai dengan struktur respons yang baru
      if (firstObject && firstObject.errorcode) {
        const errorCode = firstObject.errorcode;
        const message = firstObject.message;

        if (errorCode === "shortnametaken") {
          setShortnameTaken(true); // Update shortnameTaken state
          throw new Error(`Failed to create course: ${message}`);
        } else {
          console.error("Error creating course:", message);
          throw new Error(
            "Error creating course. Please check your data and try again."
          );
        }
      } else {
        // Handle sukses disini, jika diperlukan
        console.log("Course created successfully");
      }

      // Mengembalikan objek respons
      return {
        firstObject: firstObject,
        secondObject: secondObject,
      };
    } catch (error) {
      console.error("Error creating course:", error.message);
      throw error;
    }
  };

  const createPrivateCourse = async (coursePrivateData) => {
    const apiUrl = `http://moaibad.southeastasia.cloudapp.azure.com/moodle/webservice/rest/server.php`;
    const token = "5aa6c5a9f9e54193407b3dcd6ec9ab4b";
    const wsfunction = "local_colle_create_course";

    const fullUrl = `${apiUrl}?moodlewsrestformat=json&wstoken=${token}&wsfunction=${wsfunction}&fullname=${encodeURIComponent(
      coursePrivateData.fullname
    )}&shortname=${encodeURIComponent(
      coursePrivateData.shortname
    )}&enrolmentkey=${encodeURIComponent(
      coursePrivateData.enrolmentkey
    )}&summary=${encodeURIComponent(coursePrivateData.summary)}&userid=${
      coursePrivateData.userid
    }`;

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
      });

      // Mengecek jika respons tidak berhasil (status code bukan 200)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Mengambil respons sebagai teks
      const responseDataText = await response.text();
      console.log("Server Response:", responseDataText);

      // Memisahkan objek JSON pertama dan kedua
      const firstObjectEndIndex = responseDataText.indexOf("}") + 1;
      const firstObjectText = responseDataText.slice(0, firstObjectEndIndex);
      const secondObjectText = responseDataText.slice(firstObjectEndIndex);

      // Parsing kedua objek sebagai JSON
      const firstObject = JSON.parse(firstObjectText);
      const secondObject = JSON.parse(secondObjectText);
      console.log(firstObject);
      console.log(secondObject);

      // Menangani respons sesuai dengan struktur respons yang baru
      if (firstObject && firstObject.errorcode) {
        const errorCode = firstObject.errorcode;
        const message = firstObject.message;

        if (errorCode === "shortnametaken") {
          setShortnameTaken(true); // Update shortnameTaken state
          throw new Error(`Failed to create course: ${message}`);
        } else {
          console.error("Error creating course:", message);
          throw new Error(
            "Error creating course. Please check your data and try again."
          );
        }
      } else {
        // Handle sukses disini, jika diperlukan
        console.log("Course created successfully");
      }

      // Mengembalikan objek respons
      return {
        firstObject: firstObject,
        secondObject: secondObject,
      };
    } catch (error) {
      console.error("Error creating course:", error.message);
      throw error;
    }
  };

  return (
    <div className="justify-items-start">
      <div className="bg-orange-200 p-12 ">
        <p className="text-3xl font-bold">My Courses</p>
        <p className="text px-1 pt-2">
          Let’s join our best classes with our famous instructor
        </p>
      </div>
      {role === "Teacher" ? (
        <>
          {" "}
          <div className="flex justify-end mr-7 m-3">
            <button
              onClick={showModal}
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Create Course
            </button>

            <Modal title="Create Course" open={isModalOpen} footer={null}>
              <div className="flex items-start">
                <button
                  onClick={() => setToggle(false)}
                  className={`w-full rounded-none rounded-l-md focus:outline-none p-2 ${
                    !toggle
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  style={{
                    backgroundColor: !toggle ? "#FB923C" : "#F5F6F8",
                    color: !toggle ? "white" : "gray",
                  }}
                >
                  Public Course
                </button>
                <button
                  onClick={() => setToggle(true)}
                  className={`w-full rounded-none rounded-r-md focus:outline-none p-2 ${
                    toggle
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  style={{
                    backgroundColor: toggle ? "#FB923C" : "#F5F6F8",
                    color: toggle ? "white" : "gray",
                  }}
                >
                  Private Course
                </button>
              </div>

              <div className="mt-2 items-start">
                {toggle && (
                  <>
                    <form className="mt-4">
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="fullname"
                        >
                          Course Fullname
                        </label>
                        <input
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors2.fullname && "border-red-500"
                          }`}
                          id="fullname"
                          type="text"
                          placeholder="Course Fullname"
                          value={coursePrivateData.fullname}
                          onChange={handleChange2}
                        />
                        {formErrors2.fullname && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors2.fullname}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="shortname"
                        >
                          Course Shortname
                        </label>
                        <input
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors2.shortname && "border-red-500"
                          }`}
                          id="shortname"
                          type="text"
                          placeholder="Course Shortname"
                          value={coursePrivateData.shortname}
                          onChange={handleChange2}
                        />
                        {formErrors2.shortname && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors2.shortname}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="enrolmentkey"
                        >
                          Enrolment Key
                        </label>
                        <input
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors2.enrolmentkey && "border-red-500"
                          }`}
                          id="enrolmentkey"
                          type="text"
                          placeholder="Enrolment Key"
                          value={coursePrivateData.enrolmentkey}
                          onChange={handleChange2}
                        />
                        {formErrors2.enrolmentkey && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors2.enrolmentkey}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="summary"
                        >
                          Summary Course
                        </label>
                        <textarea
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors2.summary && "border-red-500"
                          }`}
                          id="summary"
                          type="text"
                          placeholder="Summary Course"
                          value={coursePrivateData.summary}
                          onChange={handleChange2}
                        />
                        {formErrors2.summary && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors2.summary}
                          </p>
                        )}
                      </div>
                    </form>
                    <div className="flex justify-between mt-4">
                      <Button key="cancel" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button
                        className="bg-orange-400 hover:bg-orange-600 text-white"
                        key="submit"
                        onClick={handleOk2}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
                {!toggle && (
                  <>
                    <form className="mt-4">
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="fullname"
                        >
                          Course Fullname
                        </label>
                        <input
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors.fullname && "border-red-500"
                          }`}
                          id="fullname"
                          type="text"
                          placeholder="Course Fullname"
                          value={courseData.fullname}
                          onChange={handleChange}
                        />
                        {formErrors.fullname && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors.fullname}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="shortname"
                        >
                          Course Shortname
                        </label>
                        <input
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors.shortname && "border-red-500"
                          }`}
                          id="shortname"
                          type="text"
                          placeholder="Course Shortname"
                          value={courseData.shortname}
                          onChange={handleChange}
                        />
                        {formErrors.shortname && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors.shortname}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-black text-base mb-2"
                          htmlFor="summary"
                        >
                          Summary Course
                        </label>
                        <textarea
                          className={`appearance-none border rounded w-full py-3 px-3 leading-tight focus:shadow-outline focus:outline-gray-400 ${
                            formErrors.summary && "border-red-500"
                          }`}
                          id="summary"
                          type="text"
                          placeholder="Summary Course"
                          value={courseData.summary}
                          onChange={handleChange}
                        />
                        {formErrors.summary && (
                          <p className="text-red-500 text-xs italic">
                            {formErrors.summary}
                          </p>
                        )}
                      </div>
                    </form>
                    <div className="flex justify-between mt-4">
                      <Button key="cancel" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button
                        className="bg-orange-400 hover:bg-orange-600 text-white"
                        key="submit"
                        onClick={handleOk}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Modal>
          </div>
          {/* Popup modal untuk pesan shortname taken */}
          <Modal
            visible={shortnameTaken}
            footer={[
              <Button
                className="bg-orange-400 hover:bg-orange-600 text-white"
                key="ok"
                onClick={() => setShortnameTaken(false)}
              >
                {" "}
                OK
              </Button>,
            ]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <RiErrorWarningFill
                style={{
                  marginRight: "10px",
                  fontSize: "24px",
                  color: "red",
                }}
              />
              <p className="font-bold text-lg">
                Short name has already been taken.
              </p>
            </div>
            <p className="m-3 ">
              Short name has already been taken by another course. Please use a
              different short name to try creating a course.
            </p>
          </Modal>
          {/* Popup modal untuk pesan sukses */}
          <Modal
            visible={successMessage}
            footer={[
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white"
                key="ok"
                onClick={() => setSuccessMessage(false)}
              >
                {" "}
                OK
              </Button>,
            ]}
          >
            <p className="font-bold text-lg">Success!</p>
            <p className="my-3 ">Course created successfully.</p>
          </Modal>
        </>
      ) : (
        <>
          <div className="flex justify-end mr-7 m-3">
            <Link to="/all-course">
              <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                View All Courses
              </button>
            </Link>
          </div>
        </>
      )}

      <div className="m-7 mt-5 grid grid-flow-col justify-stretch ...">
        <CourseList role={role} />
      </div>
    </div>
  );
};

export default Course;
