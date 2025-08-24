import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 bg-[#111827] shadow-md">
      {/* Logo */}
      <div className=" text-xl font-bold text-white">MyLogo</div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-8">
        <Link className="hover:text-blue-700 text-white" to="/">
          Home
        </Link>
        <Link className="hover:text-blue-700 text-white" to="/admin/upload">
          Upload
        </Link>
        <Link className="hover:text-blue-700 text-white" to="/admin-page">
          Listings
        </Link>
      </div>

      {/* Mobile Toggle Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-white" size={24} /> : <FaBars size={24} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#111827] flex flex-col items-center space-y-4 py-6 shadow-md md:hidden z-50">
          <Link
            className="block hover:text-blue-700 text-white"
            to="/"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            className="block hover:text-blue-700 text-white"
            to="/admin/upload"
            onClick={toggleMenu}
          >
            Upload
          </Link>
          <Link
            className="block hover:text-blue-700 text-white"
            to="/admin-page"
            onClick={toggleMenu}
          >
            Listings
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
