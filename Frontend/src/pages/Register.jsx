 import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";
import { showSuccessToast } from "../utils/toast";
import { showErrorToast } from "../utils/toast";

const Register = ({ setAuthState }) => {
  const navigate = useNavigate();

  // ✅ Validation Schema using Yup
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
      const response = await axios.post("http://localhost:5000/api/auth/register", values);
      localStorage.setItem("token", response.data.token);
      
      const userData = {
        name: values.name,
        email: values.email,
        department: values.department,
        registrationNumber: values.registrationNumber,
      };
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
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#0A1734] to-[#d33b69] p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden ">
        {/* Left Side Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>

        {/* Right Side Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-[#0A1734] text-3xl font-bold text-center mb-6">Create an Account</h2>

          <Formik
            initialValues={{ name: "", email: "", password: "", department: "", registrationNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Full Name */}
                <Field className="w-full p-3 mb-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="Full Name" type="text" name="name" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mb-2" />

                {/* Email */}
                <Field className="w-full p-3 mb-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="example@poornima.edu.in" type="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-2" />

                {/* Password */}
                <Field className="w-full p-3 mb-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="Password" type="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-2" />

                {/* Department */}
                <Field as="select" className="w-full p-3 mb-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" name="department">
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </Field>
                <ErrorMessage name="department" component="div" className="text-red-500 text-xs mb-2" />

                {/* Registration Number */}
                <Field className="w-full p-3 rounded-md mb-1 border border-gray-300 focus:ring-2 focus:ring-[#d33b69] outline-none" placeholder="2022PUFCEBMFX12414" type="text" name="registrationNumber" />
                <ErrorMessage name="registrationNumber" component="div" className="text-red-500 text-xs mb-2" />

                {/* Buttons */}
                <div className="flex justify-between items-center mt-5">
                  <button className="text-white px-10 py-2 bg-gradient-to-r from-[#0A1734] to-[#d33b69] rounded-full font-semibold" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                  <button type="button" onClick={() => navigate("/login")} className="flex items-center text-md text-gray-700">
                    <FaArrowRight className="size-5 mr-1" /> Sign In
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
