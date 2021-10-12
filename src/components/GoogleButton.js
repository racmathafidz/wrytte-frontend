/* eslint-disable react/prop-types */
import React from 'react';

import Google from '../assets/images/google.png';

export default function GoogleButton(props) {
  const { googleButtonHandler } = props;

  return (
    <button type="button" onClick={() => googleButtonHandler()} className="flex flex-row w-68 items-center bg-blue-500 rounded-lg py-1 pl-1 pr-4 shadow-lg transform transition duration-300 hover:shadow-2xl">
      <div className="flex bg-white rounded-lg h-full mr-10 p-2">
        <img src={Google} alt="Google" className="h-6 self-center" />
      </div>
      <p className="font-sans text-lg text-white py-2">Continue with Google</p>
    </button>
  );
}
