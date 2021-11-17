import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Header from '../components/Header/Header';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Content Unavailable | Wrytte';
  }, []);

  return (
    <>
      <Header />
      <div className="w-full py-24">
        <p className="text-center font-sans font-light text-3xl mb-3">Sorry, this page isn't available.</p>
        <NavLink to="/" className="flex w-full">
          <p className="mx-auto font-sans font-light text-lg underline">Go Home</p>
        </NavLink>
      </div>
    </>
  );
}
