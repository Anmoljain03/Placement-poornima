import React from 'react'
import { Link } from 'react-router-dom' // Import Link component

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex-flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* left section */}
        <div>
          <p className='w-full md:2/3 text-gray-600 leading-6'>
          © 2025 AcuHealth. Book appointments with trusted doctors quickly and securely. Your health, privacy, and satisfaction are our priorities. Contact us for support, terms, or privacy details.
          </p>
        </div>   

        {/* center section */}
        {/* <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>
            <Link to="/Home" className='hover:underline'>Home</Link>
            </li>

            <li>
            <Link to="/Statistics" className='hover:underline'>Statistics</Link>
            </li>

            <li>
            <Link to="/Contact" className='hover:underline'>Contact</Link>
            </li>

        
          </ul>
        </div> */}

        {/* right section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 8619681743</li>
            <li>+91 9587932492</li>
            <li>anmol.jain1420@gmail.com</li>
            <li>babanimahima1@gmail.com</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Footer

