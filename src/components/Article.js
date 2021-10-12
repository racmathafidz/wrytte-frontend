/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon,
} from 'react-share';

import { article } from '../json/Articles.json';

export default function Article() {
  function capitalizeFirstLetter(string) {
    const arr = string.split(' ').map((items) => items.charAt(0).toUpperCase() + items.slice(1));
    return arr.join(' ');
  }

  return (
    <div className="pb-8">
      <div className="container mx-auto px-52 flex flex-col pt-20 pb-8 font-serif">
        <p className="text-5xl">{capitalizeFirstLetter(article[0].title)}</p>
        <div className="flex flex-row mt-4 items-center">
          <NavLink to="/profile">
            <img src={article[0].userImage} alt="Author" className="h-8 mr-2 rounded-full" />
          </NavLink>
          <NavLink to="/profile" className="hover:underline">
            <p className="font-sans font-light text-lg">{capitalizeFirstLetter(article[0].userName)}</p>
          </NavLink>
          <p className="px-1 font-sans font-light text-lg">·</p>
          <p className="font-sans font-light text-lg">{article[0].date}</p>
        </div>
        <img src={article[0].imageCover} alt="Article Illustration" className="my-9" />
        <p className="font-serif font-light text-lg text-justify leading-normal text-gray-900">{article[0].body}</p>
        <div className="grid grid-cols-2 gap-4 my-9">
          <div className="border border-gray-400 py-4 px-6 rounded-lg">
            <p className="text-lg text-gray-900">About The Author</p>
            <div className="flex flex-row items-center mt-4">
              <NavLink to="/profile">
                <img src={article[0].userImage} alt="Author" className="h-16 mr-4 rounded-full" />
              </NavLink>
              <NavLink to="/profile">
                <p className="font-sans font-light text-2xl text-gray-900">{capitalizeFirstLetter(article[0].userName)}</p>
              </NavLink>
            </div>
          </div>
          <div className="border border-gray-400 py-4 px-6 rounded-lg">
            <p className="text-lg text-gray-900">Share This Article</p>
            <div className="flex flex-row items-center mt-4">
              <FacebookShareButton url="http://localhost:3000/blog" className="mr-2">
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <TwitterShareButton url="http://localhost:3000/blog" className="mr-2">
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <LinkedinShareButton url="http://localhost:3000/blog" className="mr-2">
                <LinkedinIcon size={48} round />
              </LinkedinShareButton>
              <WhatsappShareButton url="http://localhost:3000/blog" className="mr-2">
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <p className="font-serif text-xl text-gray-900 mb-2">More On Wrytte</p>
        <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
}
