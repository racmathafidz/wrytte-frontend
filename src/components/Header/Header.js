import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AuthContext } from '../../App';
import BrandIcon from '../BrandIcon/BrandIcon';
import decrypt from '../../utils/decrypt';

export default function Header() {
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const { signOut } = useContext(AuthContext);
  const [isPopperShow, setIsPopperShow] = useState(false);
  const popperRef = useRef(null);
  clickOutsidePopperHandler(popperRef);

  function clickOutsidePopperHandler(ref) {
    useEffect(() => {
      // Handle click outside the ref
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsPopperShow(false);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  function popperHandler() {
    setIsPopperShow(!isPopperShow);
  }

  function signOutHandler() {
    signOut();
  }

  if (userDataState.userName) {
    return (
      <header className="container mx-auto flex flex-row w-full items-center justify-between py-6 px-4 border-b border-gray-300">
        <BrandIcon />

        <div className="flex flex-col" ref={popperRef}>
          <div className="flex flex-row items-center">
            <NavLink to="/write" className="hidden sm:inline-block font-sans font-light text-lg text-black py-1 px-4 mr-1 rounded-full transform transition duration-300 ring-1 ring-gray-600 hover:ring-1 hover:ring-black">
              Start Writing
            </NavLink>
            <button type="button" onClick={popperHandler}>
              <img
                src={`${userDataState.imageProfile}`}
                alt="User Profile"
                className="h-11 w-11 sm:h-9 sm:w-9 object-cover mx-3 rounded-full"
              />
            </button>
          </div>
          <div
            className={`${isPopperShow ? 'flex flex-col' : 'hidden'} right-8 xl:right-16 mt-12 px-7 py-4 ring-1 ring-gray-400 bg-white rounded-md absolute`}
          >
            <NavLink to={`/${userDataState.userName}`} className="mb-2 font-sans font-light text-md text-black">
              {userDataState.fullName}
            </NavLink>
            <NavLink to="/write" className="sm:hidden mb-2 font-sans font-light text-md text-black">
              Start Writing
            </NavLink>
            <NavLink to="/settings" className="mb-2 font-sans font-light text-md text-black">
              Settings
            </NavLink>
            <button type="button" onClick={signOutHandler} className="font-sans font-light text-md text-black text-left">
              Sign Out
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="container mx-auto flex flex-row w-full items-center justify-between py-6 px-4 border-b border-gray-300">
      <BrandIcon />

      <div>
        <NavLink to="/signin" className="hidden sm:inline-block font-sans font-light text-lg mx-3 leading-loose hover:underline">Sign In</NavLink>
        <NavLink to="/signup" className="font-sans font-light text-lg text-gray-100 py-2 px-4 ml-3 bg-black rounded-full transform transition duration-300 hover:text-white hover:bg-gray-900">
          Start Writing
        </NavLink>
      </div>
    </header>
  );
}
