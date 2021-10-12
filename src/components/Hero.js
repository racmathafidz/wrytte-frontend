/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NavLink } from 'react-router-dom';

import HeroImage from '../assets/images/hero-image.png';

export default function Hero() {
  return (
    <div className="container mx-auto px-4 flex flex-row items-center justify-between py-6">
      <div className="w-3/5">
        <p className="font-serif text-6xl">Everyone can write and read in Wrytte.</p>
        <p className="font-sans font-light text-lg mt-4 mb-8">Easy and free to find and make great article and connect with millions of people in Wrytte.</p>
        <NavLink to="/signup" className="font-sans font-light text-lg text-gray-100 py-2 px-4 bg-black rounded-full transform transition duration-300 hover:text-white hover:bg-gray-900">
          Start Writing
        </NavLink>
      </div>
      <div className="w-2/5">
        <img src={HeroImage} alt="Hero" className="object-scale-down" />
      </div>
    </div>
  );
}
