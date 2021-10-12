import React from 'react';
import { NavLink } from 'react-router-dom';

import BrandIcon from './BrandIcon';

export default function Header() {
  return (
    <header className="container mx-auto flex flex-row w-full items-center justify-between py-6 px-4 border-b border-gray-300">
      <BrandIcon />

      <div>
        <NavLink to="/signin" className="font-sans font-light text-lg mx-3 leading-loose hover:underline">Sign In</NavLink>
        <NavLink to="/signup" className="font-sans font-light text-lg text-gray-100 py-2 px-4 ml-3 bg-black rounded-full transform transition duration-300 hover:text-white hover:bg-gray-900">
          Start Writing
        </NavLink>
      </div>
    </header>
  );
}
