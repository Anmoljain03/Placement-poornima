// import React from 'react'


// const About = () => {
//   return (
//       <div className='Box-1 bg-[#d9d9d9] h-[180vh] max-w-7xl flex justify-center items-center'>

//       <div className='Box-2 bg-slate-100 w-[60%] mb-44 p-96  relative shadow-lg '>

//         <div className='Image  w-[70vh] h-[70vh] mt-12  rounded-full object-contain absolute -top-20 -left-28 t bg-[#d9d9d9] '>
//           <img  src="/images/pulogo.jpeg" alt="not availaible"  className=' mt-10  ml-8 w-[60vh] rounded-full shadow-lg scale-105'  />
//         </div>
        
//         <h2 className='absolute top-20 left-96 translate-x-16 text-5xl font-bold'>About  Poornima Placement Portal</h2>

//         <p className='absolute  ml-16 w-96 text-md top-64'>At Poornima University, we strive to provide exceptional placement opportunities to our students by bridging the gap between academia and industry. Our Poornima Placement Portal serves as a one-stop solution for students, faculty, and recruiters to explore job opportunities, register for placement drives, and track recruitment statistics seamlessly</p>
        
//         <button className='text-white absolute top-[28rem] left-[28rem] border rounded-lg pl-9 pr-9 pt-2 pb-2 bg-[#1a365d] '>Sign Up</button>
  
//   <div className='flex flex-col md:flex-row gap-6"'>

//   <div className="absolute w-80 h-80 mt-9 overflow-auto scrollbar-hide border  rounded-2xl shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-blue-500 to-blue-700 top-[33rem] right-[38rem] p-6 md:p-8 text-white">
  
//   {/* Heading */}
//   <p className="text-2xl md:text-3xl font-bold text-center mb-4">
//     Connecting Students with Top Recruiters
//   </p>

//   {/* Description */}
//   <p className="text-sm md:text-base leading-relaxed text-white/90">
//     At <span className="font-semibold">Poornima University</span>, we collaborate with 
//     <span className="font-bold"> 200+ top companies</span> across IT, Core Engineering, 
//     Management, and more. Our placement portal allows students to:
//   </p>

//   {/* Bullet Points */}
//   <ul className="mt-4 space-y-3 text-white/90 text-sm md:text-base">
//     <li className="flex items-center gap-2">✅ Explore job listings based on their field of interest.</li>
//     <li className="flex items-center gap-2">🚀 Apply for company drives directly through the portal.</li>
//     <li className="flex items-center gap-2">📅 Track their application status and interview schedule.</li>
//   </ul>

//   {/* Key Recruiters */}
//   <div className="mt-6 border-t border-white/30 pt-4">
//     <p className="font-semibold text-lg">Key Recruiters:</p>
//     <p className="text-sm md:text-base text-white/80">
//       TCS, Infosys, Wipro, Accenture, Capgemini, Cognizant, and many more.
//     </p>
//   </div>

// </div>

// {/*Div 2*/}
//         <div className='absolute w-80 mt-9 overflow-auto scrollbar-hide  border  rounded-2xl shadow-lg transition-all  hover:scale-105  bg-[#adcff1] top-[33rem] right-[16rem] h-80 p-6 md:p-8'>
//         <p className="text-2xl md:text-3xl font-bold text-center mb-4  text-[#1a365d]">
//         A Streamlined Hiring Process for Companies
//         </p>

//        <p className="text-sm md:text-base leading-relaxed text-[#1a365d]">We ensure a seamless recruitment process for companies by providing:
//        </p>
//        <ul className="mt-4 space-y-3 list-decimal text-[#1a365d] text-sm md:text-base">
//        <li className="flex items-center gap-2 font-semibold">1. Easy registration & job posting for recruiters.</li>
//        <li className="flex items-center gap-2 font-semibold">2. Automated student shortlisting based on eligibility criteria.</li>
//        <li className="flex items-center gap-2 font-semibold">3. Real-time communication between students and HR teams.</li>
// </ul>

//      <div className="mt-6 border-t border-[#1a365d] pt-4">🔍 Our Placement Cell works closely with industry leaders to curate the best career opportunities for students.
//      </div>


//         </div>
       
       
       
// {/*Div 3*/}       
//         <div className='absolute w-80 mt-9 overflow-auto scrollbar-hide border  rounded-2xl shadow-lg transition-all  hover:scale-105 bg-[#1f5392] top-[33rem] -right-[6rem] h-80 p-6 md:p-8'>

//           <p className="text-2xl md:text-3xl font-bold text-center mb-4  text-white/90">Success Stories & Placement Statistics</p>

//           <p className='text-white/90 mb-2 text-sm md:text-base leading-relaxed'>🎉Poornima University consistently achieved a 90%+ placement rate for eligible students.</p>

//          <p className='text-white/100 mb-4 mt-4 text-sm md:text-base leading-relaxed'> 📈 Highlights from the Previous Year:</p>
//          <div className='block'>
//         <ul className='text-[#97d1d1]  '>
//           <li className="flex items-center gap-2 font-bold" > • Highest Package: ₹12 LPA</li>
//           <li className="flex items-center gap-2 font-semibold">• Average Package: ₹4.5 LPA</li>
//           <li className="flex items-center gap-2 font-semibold">• Top Companies Hired: 120+</li>
//         </ul>
//         </div>
         
         
//         <div className="mt-6 border-t border-white pt-4">
//          <p className='text-white/90'>Our alumni are placed in leading organizations across the globe, contributing to the success of their respective industries.</p>
//          </div>
//         </div>
//         </div>
      
