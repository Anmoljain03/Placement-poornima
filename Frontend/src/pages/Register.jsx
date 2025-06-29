

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { GoVerified } from "react-icons/go";
import { LuBuilding } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";


const Register = ({ setAuthState }) => {
  const navigate = useNavigate();

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@poornima\.edu\.in$/, "Invalid Poornima email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/(?=.*[A-Z])(?=.*\d)/, "Must contain 1 uppercase letter & 1 number")
      .required("Password is required"),
    department: Yup.string().required("Department is required"),
    registrationNumber: Yup.string()
      .matches(/^202[0-9]PUF[A-Z]{6}\d{5}$/, "Invalid Registration Number Format (e.g., 2022PUFCEBMF12414)")
      .required("Registration Number is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Submitting Form Data:", values);
    try {
      const response = await axios.post(`${import.meta.env.VITE_LIVE_URL}/api/auth/register`, values);
      localStorage.setItem("token", response.data.token);

      const userData = {
        name: values.name,
        email: values.email,
        department: values.department,
        registrationNumber: values.registrationNumber,
      };
      console.log(response.data);


      localStorage.setItem("userId", response.data?.user?._id);

      localStorage.setItem("user", JSON.stringify(userData));

      setAuthState(true);
      console.log("Registration Successful:", response.data);
      showSuccessToast("Registered Successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
      showErrorToast(error.response?.data?.message || "Registration Failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen  items-center justify-center p-4">
      <div className="w-full max-w-3xl  bg-white h-full  rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden  ">
        {/* Left Side Section */}
        <div className="hidden md:flex flex-col p-11 relative md:col-span-2 bg-gradient-to-br from-[#1a365d] via-[#243b53] to-[#334e68] text-white">
          {/* Header Section */}
          <div className="bg-white/10 backdrop-blur-sm mr-12 px-4 py-2 absolute top-10 rounded-xl flex items-center">
            <LuGraduationCap className="size-7 mr-2" />
            <span className="font-bold">Poornima Placements</span>
          </div>

          {/* Main Content */}
          <div className="mt-24 w-56">
            <h2 className="text-2xl font-bold">Join Our Growing Community of Students</h2>
            <p className="mt-4 text-white/80">
              Create your account to access personalized job opportunities.
            </p>

            {/* Features List */}
            <div className="mt-6 space-y-8">
              <div className="flex  ">
                <div className="bg-white/10 mt-1.5 h-8 w-12 rounded-full "><MdOutlineVerified className="text-center h-5 w-5 ml-2 mt-1.5 " />
                </div>
                <p className="ml-3">
                  <span className="font-bold">Personalized Job Matching</span> <br />
                  <p className="text-white/70 text-sm mt-1 w-44"> Get recommendations based on your skills and interests.</p>
                </p>
              </div>
              <div className="flex ">
                <div className="bg-white/10 mt-1.5 h-8 w-12 rounded-full "><HiOutlineBuildingLibrary
                  className="text-center h-5 w-5 ml-2 mt-1.5 " />
                </div>
                <p className="ml-3">
                  <span className="font-bold">Training Resources</span> <br />
                  <p className="text-white/70 text-sm mt-1 w-44">Access exclusive interview preparation materials.</p>
                </p>
              </div>
              <div className="flex ">
                <div className="bg-white/10 mt-1.5 h-8 w-12 rounded-full "><FiCheckCircle className="text-center h-5 w-5 ml-2 mt-1.5 " />
                </div>
                <p className="ml-3">
                  <span className="font-bold">Placement Tracking</span> <br />
                  <p className="text-white/70 text-sm mt-1 w-44"> Monitor your application status in real-time.</p>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side Form Section */}
        <div className="md:col-span-3 p-8 md:p-10">
          <h2 className="  text-2xl md:text-3xl bg-clip-text bg-gradient-to-r from-[#102a43] to-[#486581] text-transparent font-bold text-center  mt-4 ">Create Your Account</h2>
          <p className="mt-2 text-center text-gray-600">  Join our placement portal to access opportunities

          </p>

          <div className="flex justify-between items-center mb-7 relative">
            <div className="w-10 h-10 mt-7 rounded-full flex items-center justify-center relative z-10 bg-[#1a365d] text-white "><FiUser size={23} />
            </div>

            <div className="absolute mt-10 left-0 right-0 top-0.5 h-0.5 bg-gray-200 translate-y-0.5 z-0"></div>

            <div className="w-10 h-10 mt-7 rounded-full flex items-center justify-center relative z-10 bg-gray-200 text-gray-500"><LuBuilding size={23} /></div>

            <div className="w-10 h-10 mt-7 rounded-full flex items-center justify-center relative z-10 bg-gray-200 text-gray-500"><GoVerified size={23} /></div>


          </div>
          <h3 className="font-semibold text-lg text-[#1a365d] mb-4">Personal Information</h3>




          <Formik
            initialValues={{ name: "", email: "", password: "", department: "", registrationNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Full Name */}
                <Field className="w-full p-3 mb-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="Full Name" type="text" name="name" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mb-2" />

                {/* Email */}
                <Field className="w-full p-3 mb-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="example@poornima.edu.in" type="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-2" />

                {/* Password */}
                <Field className="w-full p-3 mb-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="Password" type="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-2" />

                {/* Department */}
                <Field as="select" className="w-full p-3 mb-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" name="department">
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </Field>
                <ErrorMessage name="department" component="div" className="text-red-500 text-xs mb-2" />

                {/* registrationNumber */}
                <Field className="w-full p-3 rounded-xl mb-2 border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="2022PUFCEBMFX12414" type="text" name="registrationNumber" />
                <ErrorMessage name="registrationNumber" component="div" className="text-red-500 text-xs mb-2" />

                {/* Buttons */}
                <div className=" justify-between items-center mt-5">
                  <button className="text-white  px-32 py-2 ml- bg-gradient-to-r from-[#102a43] to-[#486581]  rounded-full font-semibold " type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                  <button type="button" onClick={() => navigate("/login")} className=" items-center text-md text-gray-700 ml-16 mt-4"> Already have an account? <span className="text-[#486581] font-medium">Sign in</span>

                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;

