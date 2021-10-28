/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../App';
import BrandIcon from '../BrandIcon/BrandIcon';

export default function Header() {
  const { userData, signOut } = useContext(AuthContext);

  function signOutHandler() {
    signOut();
  }

  if (userData) {
    return (
      <header className="container mx-auto flex flex-row w-full items-center justify-between py-6 px-4 border-b border-gray-300">
        <BrandIcon />

        <div className="flex flex-row items-center">
          <button type="button" onClick={signOutHandler} className="font-sans font-light text-lg mx-3 leading-loose hover:underline">
            Sign Out
          </button>
          <NavLink to={`/${userData.userName}`}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${userData.imageProfile}`}
              alt="User Profile"
              className="h-9 mx-3 rounded-full"
            />
          </NavLink>
        </div>
      </header>
    );
  }

  return (
    <header className="container mx-auto flex flex-row w-full items-center justify-between py-6 px-4 border-b border-gray-300">
      <BrandIcon />

      <div>
        <NavLink to="/signin" className="font-sans font-light text-lg mx-3 leading-loose hover:underline">Sign In</NavLink>
        <NavLink to="/write" className="font-sans font-light text-lg text-gray-100 py-2 px-4 ml-3 bg-black rounded-full transform transition duration-300 hover:text-white hover:bg-gray-900">
          Start Writing
        </NavLink>
      </div>
    </header>
  );
}
