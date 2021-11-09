/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import dateFormatter from '../../utils/dateFormatter';

export default function ArticleMapping(props) {
  const { ArticleData, Home, Recomendation, Profile } = props;
  function capitalizeFirstLetter(string) {
    const arr = string.split(' ').map((items) => items.charAt(0).toUpperCase() + items.slice(1));
    return arr.join(' ');
  }
  function urlTitle(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
  }

  if (Home) {
    return (
      <div className="grid grid-cols-3 gap-6 mb-6">
        {
          ArticleData.map((items, index) => (
            <div className="mb-6" key={index}>
              <NavLink to={`/article/${urlTitle(items.articleTitle)}`}>
                <LazyLoad>
                  <img src={`${items.imageCover}`} alt="Article" className="mb-2" />
                </LazyLoad>
                <p className="text-xl font-sans">{items.articleTitle}</p>
              </NavLink>
              <div className="flex flex-row items-center mt-1">
                <NavLink
                  to={`/${items.authorData.userName}`}
                >
                  <LazyLoad>
                    <img
                      src={`${items.authorData.imageProfile}`}
                      alt="Author"
                      className="h-7 w-7 object-cover mr-3 rounded-full"
                    />
                  </LazyLoad>
                </NavLink>
                <NavLink
                  to={`/${items.authorData.userName}`}
                  className="hover:underline"
                >
                  <p className="font-sans font-light">
                    {items.authorData.fullName}
                  </p>
                </NavLink>
                <p className="px-1 font-sans font-light">·</p>
                <p className="font-sans font-light">
                  {dateFormatter(items.publishDate)}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  if (Recomendation) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {
          ArticleData.map((items, index) => (
            <div className="mb-6" key={index}>
              <NavLink to={`/article/${urlTitle(items.articleTitle)}`}>
                <LazyLoad>
                  <img src={`${items.imageCover}`} alt="Article" className="mb-2" />
                </LazyLoad>
                <p className="text-xl font-sans">{items.articleTitle}</p>
              </NavLink>
              <div className="flex flex-row items-center mt-1">
                <NavLink
                  to={`/${items.authorData.userName}`}
                >
                  <LazyLoad>
                    <img
                      src={`${items.authorData.imageProfile}`}
                      alt="Author"
                      className="h-7 h-7 object-cover mr-3 rounded-full"
                    />
                  </LazyLoad>
                </NavLink>
                <NavLink
                  to={`/${items.authorData.userName}`}
                  className="hover:underline"
                >
                  <p className="font-sans font-light">
                    {capitalizeFirstLetter(items.authorData.fullName)}
                  </p>
                </NavLink>
                <p className="px-1 font-sans font-light">·</p>
                <p className="font-sans font-light">{dateFormatter(items.publishDate)}</p>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  if (Profile) {
    return (
      <div className="grid grid-cols-3 gap-4 mt-12">
        {
            ArticleData.map((items, index) => (
              <div className="mb-6" key={index}>
                <NavLink to={`/article/${urlTitle(items.articleTitle)}`} className="">
                  <LazyLoad>
                    <img src={`${items.imageCover}`} alt="Article" className="mb-2" />
                  </LazyLoad>
                  <p className="text-xl font-sans">{items.articleTitle}</p>
                </NavLink>
                <div className="flex flex-row items-center mt-1">
                  <NavLink to={`/${items.authorData.userName}`}>
                    <LazyLoad>
                      <img
                        src={`${items.authorData.imageProfile}`}
                        alt="Author"
                        className="h-7 h-7 object-cover mr-3 rounded-full"
                      />
                    </LazyLoad>
                  </NavLink>
                  <NavLink to={`/${items.authorData.userName}`} className="hover:underline">
                    <p className="font-sans font-light">{items.authorData.fullName}</p>
                  </NavLink>
                  <p className="px-1 font-sans font-light">·</p>
                  <p className="font-sans font-light">{dateFormatter(items.publishDate)}</p>
                </div>
              </div>
            ))
          }
      </div>
    );
  }
}
