import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"))?.isAuthenticated || false;
  
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(error => {
        console.log("Autoplay with sound blocked:", error);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const Counter = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;
      let incrementTime = Math.abs(2000 / end);
      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
    }, [value]);

    return (
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-4xl font-bold">
        {count}+
      </motion.span>
    );
  };

  const stats = [
    { label: "Total Companies", value: 100 },
    { label: "Students Got Placed", value: 400 },
    { label: "Active Jobs", value: 70 },
    { label: "placement Rate", value: 92 },
  ];
  
  const companies = [
    { name: "Accenture", logo: "/images/logo1.png", package: "50 LPA" },
    { name: "Infosys", logo: "/images/infosys.png", package: "45 LPA" },
    { name: "TCS", logo: "/images/tlogo.png", package: "40 LPA" },
    { name: "Wipro", logo: "/images/logo4.png", package: "38 LPA" },
    { name: "Microsoft", logo: "/images/mlogo.png", package: "42 LPA" }
  ];

  const repeatedCompanies = [...companies, ...companies];


  const teamMembers = [
    {
      name: "Mr. Shubham Mahajan",
      title: "Director, Corporate Relations",
      department: "Placement Cell",
      email: "shubham.mahajan@poornima.edu.in || tpc@poornima.edu.in",
      phone: "+91-9993353217",
      Image : "/images/shubham.jpg"
    },
    {
      name: "Mrs. Dipti Lodha",
      title: "Director, Corporate Relations || Placements & Training || Alumni Relations",
      department: "Placement Cell",
      email: "tpo@poornima.org || diptilodha@poornima.org",
      phone: "+91-9828510629",
      Image : "/images/dipti.jpg"
    },
    {
      name: "Mr. Ajay Khunteta",
      title: "Industry Relations Head",
      department: "Placement Cell",
      email: "industry.relations@poornima.edu.in",
      phone: "+91-9876543212",
      Image : "/images/ajay.jpg"
    },
  ];



  
  return (
    <div className='bg-blue-50'>
      {/* Hero Section with Background Video */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center py-12 px-10">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/images/pucideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 space-y-6 px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl mb-96 font-serif text-cyan-50 animate-float">
            Welcome to Poornima Placement Portal
          </h1>
        </div>

        {/* Unmute Button */}
        <button
          onClick={toggleSound}
          className="absolute bottom-10 right-10 bg-white px-4 py-2 m-10 rounded-lg shadow-md text-black"
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
      </section>

      {/* Stats Section */}
     {/* Animated Stats Section */}
     <div className="bg-[#001F3F] text-white py-12 mt-32 mb-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <Counter value={stat.value} />
            <p className="text-sm md:text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>

      {/* Placement Team Section */}
      <section className=" py-28 px-10 text-center">
        <h2 className="text-3xl font-bold text-[#1A365D] mb-8">Meet Our Placement Team</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="rounded-xl border text-card-foreground hover:shadow-xl transition-all border-none shadow-md overflow-hidden group bg-white">
              {/* <div className='h-2 bg-gradient-to-r from-[#ff6b6b] to-pink-600'></div> */}
              
              <img src={member.Image} alt={member.name} className='rounded-full w-32 h-32 mx-auto mb-4 mt-6'/>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-2">{member.name}</h3>
              <p className="text-[#DB6777] font-semibold mb-1 p-2">{member.title}</p>
              <p className="text-gray-600 mb-4">{member.department}</p>
              <div className="flex items-center justify-center space-x-2">
                <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-[#1A365D]">
                  {member.email}
                </a>
              </div>
              <p className="text-gray-600 mt-2 mb-3">{member.phone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="space-y-6  mb-10">
      <div className="w-full  py-32 overflow-hidden">
      <h2 className="text-center text-[#1a365d] text-3xl font-bold ">Featured Companies</h2>
      <p className='text-gray-500 text-center mb-14'>Our top-tier partners offering exceptional placement packages to students</p>
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {repeatedCompanies.map((company, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}
              transition={{ duration: 0.5, ease:"easeOut" }}
              className="flex flex-col items-center border-b-2 border-[#1a365d] bg-white shadow-lg rounded-2xl h-60 p-4 min-w-[200px] md:min-w-[400px] cursor-pointer">
              <img src={company.logo} alt={company.name} className="w-48 h-28 object-contain" />
              <h3 className="text-lg font-semibold mt-8">{company.name}</h3>
              <p className="text-sm font-bold text-[#1a365d]">Package: {company.package}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
      </section>

      {/* Footer Cover */}
      <div className=" pb-">
        <img src="/images/footercover.webp" alt="Footer Cover" className="border rounded-md" />
      </div>
    </div>
  );
};

export default Home;