// import React from "react";



// const Statistics = () => {
//   return (
//     <div className="bg-gray-50 py-4">
//       {/* Wider container for proper spacing */}
//       <div className="max-w-[1400px] mx-auto text-center px-8 lg:px-0">
//         {/* Title Section */}
//         <h2 className="text-3xl font-bold text-gray-900">
//           Placement Statistics 2023-24
//         </h2>
//         <p className="text-lg text-gray-600 mt-1">
//           Poornima Institute of Engineering & Technology
//         </p>

//         {/* Statistics Cards */}
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
//           {/* Total Students Placed */}
//           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full">
//             <h3 className="text-gray-700 text-lg font-medium">
//               Total Students Placed
//             </h3>
//             <p className="text-3xl font-bold text-blue-900 mt-2">367</p>
//             <p className="text-red-500 text-sm mt-1">Out of 443 Students</p>
//           </div>

//           {/* Highest Package */}
//           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full">
//             <h3 className="text-gray-700 text-lg font-medium">
//               Highest Package
//             </h3>
//             <p className="text-3xl font-bold text-blue-900 mt-2">18 LPA</p>
//             <p className="text-red-500 text-sm mt-1">Software Development</p>
//           </div>

//           {/* Average Package */}
//           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full">
//             <h3 className="text-gray-700 text-lg font-medium">
//               Average Package
//             </h3>
//             <p className="text-3xl font-bold text-blue-900 mt-2">7.2 LPA</p>
//             <p className="text-red-500 text-sm mt-1">Across All Departments</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;


import React from "react";
import {
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

  return (
    <div className="bg-gray-50 py-6 px-6">
      <div className="max-w-[1400px] mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900">
          Department-wise Placement Statistics
        </h2>
        <p className="text-lg text-gray-600 mt-1">
          Poornima Institute of Engineering & Technology
        </p>

        {/* Statistics Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Students Placed */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full">
            <h3 className="text-gray-700 text-lg font-medium">
              Total Students Placed
            </h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">367</p>
            <p className="text-red-500 text-sm mt-1">Out of 443 Students</p>
          </div>

          {/* Highest Package */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full">
            <h3 className="text-gray-700 text-lg font-medium">
              Highest Package
            </h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">18 LPA</p>
            <p className="text-red-500 text-sm mt-1">Software Development</p>
          </div>

          {/* Average Package */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full">
            <h3 className="text-gray-700 text-lg font-medium">
              Average Package
            </h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">7.2 LPA</p>
            <p className="text-red-500 text-sm mt-1">Across All Departments</p>
          </div>
        </div>

        {/* Placement Statistics Chart */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placedStudents" name="Placed Students (%)" fill="#1E3A8A" />
              <Bar dataKey="avgPackage" name="Avg Package (LPA)" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
