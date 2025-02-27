import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";

const Register = ( { setAuthState}) => {
  const navigate = useNavigate();

  //  Validation Schema using Yup//
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

  // ✅ Handle Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Submitting Form Data:", values);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", values);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
  
      setAuthState(true);

      console.log("Registration Successful:", response.data);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration Failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex h-screen ml-20 mr-8 mt- mb-0">
      {/* Left Side Image Section */}
      <div className="w-1/2  relative hidden lg:flex items-center justify-center">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat mb-8 mt-4 "
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      </div>

      {/* Right Side Form Section */}
      <div className="flex justify-center items-center w-auto mt-4 pl-12 pb-8 bg-white">
        <div className="w-full max-w-md bg-[#0A1734] p-8 rounded-2xl shadow-lg border border-[#d33b69]">
          <h2 className="text-black mb-6  text-3xl font-sans font-bold text-center">Create Account</h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              department: "",
              registrationNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                {/* Full Name Field */}
                <label className="text-gray-600 text-sm font-bold" htmlFor="name">
                  Full Name
                </label>
                <Field
                  className="w-full p-3 rounded-md bg-gray-300 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d33b69] outline-none transition-all duration-300 hover:bg-[#1E3A8A]"
                  placeholder="Name.."
                  type="text"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mb-2" />

                {/* Email Field */}
                <label className="text-gray-600 text-sm font-bold" htmlFor="email">
                  Email
                </label>
                <Field
                  className="w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3"
                  placeholder="example@poornima.edu.in"
                  type="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-2" />

                {/* Password Field */}
                <label className="text-gray-600 text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <Field
                  className="w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3"
                  placeholder="******"
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-2" />

                {/* Department Dropdown */}
                <label className="text-gray-600 text-sm font-bold" htmlFor="department">
                  Department
                </label>
                <Field
                  as="select"
                  className="w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3"
                  name="department"
                >
                  <option value=""></option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                </Field>
                <ErrorMessage name="department" component="div" className="text-red-500 text-xs mb-2" />

                {/* Registration Number Field */}
                <label className="text-gray-600 text-sm font-bold" htmlFor="registrationNumber">
                  Registration Number
                </label>
                <Field
                  className="w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3"
                  placeholder="2022PUFCEBMFX12414"
                  type="text"
                  name="registrationNumber"
                />
                <ErrorMessage
                  name="registrationNumber"
                  component="div"
                  className="text-red-500 text-xs mb-2"
                />

                {/* Sign Up & Sign In Buttons on the Same Line */}
                <div className="flex justify-between items-center mt-5">
                  {/* Sign Up Button */}
                  <button
                    className="text-white px-10 py-2 bg-gradient-to-r from-purple-600 to-pink-600 opacity-75  rounded-full font-semibold font-sans text-l"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>

                  {/* Sign In Button */}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="flex items-center text-md text-gray-700"
                  >
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
