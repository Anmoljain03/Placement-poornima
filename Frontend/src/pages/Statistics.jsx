import React from "react";
import { FaChartBar } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { FiAward } from "react-icons/fi";
import { PiBriefcaseDuotone } from "react-icons/pi";
import { BsBarChartFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { PieChart, Pie, Cell, } from "recharts";
import { SiAccenture, SiTcs, SiInfosys, SiWipro } from "react-icons/si";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Statistics = () => {
  // Static placement statistics
  const stats = [
    { department: "CSE", placedStudents: 85, avgPackage: 8.5 },
    { department: "ECE", placedStudents: 75, avgPackage: 6.2 },
    { department: "ME", placedStudents: 65, avgPackage: 5.5 },
    { department: "CE", placedStudents: 70, avgPackage: 5.8 },
    { department: "EE", placedStudents: 72, avgPackage: 5.6 },
  ];

  const data = [
    { year: 2019, placementRate: 78, avgPackage: 5.5 },
    { year: 2020, placementRate: 75, avgPackage: 6.0 },
    { year: 2021, placementRate: 80, avgPackage: 6.8 },
    { year: 2022, placementRate: 83, avgPackage: 7.2 },
    { year: 2023, placementRate: 87, avgPackage: 7.8 },
  ];

  const datas = [
    { name: "IT & Software", value: 45, color: "#102a43" },
    { name: "Manufacturing", value: 20, color: "#1e3a8a" },
    { name: "Finance", value: 15, color: "#3b82f6" },
    { name: "Consulting", value: 10, color: "#60a5fa" },
    { name: "Others", value: 10, color: "#93c5fd" },
  ];

  const companies = [
    { name: "TCS", students: 45, icon: <SiTcs className=" text-3xl" /> },
    { name: "Infosys", students: 38, icon: <SiInfosys className="text-blue-600 text-5xl ml-1" /> },
    { name: "Wipro", students: 32, icon: <SiWipro className="text-[#261539] text-4xl" /> },
    { name: "Accenture", students: 28, icon: <SiAccenture className="text-[#A100FF] text-3xl" /> },
  ];


  return (
    <div className="  bg-gray-50 py-52 px-6">
  <div className="absolute top-24 left-6 right-6 bg-[#011e39] shadow-xl rounded-3xl py-14 px-4">
    <div className="relative z-10 text-white text-center max-w-3xl mx-auto space-y-5">
      <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop:backdrop-blur-sm mb-4">
        <FaChartBar className="h-5 w-5" />
        <span className="font-medium">PLACEMENT INSIGHTS</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold">Placement Statistics 2024-25</h1>
      <p className="text-white/80 text-lg">
        Comprehensive data on campus recruitment, placement trends and company participation
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-white text-[#1a365d] hover:bg-gray-100 transition-all rounded-xl text-base font-medium">
          <IoDownloadOutline className="size-5" />
          Download Report
        </button>
      </div>
    </div>
  </div>

  {/* Cards Section - Pulled upward to sit below the blue card */}
  <div className="relative z-10 mt-[330px] flex flex-wrap justify-center gap-28 mb-16">
    {/* Highest Package */}
    <div className="w-[320px] h-[220px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-6 space-y-2">
      <div className="bg-[#F1F4F9] rounded-xl p-3">
        <FiAward className="text-[#1A365D] w-6 h-6" />
      </div>
      <h3 className="text-[#2D3748] font-semibold text-lg">Highest Package</h3>
      <p className="text-3xl font-bold text-[#1A365D]">18 LPA</p>
      <p className="text-[#F56565] text-sm font-medium">Software Development</p>
    </div>

    {/* Average Package */}
    <div className="w-[320px] h-[220px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-6 space-y-2">
      <div className="bg-[#F1F4F9] rounded-xl p-3">
        <PiBriefcaseDuotone className="text-[#1A365D] w-6 h-6" />
      </div>
      <h3 className="text-[#2D3748] font-semibold text-lg">Average Package</h3>
      <p className="text-3xl font-bold text-[#1A365D]">7.2 LPA</p>
      <p className="text-[#F56565] text-sm font-medium">Across All Departments</p>
    </div>

    {/* Total Students Placed */}
    <div className="w-[320px] h-[220px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-6 space-y-2">
      <div className="bg-[#F1F4F9] rounded-xl p-3">
        <FaUsers className="text-[#1A365D] w-6 h-6" />
      </div>
      <h3 className="text-[#2D3748] font-semibold text-lg">Total Students Placed</h3>
      <p className="text-3xl font-bold text-[#1A365D]">367</p>
      <p className="text-[#F56565] text-sm font-medium">Out of 443 Students (83%)</p>
    </div>
  </div>

      
      {/* STATISITCS  */}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border bg-[#fff] text-[#020817] mt-8 p-8 border-none shadow-xl rounded-2xl overflow-hidden">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl  font-bold text-[#1a365d]  flex items-center gap-2"><BsBarChartFill />Department-wise Statistics</h2>
            </div>

            {/* Placement Statistics Chart */}
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="placedStudents" name="Placed Students (%)" fill="#1a365d" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgPackage" name="Avg Package (LPA)" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>


          </div>
        </div>

        {/*Yearly-wise statistics  */}

        <div className="border bg-[#fff] text-[#020817] mt-8 p-8 border-none shadow-xl rounded-2xl overflow-hidden">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl  font-bold text-[#1a365d]  flex items-center gap-2"><FaChartLine />Yearly Placement Trends </h2>
            </div>

            {/* CHART */}


            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 2 }}>

                <XAxis dataKey="year" tick={{ fill: "#1a365d" }} />


                <YAxis yAxisId="left" tick={{ fill: "#1a365d" }} />


                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#EC4899" }} />

                <Tooltip />
                <Legend />


                <Line yAxisId="left" type="monotone" dataKey="placementRate" name="Placement Rate (%)" stroke="#1a365d" strokeWidth={2} dot={{ r: 5 }} />

                <Line yAxisId="right" type="monotone" dataKey="avgPackage" name="Avg Package (LPA)" stroke="#EC4899" strokeWidth={2} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>



      </div>


      {/* Indstry-wise distribution */}
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="border bg-[#fff] h-[110%] text-[#020817] mt-8 p-8 border-none shadow-xl rounded-2xl overflow-hidden">
          <div className="space-y-6">

            <h2 className="font-bold text-lg text-[#1a365d] flex items-center gap-2">
              <PiBriefcaseDuotone size={26} /> Industry-wise Distribution
            </h2>
            <div className="flex justify-center">
              <PieChart width={600} height={300}>
                <Pie
                  data={datas}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {datas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            {/* <button className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
        View Details
      </button> */}
          </div>
        </div>

        {/* right-side companies card */}
        <div className="border bg-[#fff] h-[110%] text-[#020817] mt-8 p-8 border-none shadow-xl rounded-2xl overflow-hidden">
          <div className="space-y-6">

            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg text-[#1a365d] flex items-center gap-2">
                <FiAward size={26} /> Top Recruiting Companies
              </h2>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                View All
              </button>
            </div>

            <ul className="mt-4">
              {companies.map((company, index) => (
                <li key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                      {company.icon}
                    </div>
                    <span className="text-gray-800 font-medium">{company.name}</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{company.students} Students</span>
                </li>
              ))}
            </ul>

            <p className="text-center mt-4 text-[#1a365d] font-medium cursor-pointer hover:underline">
              View Complete Placement Report
            </p>
          </div>

        </div>
      </div>



    </div>

  );
};

export default Statistics;
