// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <div className="hidden md:flex justify-center desktop-visible">
      <div className="relative w-full max-w-8xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-yellow-400 rounded-t-lg"></div>
        <div className="bg-white rounded-t-lg shadow-md px-6 py-4 w-full">
          <h2 className="text-center text-xl font-semibold">Popular Destinations</h2>
          <p className="text-center text-gray-500 mt-2">
            Most popular destinations around the world, from historical places to natural wonders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
