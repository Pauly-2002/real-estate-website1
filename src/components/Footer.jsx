import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className='text-xl font-bold mb-4'>Real Estate Co</h3>
          <p className='text-gray-400'> Your trusted partner is finding the perfect home</p>
        </div>

        <div>
          <h1>Quick Links</h1>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Properties</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <ul className='space-y-2 text-gray-400'>
            <li>123 Real Estate Agent</li>
            <li>Los Angeles, CA 500001</li>
            <li>contact@realestate.com</li>
            <li>(555) 123-4567</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
        </div>

        <div className="flex space-x-4">
          <a href="">
            <FaFacebook
              className="text-gray-400 hover:text-white 
            transition-colors duration-200 text-2xl * cursor-pointer"
            />
          </a>
          <a href="">
            <FaTwitter
              className="text-gray-400 hover:text-white 
            transition-colors duration-200 text-2xl * cursor-pointer"
            />
          </a>
          <a href="">
            <FaInstagram
              className="text-gray-400 hover:text-white 
            transition-colors duration-200 text-2xl * cursor-pointer"
            />
          </a>
          <a href="">
            <FaLinkedin
              className="text-gray-400 hover:text-white 
            transition-colors duration-200 text-2xl * cursor-pointer"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;