//       </div>

//     </div>
//   )
// }

// export default About;



import React from 'react';

const About = () => {
  return (
    <div className='Box-1 bg-[#d9d9d9] min-h-screen flex justify-center items-center px-4'>
      <div className='Box-2 bg-slate-100 w-full mb-1 max-w-6xl p-8 relative shadow-lg flex flex-col items-center text-center md:text-left'>
        
        {/* Image Section */}
        <div className='relative flex justify-center w-full'>
          <div className='w-48 md:w-60 lg:w-72 h-48 md:h-60 lg:h-72 rounded-full bg-slate-100 flex justify-center items-center '>
            <img src="/images/pulogo.jpeg" alt="not available" className='w-40 md:w-56 lg:w-64 rounded-full ' />
          </div>
        </div>

        {/* Heading */}
        

        {/* Paragraph */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8">
  {/* Title Section */}
  <div className="text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] drop-shadow-lg">
      About Poornima Placement Portal
    </h2>
    <p className="text-[#1a365d] mt-3 text-sm md:text-lg leading-relaxed">
      Bridging the gap between academia and industry, our portal serves as a one-stop solution for students, faculty, and recruiters to explore job opportunities, register for placement drives, and track recruitment statistics seamlessly.
    </p>
  </div>

  {/* Mission & Vision Section */}
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-6 rounded-lg bg-gradient-to-r from-[#1a365d] to-blue-400 shadow-lg hover:scale-105 transition-transform duration-300">
      <h3 className="text-lg md:text-xl font-semibold text-white">🎯 Our Mission</h3>
      <p className="text-gray-100 mt-2 text-sm md:text-base">
        Empower students with career opportunities, industry insights, and a streamlined hiring process through an advanced digital platform.
      </p>
    </div>
    <div className="p-6 rounded-lg bg-gradient-to-r from-[#0A1734] to-[#d33b69]  shadow-lg hover:scale-105 transition-transform duration-300">
      <h3 className="text-lg md:text-xl font-semibold text-white">📌 Our Vision</h3>
      <p className="text-gray-100 mt-2 text-sm md:text-base">
        Establish Poornima University as a top recruitment hub by fostering collaborations with leading national and multinational companies.
      </p>
    </div>
  </div>

  {/* Features Section */}
  <div className="mt-10 p-6 md:p-8 rounded-lg   bg-opacity-20 backdrop-blur-lg ">
    <h3 className="text-xl md:text-2xl font-semibold text-black text-center">
      🔹 Why Poornima Placement Portal?
    </h3>
    <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start space-x-3">
        <span className="text-green-400 text-xl">✔️</span>
        <p className="text-[#0d1c30] text-sm md:text-base">
          <span className="font-semibold">Real-time Job Notifications</span> – Stay updated with the latest placement opportunities.
        </p>
      </div>
      <div className="flex items-start space-x-3">
        <span className="text-green-400 text-xl">✔️</span>
        <p className="text-[#0d1c30] text-sm md:text-base">
          <span className="font-semibold">Company Registration & Student Applications</span> – Hassle-free application process for recruiters and students.
        </p>
      </div>
      <div className="flex items-start space-x-3">
        <span className="text-green-400 text-xl">✔️</span>
        <p className="text-[#0d1c30] text-sm md:text-base">
          <span className="font-semibold">Placement Statistics & Insights</span> – Access data on recruitment trends and past placements.
        </p>
      </div>
      <div className="flex items-start space-x-3">
        <span className="text-green-400 text-xl">✔️</span>
        <p className="text-[#0d1c30]text-sm md:text-base">
          <span className="font-semibold">Personalized Dashboard</span> – Manage your placement journey efficiently.
        </p>
      </div>
    </div>
  </div>
</div>


        {/* Sign Up Button */}
        <div className='mt-1'>
          <button className='text-white border rounded-lg px-6 py-2  bg-[#1a365d]'>Sign Up</button>
        </div>

        {/* Cards Section */}
        <div className='mt-14 flex flex-col md:flex-row gap-6 w-full justify-center'>
          
          {/* Card 1 */}
          <div className='w-full max-w-xs p-6 md:p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-lg  bg-white rounded-lg'>
            <p className='text-xl md:text-2xl font-bold text-center mb-4'>Connecting Students with Top Recruiters</p>
            <p className='text-sm md:text-base'>At Poornima University, we collaborate with...</p>
            <ul className='mt-4 space-y-2 text-sm md:text-base'>
              <li>✅ Explore job listings</li>
              <li>🚀 Apply for company drives</li>
              <li>📅 Track application status</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className='w-full max-w-xs p-6 md:p-8 bg-[#adcff1] text-[#1a365d] rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-lg  '>
            <p className='text-xl md:text-2xl font-bold text-center mb-4'>A Streamlined Hiring Process for Companies</p>
            <ul className='mt-4 space-y-2 text-sm md:text-base'>
              <li>1. Easy registration & job posting</li>
              <li>2. Automated shortlisting</li>
              <li>3. Real-time communication</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className='w-full max-w-xs p-6 md:p-8 bg-[#1f5392] text-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-lg'>
            <p className='text-xl md:text-2xl font-bold text-center mb-4'>Success Stories & Placement Statistics</p>
            <p className='text-sm md:text-base'>🎉 Poornima University consistently achieved...</p>
            <ul className='mt-4 space-y-2 text-[#97d1d1]'>
              <li>• Highest Package: ₹12 LPA</li>
              <li>• Average Package: ₹4.5 LPA</li>
              <li>• Top Companies Hired: 120+</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
