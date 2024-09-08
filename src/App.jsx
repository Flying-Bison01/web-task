import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FlightForm from './components/FlightForm';
import Footer from './components/Footer';
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="bg-gray-100 font-roboto">
      <HeroSection />
      <Navbar />
      <FlightForm />
      <Footer />
    </div>
  );
}
export default App
