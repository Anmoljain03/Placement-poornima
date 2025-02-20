import React from 'react';
import { TbUsers } from "react-icons/tb";
import { IoMdTrendingUp } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { LuBriefcase } from "react-icons/lu";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"))?.isAuthenticated || false;

  const teamMembers = [
    {
      name: "Dr. Rakesh Sharma",
      title: "Training & Placement Officer",
      department: "Placement Cell",
      email: "tpo@poornima.edu.in",
      phone: "+91-9876543210",
    },
    {
      name: "Mrs. Priya Verma",
      title: "Placement Coordinator",
      department: "CSE Department",
      email: "placement.cse@poornima.edu.in",
      phone: "+91-9876543211",
    },
    {
      name: "Mr. Rajesh Kumar",
      title: "Industry Relations Head",
      department: "Placement Cell",
      email: "industry.relations@poomima.edu.in",
      phone: "+91-9876543212",
    },
  ];
  
  return (
    <div>
      <section className="text-center space-y-8 py-12 px-10 bg-[#F8F9FA] mt-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A365D] animate-float">
          Welcome to Poornima Placements
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your gateway to career opportunities. Connect with top companies and take
          the first step towards your dream career.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate(isAuthenticated ? "/jobs" : "/register")} 
            className='bg-[#1A365D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300'
          >
            {isAuthenticated ? "Browse Jobs" : "Register Now"}
          </button>
          <p className='bg-slate-900'></p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#F8F9FA] py-12 px-10 mt-22">
        <div className="container mx-auto flex">
          {/* Stat 1 */}
          <div className="w-1/3 flex items-center pl-10 bg-white rounded-lg px-40 p border-2 py-5 m-8">
            <LuBriefcase size={30} className="mr-4 bg-gray-200 p-1 rounded-lg text-[#1A365D]" />
            <div>
              <span className="text-2xl font-bold text-[#1A365D] block">500+</span>
              <p className="text-md text-gray-600">Active Jobs</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="w-1/3 flex items-center pl-10 bg-white rounded-lg px-70 p border-2 py-5 m-8 hover:shadow-lg transition duration-300">
            <TbUsers size={30} className="mr-4 bg-gray-200 p-0.5 px-0.9 rounded-lg text-[#1A365D]" />
            <div className='hover:shadow-lg transition duration-300'>
              <span className="text-2xl font-bold text-[#1A365D] block">1000+</span>
              <p className="text-md text-gray-600">Placed Students</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="w-1/3 flex items-center pl-10 bg-white rounded-lg px-70 p border-2 py-5 m-8 hover:shadow-lg transition duration-300">
            <IoMdTrendingUp size={30} className="mr-4 bg-gray-200 p-1 rounded-lg text-[#1A365D]"  />
            <div className='hover:shadow-lg transition duration-300'>
              <span className="text-2xl font-bold text-[#1A365D] block">92%</span>
              <p className="text-md text-gray-600">Placement Rate</p>
            </div>
          </div> 
        </div>
      </section>

      {/* Placement Team Section */}
      <section className="bg-[#F8F9FA] py-0.5 mb-10 px-10 text-center">
        <h2 className="text-3xl font-bold text-[#1A365D] mb-8">Meet Our Placement Team</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:border-2 hover:border-gray-300">
              <div className="rounded-full bg-gray-300 w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user-circle fa-3x text-gray-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-2">{member.name}</h3>
              <p className="text-[#DB6777] font-semibold mb-1">{member.title}</p>
              <p className="text-gray-600 mb-4">{member.department}</p>
              <div className="flex items-center justify-center space-x-2">
                <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-[#1A365D]">
                  <i className="fas fa-envelope"></i>
                  {member.email}
                </a>
              </div>
              <p className="text-gray-600 mt-2">{member.phone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies */}
      <section className="space-y-6 bg-[#F8F9FA] ">
        <h2 className="text-2xl font-bold text-center text-primary">
          Featured Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 p-8 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-video bg-white border-2 hover:border-gray-900 rounded-lg shadow-sm p-4 flex items-center justify-center"
            >
              <div className="text-gray-400 ">Company Logo, now if i am </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
