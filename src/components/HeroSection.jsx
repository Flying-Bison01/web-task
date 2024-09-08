// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative">
      <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTgwMDgwMi13aWtpbWVkaWEtaW1hZ2Uta293YnUxczUuanBn.jpg"
           alt="Background of a modern architectural building"
           className="w-full h-screen object-cover" />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
    </div>
  );
};

export default HeroSection;
