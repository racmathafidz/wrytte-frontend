/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

import dateFormatter from '../../utils/dateFormatter';

export default function OwnProfileArticleMapping(props) {
  const { items, index, setForceFetch } = props;
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

  function urlTitle(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
  }

  function popperHandler() {
    setIsPopperShow(!isPopperShow);
  }

  function forceUpdate() {
    setForceFetch(true);
  }

  function deletePost() {
    console.log(items._id);
    axios({
      method: 'DELETE',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/api/article/${items._id}`,
    }).then((response) => forceUpdate());
  }

  return (
    <div className="mb-6" key={index}>
      <NavLink to={`/article/${urlTitle(items.articleTitle)}`} className="">
        <LazyLoad>
          <img src={`${items.imageCover}`} alt="Article" className="h-72 w-96 rounded object-cover mb-2" />
        </LazyLoad>
      </NavLink>
      <div className="flex flex-row justify-between items-center" ref={popperRef}>
        <div className="flex flex-col">
          <NavLink to={`/article/${urlTitle(items.articleTitle)}`}>
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
        <div className="flex flex-col">
          <button type="button" onClick={popperHandler} data-testid="option-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <div className={`${isPopperShow ? 'flex flex-col' : 'hidden'} font-sans font-light absolute -ml-9 mt-7 px-3 py-2 bg-white rounded ring-1 ring-gray-400`}>
            <button type="button" className="font-sans font-light mb-1" onClick={deletePost}>Delete</button>
            <NavLink to="/write">Edit</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
