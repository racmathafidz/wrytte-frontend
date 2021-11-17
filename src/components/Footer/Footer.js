import React from 'react';
import { NavLink } from 'react-router-dom';

import BrandIcon from '../BrandIcon/BrandIcon';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-black mt-12 bottom-0 absolute">
      <div className="container mx-auto px-4 flex flex-row items-center justify-between pb-4">
        <BrandIcon Footer />
        <div className="flex flex-row font-sans font-light text-lg text-gray-100">
          <a href="https://github.com/racmathafidz/wrytte-frontend" target="_blank" rel="noopener noreferrer" className="hover:underline">About</a>
          <NavLink to="/write" className="ml-4 hover:underline">Write</NavLink>
        </div>
      </div>
    </footer>
  );
}
