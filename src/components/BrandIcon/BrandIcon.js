import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BrandIcon(props) {
  const { Footer } = props;

  return (
    <NavLink to="/" className={`font-serif text-4xl ${Footer ? 'text-gray-100' : 'text-gray-900'}`}>
      Wrytte
    </NavLink>
  );
}
