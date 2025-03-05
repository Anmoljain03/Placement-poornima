


import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaEnvelope, FaWhatsapp,  FaPhoneAlt  } from "react-icons/fa";

const Footer = () => {
  return (

    <div>
      
      {/* Footer Background */}
      <div className="bg-[#CBE0FE] pt-20 pb-10 px-6 md:px-12 lg:px-20">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#1a365d]">

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-lg font-bold">Quick links</p>
            <ul className="space-y-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Statistics</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <ul className="flex gap-9 mt-5">
              <li><a href="#"><FaInstagram size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150  hover:text-pink-500 rounded-lg" /></a></li>
              <li><a href="#"><FaLinkedin size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150   rounded-lg hover:text-[#0077B5]" /></a></li>
              <li><a href="#"><FaYoutube size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150   rounded-lg hover:text-[#ff0033]" /></a></li>
              <li><a href="#"><FaFacebook size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150   rounded-lg hover:text-blue-700" /></a></li>
            </ul>
          
          
          <div className='flex space-x-3 mt-16 items-center'>
          <FaWhatsapp size={24} className="text-green-600" />
          <span className="text-lg font-medium hover:text-[#597eb1] cursor-pointer">+91 9587932492</span>
           </div>
      
           <div className="flex items-center space-x-3">
          <FaPhoneAlt size={24} className="text-blue-700" />
          <span className="text-lg font-medium hover:text-[#597eb1] cursor-pointer">+91 8619681743</span>
        </div>


          </div>

          
          {/* PU Logo & Address */}
          <div className="flex flex-col items-center md:items-end">
            <img src="/images/pulogo.png" alt="PU Logo" className="w-40 md:w-56" />
            <p className="text-center md:text-right w-full md:w-64 mt-2">
              IS-2027-2031, Ramchandrapura, P.O. Vidhani Vatika, Sitapura Extension, Jaipur, Rajasthan (India) 303905.
            </p>
            <div className="border-t-2 border-[#1a365d]  w-72 mt-4"></div>
            <p className="flex items-center justify-center md:justify-end mt-3 text-[#1a365d] hover:text-[#456ca3] cursor-pointer">
              <FaEnvelope size={20} className="mr-2" /> info@poornima.edu.in
            </p>
            <div className="border-t-2 border-[#1a365d] w-72 mt-4"></div>
          </div>

        </div>
      </div>

      {/* Footer Cover Image */}
    
    </div>
  );
};

export default Footer;

// import React from 'react';
// import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaEnvelope, FaWhatsapp,  FaPhoneAlt  } from "react-icons/fa";

// const Footer = () => {
//   return (

//     <div>
      
//       {/* Footer Background */}
//       <div className="bg-[#CBE0FE] pt-20 pb-10 px-6 md:px-12 lg:px-20">

//         {/* Footer Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#1a365d]">

//           {/* Quick Links */}
//           <div>
//             <p className="mb-4 text-lg font-bold">Quick links</p>
//             <ul className="space-y-4">
//               <li><a href="#" className="hover:underline">Home</a></li>
//               <li><a href="#" className="hover:underline">About Us</a></li>
//               <li><a href="#" className="hover:underline">Contact</a></li>
//               <li><a href="#" className="hover:underline">Statistics</a></li>
//             </ul>
//           </div>

//           {/* Social Media */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-bold">Follow Us</h3>
//             <ul className="flex gap-9 mt-5">
//               <li><a href="#"><FaInstagram size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150  hover:text-pink-500 rounded-lg" /></a></li>
//               <li><a href="#"><FaLinkedin size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150   rounded-lg hover:text-[#0077B5]" /></a></li>
//               <li><a href="#"><FaYoutube size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150   rounded-lg hover:text-[#ff0033]" /></a></li>
//               <li><a href="#"><FaFacebook size={30} className="transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-150   rounded-lg hover:text-blue-700" /></a></li>
//             </ul>
          
          
//           <div className='flex space-x-3 mt-16 items-center'>
//           <FaWhatsapp size={24} className="text-green-600" />
//           <span className="text-lg font-medium hover:text-[#597eb1] cursor-pointer">+91 9587932492</span>
//            </div>
      
//            <div className="flex items-center space-x-3">
//           <FaPhoneAlt size={24} className="text-blue-700" />
//           <span className="text-lg font-medium hover:text-[#597eb1] cursor-pointer">+91 8619681743</span>
//         </div>


//           </div>

          
//           {/* PU Logo & Address */}
//           <div className="flex flex-col items-center md:items-end">
//             <img src="/images/pulogo.png" alt="PU Logo" className="w-40 md:w-56" />
//             <p className="text-center md:text-right w-full md:w-64 mt-2">
//               IS-2027-2031, Ramchandrapura, P.O. Vidhani Vatika, Sitapura Extension, Jaipur, Rajasthan (India) 303905.
//             </p>
//             <div className="border-t-2 border-[#1a365d]  w-72 mt-4"></div>
//             <p className="flex items-center justify-center md:justify-end mt-3 text-[#1a365d] hover:text-[#456ca3] cursor-pointer">
//               <FaEnvelope size={20} className="mr-2" /> info@poornima.edu.in
//             </p>
//             <div className="border-t-2 border-[#1a365d] w-72 mt-4"></div>
//           </div>

//         </div>
//       </div>

//       {/* Footer Cover Image */}
    
//     </div>
//   );
// };

// export default Footer;
