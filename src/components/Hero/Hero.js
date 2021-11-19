import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import HeroImage from '../../assets/images/hero-image.png';

export default function Hero() {
  return (
    <div className="container mx-auto px-4 flex flex-row items-center justify-between py-6 sm:mt-4 lg:mt-0">
      <div className="w-full sm:w-3/5">
        <p className="font-serif text-6xl sm:text-5xl lg:text-6xl">Everyone can write and read in Wrytte.</p>
        <p className="font-sans font-light text-lg mt-4 mb-8">Easy and free to find and make great article and connect with millions of people in Wrytte.</p>
        <NavLink to="/write" className="font-sans font-light text-lg text-gray-100 py-2 px-4 bg-black rounded-full transform transition duration-300 hover:text-white hover:bg-gray-900">
          Start Writing
        </NavLink>
      </div>
      <div className="w-0 sm:w-2/5">
        <LazyLoadImage
          src={HeroImage}
          alt="Hero"
          effect="blur"
          wrapperClassName="object-scale-down"
        />
      </div>
    </div>
  );
}
