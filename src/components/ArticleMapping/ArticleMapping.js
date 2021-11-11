/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import OwnProfileArticleMapping from '../OwnProfileArticleMapping/OwnProfileArticleMapping';
import dateFormatter from '../../utils/dateFormatter';

export default function ArticleMapping(props) {
  const { ArticleData, Home, Recomendation, Status, setForceFetch } = props;

  function capitalizeFirstLetter(string) {
    const arr = string.split(' ').map((items) => items.charAt(0).toUpperCase() + items.slice(1));
    return arr.join(' ');
  }

  function urlTitle(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
  }

  if (Home) {
    return (
      <div className="grid grid-cols-3 gap-7 mb-6">
        {
          ArticleData.map((items, index) => (
            <div className="mb-6" key={index}>
              <NavLink to={`/article/${urlTitle(items.articleTitle)}`}>
                <LazyLoad>
                  <img src={`${items.imageCover}`} alt="Article" className="h-72 w-96 rounded object-cover mb-2" />
                </LazyLoad>
                <p className="text-xl font-sans">{items.articleTitle}</p>
              </NavLink>
              <div className="flex flex-row items-center mt-2">
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
      <div className="grid grid-cols-3 gap-7">
        {
          ArticleData.map((items, index) => (
            <div className="mb-6" key={index}>
              <NavLink to={`/article/${urlTitle(items.articleTitle)}`}>
                <LazyLoad>
                  <img src={`${items.imageCover}`} alt="Article" className="h-72 w-96 rounded object-cover mb-2" />
                </LazyLoad>
                <p className="text-xl font-sans">{items.articleTitle}</p>
              </NavLink>
              <div className="flex flex-row items-center mt-2">
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

  if (Status === 'OthersProfile') {
    return (
      <div className="grid grid-cols-3 gap-7 mt-12 mb-6">
        {
            ArticleData.map((items, index) => (
              <div className="mb-6" key={index}>
                <NavLink to={`/article/${urlTitle(items.articleTitle)}`} className="">
                  <LazyLoad>
                    <img src={`${items.imageCover}`} alt="Article" className="h-72 w-96 rounded object-cover mb-2" />
                  </LazyLoad>
                  <p className="text-xl font-sans">{items.articleTitle}</p>
                </NavLink>
                <div className="flex flex-row items-center mt-2">
                  <NavLink to={`/${items.authorData.userName}`}>
                    <LazyLoad>
                      <img
                        src={`${items.authorData.imageProfile}`}
                        alt="Author"
                        className="h-7 w-7 object-cover mr-3 rounded-full"
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

  if (Status === 'OwnProfile') {
    return (
      <div className="grid grid-cols-3 gap-7 mt-12 mb-6">
        {
            ArticleData.map((items, index) => (
              <OwnProfileArticleMapping items={items} index={index} setForceFetch={setForceFetch} />
            ))
          }
      </div>
    );
  }
}
