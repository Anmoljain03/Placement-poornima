import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CiMail } from "react-icons/ci"; 
import { CiPhone } from "react-icons/ci"; 
import { LuMessageCircle } from "react-icons/lu"; 
import { BsGlobe } from "react-icons/bs"; 
import { FiSend } from "react-icons/fi"; 
import { MdLocationOn } from "react-icons/md"; 
import { FiPhone } from "react-icons/fi"; 
import { TbClockHour4 } from "react-icons/tb";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";


const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", agreeToTerms: false, });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim() || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters long.";
    if (!formData.email.trim() || !/^[a-zA-Z0-9._%+-]+@poornima\.edu\.in$/.test(formData.email)) {
      newErrors.email = "Enter a valid Poornima University email (poornima.edu.in).";
  }

    if (!formData.subject.trim() || formData.subject.length < 5) newErrors.subject = "Subject must be at least 5 characters.";
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters.";
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms of service.";
  }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/contact", formData , { headers: { "Content-Type": "application/json" }
       });
       toast.success(<div className="flex items-center gap-3">
        <FaCheckCircle className="text-gray-900 text-xl" /> {/* ✅ Custom Icon */}
        <div>
          <p className="font-medium text-black">Your message has been sent successfully!</p>
          <p className="text-sm text-gray-600">We'll get back to you as soon as possible.</p>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        className: "bg-white shadow-lg border border-gray-100 rounded-lg p-4",
        icon : false,

      });
  
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (response.data.success) {
        
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form after success
      } else {
        setResponseMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      toast.error(" Failed to send message. Try again later.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error submitting contact form:", error);
      
    }
    setLoading(false);
  };

  const faqs = [
    {
      question: "How can I register on the Placement Portal?",
      answer:
        "To register, visit the Placement Portal and sign up using your official university email ID. Once registered, you can update your profile and apply for job opportunities.",
    },
    {
      question: "Can I apply to multiple companies at the same time?",
      answer:
        "Yes, students can apply to multiple companies listed on the Placement Portal. However, make sure to check each company's eligibility criteria before applying.",
    },
    {
      question: "How will I be notified about placement opportunities?",
      answer:
        "The Placement Portal sends notifications about new job postings and company visits. You can also check the 'Job Listings' section regularly for updates.",
    },
    {
      question: "What details should I update in my profile?",
      answer:
        "Ensure your profile includes updated personal details, academic records, skills, projects, and a well-formatted resume. Companies use this information to shortlist candidates.",
    },
    {
      question: "Is it mandatory to apply through the Placement Portal?",
      answer:
        "Yes, all applications for on-campus placements must be submitted through the Placement Portal. This helps track student applications and maintain transparency in the process.",
    },
    {
      question: "Where can I find placement statistics?",
      answer:
        "Placement statistics, including the number of students placed, highest and average packages, and company-wise placements, can be found in the 'Placement Statistics' section of the portal.",
    },
  ];

  const [activeTab, setActiveTab] = useState("faq");


  const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  

  return (
    <div>
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center text-center">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center m-4"
    style={{
      backgroundImage: "url('/images/footercover.webp')",
      backgroundPosition: "center center",
    }}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#102a43e6] to-[#243b53e6] z-10 m-4"></div>

  {/* Text Content with Framer Motion Animation */}
  <motion.div
    className="relative z-10 text-white px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
      Get in Touch
    </h2>
    <p className="mt-2 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
      We&apos;d love to hear from you. Whether you have a question about admissions, 
      placements, or anything else, our team is ready to answer all your questions.
    </p>
  </motion.div>
</div>

{/* Contact Cards Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-12 max-w-8xl mx-auto">
  {[
    {
      title: "General Inquiries",
      description: "For general information about our institution",
      email: "info@poornima.edu.in",
      phone: "+91 1412-770790",
      icon: <LuMessageCircle size={24} className="text-xl" />,
    },
    {
      title: "Admissions",
      description: "For admission related queries",
      email: "admissions@poornima.edu.in",
      phone: "+91 1412-770791",
      icon: <BsGlobe size={24} className="text-xl" />,
    },
    {
      title: "Placements",
      description: "For placement and career opportunities",
      email: "placements@poornima.edu.in",
      phone: "+91 1412-770792",
      icon: <FiSend size={24} className="text-xl" />,
    },
  ].map((contact, index) => (
    <motion.div
      key={index}
      onClick={() => setSelected(index)} // Set selected card on click
      className={`bg-white p-6 shadow-lg rounded-lg border flex flex-col gap-4 relative cursor-pointer transition-all duration-300 hover:shadow-2xl ${
        selected === index
          ? "hover:bg-[#a2bfe720] bg-[#1a365d80] border-[#1a365d] shadow-2xl"
          : "border-gray-200"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      {/* Right-side dot */}
      <div
        className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-300 ${
          selected === index ? "bg-[#1a365d]" : "bg-gray-300"
        }`}
      ></div>

      <h3 className="font-bold flex items-center text-[#1a365d] h-6 w-6">
        {contact.icon}
      </h3>
      <h3 className="text-xl sm:text-2xl font-semibold">{contact.title}</h3>
      <p className="text-gray-500 text-sm sm:text-base">{contact.description}</p>
      <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
        <CiMail size={18} /> <span>{contact.email}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
        <CiPhone size={18} /> <span>{contact.phone}</span>
      </div>
    </motion.div>
  ))}
</div>


{/* CONTACT SECTION */}
<div className="max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
  {/* Left Side - Contact Information */}
  <div>
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#102a43] to-[#486581] bg-clip-text text-transparent inline-block">
      Our Information
    </h2>
    <div className="space-y-6">
      {/* Address */}
      <div className="flex items-start gap-4">
        <div className="bg-[#d9e2ec80] p-3 rounded-full">
          <MdLocationOn size={26} className="text-[#1a365d]" />
        </div>
        <div>
          <h4 className="text-lg font-medium">Address</h4>
          <p className="text-gray-600">
            Poornima Institute of Engineering & Technology, ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-4">
        <div className="bg-[#d9e2ec80] p-3 rounded-full">
          <FiPhone size={24} className="text-[#1a365d]" />
        </div>
        <div>
          <h4 className="text-lg font-medium">Phone</h4>
          <p className="text-gray-600">+91 1412-770790</p>
          <p className="text-gray-600">+91 1412-770799</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="bg-[#d9e2ec80] p-3 rounded-full">
          <CiMail size={24} className="text-[#1a365d]" />
        </div>
        <div>
          <h4 className="text-lg font-medium">Email</h4>
          <p className="text-gray-600">info@poornima.edu.in</p>
          <p className="text-gray-600">support@poornima.edu.in</p>
        </div>
      </div>

      {/* Working Hours */}
      <div className="flex items-start gap-4">
        <div className="bg-[#d9e2ec80] p-3 rounded-full">
          <TbClockHour4 size={24} className="text-[#1a365d]" />
        </div>
        <div>
          <h4 className="text-lg font-medium">Working Hours</h4>
          <p className="text-gray-600">Monday - Friday: 9am - 5pm</p>
          <p className="text-gray-600">Saturday: 9am - 1pm</p>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side - Contact Form */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6 w-full max-w-[700px] mx-auto shadow-sm relative z-10"
  >
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#102a43] to-[#486581] bg-clip-text text-transparent">
      Send Us a Message
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1a365d40] focus:border-[#1a365d]"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="yourname@example.com"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1a365d40] focus:border-[#1a365d]"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1a365d40] focus:border-[#1a365d]"
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder="Write your message here..."
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1a365d40] focus:border-[#1a365d]"
        ></textarea>
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.agreeToTerms}
          onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the terms of service and privacy policy
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1a365d] text-sm text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a365d90] transition-all w-full md:w-auto"
      >
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </form>
  </motion.div>
</div>





<div className="w-full max-w-5xl mx-auto p-6 ">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-300 ">
        <button
          onClick={() => setActiveTab("faq")}
          className={`flex-1 py-3 text-center text-lg font-semibold  ${
            activeTab === "faq"
              ? "border-b-2 border-[#1a365d] bg-gradient-to-r from-[#102a43] to-[#486581] bg-clip-text text-transparent"
              : "text-gray-500"
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab("howUsed")}
          className={`flex-1 py-3 text-center text-lg font-semibold ${
            activeTab === "howUsed"
              ? "border-b-2 border-[#1a365d] bg-gradient-to-r from-[#102a43] to-[#486581] bg-clip-text text-transparent"
              : "text-gray-500"
          }`}
        >
          How To Use
        </button>
      </div>

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
        <div className="mt-8 space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-r from-[#102a43] to-[#486581] bg-clip-text text-transparent shadow-md rounded-lg border border-gray-400 overflow-hidden"
            whileHover={{ scale: 1.00 }}
            transition={{ duration: 0 }}
          >
            <button
              className="w-full text-left p-4 font-medium text-lg flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <motion.p
                className="px-4 pb-4 text-gray-600 text-sm leading-relaxed "
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
        </motion.div>
      )}

      {/* How I Used Section */}
      {activeTab === "howUsed" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <h2 className="text-2xl font-bold mb-4"></h2>
          <p className="p-4 border rounded-lg bg-gray-100 mb-3">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="text-base font-medium flex items-center gap-2"><FaCheckCircle/> Finding Opportunities</h3>
            <p className="text-sm text-[#64748b]">Browse all available placement opportunities on the Jobs page. Use filters to narrow down by department, job type, or search for specific roles and companies.</p></div>
          </p>

          <p className="p-4 border rounded-lg bg-gray-100 mb-3">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="text-base font-medium flex items-center gap-2"><FaCheckCircle/> Applying for Positions</h3>
            <p className="text-sm text-[#64748b]">Click "Apply Now" on any job listing to submit your application. Make sure your profile information is complete and updated before applying.</p></div>
            </p>

            <p className="p-4 border rounded-lg bg-gray-100 mb-3">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="text-base  font-medium flex items-center gap-2"><FaCheckCircle/>  Tracking Applications</h3>
            <p className="text-sm text-[#64748b]">Visit the Placement Status page to track your applications. You'll see the status of each application, upcoming interviews, and placement offers.</p></div>
            </p>

            <p className="p-4 border rounded-lg bg-gray-100 mb-3">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="text-base font-medium flex items-center gap-2"><FaCheckCircle/>  Getting Notifications</h3>
            <p className="text-sm text-[#64748b]">Stay updated with important announcements, application status changes, and upcoming events through the Notifications panel on each page.</p></div>
            </p>
            
          
        </motion.div>
      )}
    </div>

</div>
    
  );
};

  

export default ContactUs;


