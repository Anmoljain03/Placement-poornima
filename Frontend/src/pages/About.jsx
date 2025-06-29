import React from 'react';
import { motion } from "framer-motion";
import { HiMiniTrophy } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { LuTarget } from "react-icons/lu";
import { FaGlobe } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5"; 
import { BsBuildings } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6"; 
import { CiHeart } from "react-icons/ci"; 
import { RiBriefcase3Line } from "react-icons/ri"; 
import { GoLightBulb } from "react-icons/go"; 

const About = () => {
  return (
   
   <main>
    <div className='space-y-16 max-w-full overflow-hidden'>
    {/* section */}
    <motion.section
  className="relative rounded-3xl overflow-hidden group transition-all duration-700 m-7"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}
>
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-[#011e39] z-0"></div>

  {/* Content Container */}
  <div className="container mx-auto py-24 md:py-4 px-6 relative z-10">
    <div className="max-w-3xl mx-auto text-center space-y-8">

      {/* Animated Logo */}
      <motion.div
        className="inline-flex bg-white/10 rounded-full backdrop-blur-md mb-0 animate-float 
                   shadow-xl border border-white/20 transition-all duration-500 
                   hover:shadow-accent/20 hover:border-white/30 group-hover:scale-110 mt-2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img src="/images/pulogo.jpeg" alt="Poornima University Logo" className="w-16 h-16 rounded-full" />
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-5xl font-bold text-white leading-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Shaping Future  
        <span className="bg-gradient-to-r from-[#ff6b6b] via-[#ff6b6b]/90 to-white/90 ml-2
                              bg-clip-text text-transparent animate-pulse">Careers</span>
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p
        className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        Building bridges between academia and industry since 1999, transforming students into 
        industry-ready professionals through innovative training and placement strategies.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background 
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                     h-10 bg-white text-primary hover:bg-white/90 transition-all text-base px-4 py-4 rounded-xl shadow-lg 
                     hover:shadow-white/30 font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Placement Cell
        </motion.button>
      </motion.div>

    </div>
  </div>
</motion.section>


{/* Section-2 */}
 <div className='bg-gray-100'>
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
            Empowering Students for
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[#486581] bg-clip-text text-transparent ml-3">
              Career Excellence
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            The Training and Placement Cell at Poornima Institute of Engineering &
            Technology works with a vision to bridge the gap between industry and
            academia. We focus on nurturing talent and helping students discover
            their potential through comprehensive training and placement support.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Our dedicated team of placement officers, industry experts, and
            faculty members collaborate to ensure that students are well-prepared
            for the corporate world. We maintain strong relationships with
            leading companies across various sectors to provide diverse
            opportunities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="flex items-center space-x-4 group p-4 rounded-xl transition-all duration-300 hover:bg-primary-50/50">
              <div className="bg-primary-50 p-4 rounded-full group-hover:bg-primary-100 transition-colors group-hover:scale-110 transform duration-300">
                <HiMiniTrophy className="w-6 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-2xl text-primary">500+</h4>
                <p className="text-gray-600">Companies Visited</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group p-4 rounded-xl transition-all duration-300 hover:bg-primary-50/50">
              <div className="bg-primary-50 p-4 rounded-full group-hover:bg-primary-100 transition-colors group-hover:scale-110 transform duration-300">
                <LuUsers className="w-6 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-2xl text-primary">12,000+</h4>
                <p className="text-gray-600">Students Placed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative flex justify-center">
          <div className="relative z-10 rounded-2xl overflow-hidden transform hover:scale-[1.03] transition-transform duration-500 group">
            <img
              src="/images/poornimapic.jpeg"
              alt="Poornima University Logo"
              className="w-full h-88 object-cover border rounded-2xl transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-bold text-xl">Building Future Leaders</h3>
                <p className="text-white/90">Our placement team guiding students towards success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  

{/* Section-3 */}

<section className='relative  overflow-hidden'>
  <div className='absolute inset-0 bg-gradient-to-br from-[#f0f4f8] to-white z-0'></div>
  <div className='absolute top-0 right-0 w-96 h-96 bg-[#f0f4f880] rounded-full '></div>
  <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b6b1a] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl z-0 animate-float'></div>
  <div className='container mx-auto px-6 relative z-10'>
    <div className='text-center max-w-3xl mx-auto mb-6'>
      <h2 className='text-3xl sm:text-4xl font-bold text-[#1a365d] mb-4'>Our Mission & Vision</h2>
      <p className='text-gray-600 text-lg'>Guiding principles that drive our dedication to student success</p>
</div>

<div className='grid md:grid-cols-2 gap-10'>
  <div className='border bg-card text-[#020817] shadow-sm p-8 md:p-10 border-none hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-[#f0f4f880] rounded-3xl group overflow-hidden relative transform hover:-translate-y-2'>
  <div className='absolute inset-0 bg-grid-pattern opacity-[0.03] z-0'></div>
  <div className='absolute -right-20 -bottom-20 w-64 h-64 bg-[#d9e2ec] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-3xl z-0'></div>
  <div className='space-y-6 relative z-10'>
    <div className='bg-[#1a365d1a] p-4 inline-block rounded-2xl 
                                group-hover:bg-[#1a365d33] transition-colors duration-300 
                                transform group-hover:scale-110'><LuTarget className='w-6 h-6' /></div>
   <h3 className='text-2xl font-bold text-[#1a365d]'>Our Mission</h3>
   <p className='text-gray-600 text-lg leading-relaxed'>To empower students with the skills, knowledge, and opportunities needed to build successful careers. We strive to create a seamless pathway from academic excellence to professional success by providing comprehensive placement services and industry-aligned training.</p>  
   <button className='justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 group flex items-center text-[#1a365d] hover:text-[#334e68] hover:bg-primary-50 gap-2 mt-4'>
   Learn More <IoIosArrowForward /></button>                           
  </div>
 </div>

{/* RIGHT DIV */}

<div className='border bg-white text-[#020817] shadow-sm p-8 md:p-10 border-none hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-[#f0f4f880] rounded-3xl group overflow-hidden relative transform hover:-translate-y-2'>

<div className='space-y-6 relative z-10'>
  <div className='bg-[#1a365d1a] p-4 inline-block rounded-2xl 
                                group-hover:bg-[#1a365d33] transition-colors duration-300 
                                transform group-hover:scale-110'><FaGlobe className='w-6 h-6' /></div>
    <h3 className='text-2xl font-bold text-[#1a365d]'>Our Vision</h3>
    <p className='text-gray-600 text-lg leading-relaxed'>To be the premier placement cell among technical institutions, recognized for our innovative approach to career development and our ability to meet the evolving needs of both students and industry partners. We aim to achieve 100% placement for eligible students in reputed organizations.</p>                        
    <button className='justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 group flex items-center text-[#1a365d] hover:text-[#334e68]  hover:bg-primary-50 gap-2 mt-4'>
    Learn More <IoIosArrowForward /></button>
  </div>                             
</div>
</div>
</div>
</section>

{/* SECTION-4 */}

<section className='container mx-auto px-6'>
  <div className='text-center max-w-3xl mx-auto mb-6 mt-10'>
  <h2 className='text-3xl sm:text-4xl font-bold text-[#1a365d] mb-4'>Why Choose Poornima Placements</h2>
  <p className='text-gray-600 text-lg '>Our unique approach to preparing students for professional success</p>
  </div>

{/* <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-4'> */}

  {/* box-1 */}

  <motion.section
  className="container mx-auto px-6 py-12 m"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[ 
      { icon: <IoBookOutline className="w-6 h-6" />, title: "Industry-Focused Training", desc: "Comprehensive training programs designed with industry inputs to develop technical and soft skills.", delay: 0.1 },
      { icon: <BsBuildings className="w-6 h-6" />, title: "Corporate Connections", desc: "Strong network with 500+ companies across diverse sectors providing varied career opportunities.", delay: 0.2 },
      { icon: <FaCalendarDays className="w-6 h-6" />, title: "Year-Round Activities", desc: "Continuous engagement through mock interviews, resume workshops, and industry interactions.", delay: 0.3 },
      { icon: <CiHeart className="w-6 h-6" />, title: "Personalized Guidance", desc: "Dedicated mentors who provide tailored guidance to students based on their career aspirations.", delay: 0.4 },
      { icon: <RiBriefcase3Line className="w-6 h-6" />, title: "Pre-Placement Offers", desc: "Opportunities for internships that convert to full-time positions before final placements.", delay: 0.5 },
      { icon: <GoLightBulb className="w-6 h-6" />, title: "Innovation Hub", desc: "Foster entrepreneurial mindset with startup support and incubation facilities.", delay: 0.6 }
    ].map((box, index) => (
      <motion.div
        key={index}
        className="bg-white text-[#020817] shadow-lg p-6 md:p-8 
          border border-gray-200 rounded-xl flex flex-col items-start 
          space-y-4 hover:shadow-xl transition-all duration-500 h-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: box.delay }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-br from-[#243b53] to-[#486581] 
            p-4 inline-flex rounded-xl text-white shadow-md">
          {box.icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#334e68]">
          {box.title}
        </h3>
        <p className="text-gray-600 text-base">
          {box.desc}
        </p>
      </motion.div>
    ))}
  </div>
</motion.section>


{/* </div> */}

</section>

</div>
    </div>
   </main>
   
  );
}

export default About;
