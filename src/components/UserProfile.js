/* eslint-disable react/no-array-index-key */
import React from 'react';
import { NavLink } from 'react-router-dom';

import { article } from '../json/Articles.json';

export default function UserProfile() {
  function capitalizeFirstLetter(string) {
    const arr = string.split(' ').map((items) => items.charAt(0).toUpperCase() + items.slice(1));
    return arr.join(' ');
  }

  return (
    <div className="container mx-auto px-4 mt-12 mb-20">
      <div className="flex flex-row items-center">
        <img src={article[0].userImage} alt="Author" className="h-28 mr-6 rounded-full" />
        <p className="font-sans font-light text-5xl">{capitalizeFirstLetter(article[0].userName)}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-12">
        {
            article.filter((items, index) => index <= 2).map((items, index) => (
              <div className="mb-6" key={index}>
                <NavLink to="/blog" className="">
                  <img src={items.imageCover} alt="Article" className="mb-2" />
                  <p className="text-xl font-sans">{capitalizeFirstLetter(items.title)}</p>
                </NavLink>
                <div className="flex flex-row items-center mt-1">
                  <NavLink to="/profile">
                    <img src={items.userImage} alt="Author" className="h-7 mr-3 rounded-full" />
                  </NavLink>
                  <NavLink to="/profile" className="hover:underline">
                    <p className="font-sans font-light">{capitalizeFirstLetter(items.userName)}</p>
                  </NavLink>
                  <p className="px-1 font-sans font-light">·</p>
                  <p className="font-sans font-light">{items.date}</p>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
}
