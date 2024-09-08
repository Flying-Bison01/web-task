import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">TravoMile</div>
      {/* Hamburger Icon for Mobile View */}
      <button 
        onClick={toggleMenu}
        type="button" 
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-white md:hidden focus:outline-none" 
        aria-controls="navbar-default" 
        aria-expanded={isMenuOpen}>
        <svg 
          className="w-5 h-5" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 17 14">
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M1 1h15M1 7h15M1 13h15" 
            stroke="white" />
        </svg>
      </button>

      {/* Nav Items */}
      <div className={`md:flex ${isMenuOpen ? 'flex' : 'hidden'} z-10 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-white absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-6 md:p-0`}>
  <a href="#" className="hover:underline">Destinations</a>
  <a href="#" className="hover:underline">Contact Us</a>
  <a href="#" className="hover:underline">Blogs</a>
  <a href="#" className="hover:underline">AI Guide</a>
</div>


      {/* Right Section for Desktop View */}
      <div className="hidden md:flex space-x-6 items-center">
        <div className="text-white flex items-center space-x-2">
          <i className="fas fa-suitcase-rolling"></i>
          <span>My Trips</span>
        </div>
        <div className="text-white flex items-center space-x-2">
          <i className="fas fa-download"></i>
          <span>Download App</span>
        </div>
        <div className="text-white flex items-center space-x-2">
          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-Hh5RPsKhtBPsWCFSiEKnUJ6x/user-8qgiVpCV0U0b7zDjfFInHgjl/img-qKhf8IUA5OSnQdjn6fdXvK8Y.png"
               alt="Profile" className="w-8 h-8 rounded-full" />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
