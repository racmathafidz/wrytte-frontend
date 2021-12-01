import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import {
  FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon,
} from 'react-share';

import ArticleMapping from '../ArticleMapping/ArticleMapping';
import dateFormatter from '../../utils/dateFormatter';
import stringToHtml from '../../utils/stringToHtml';
import urlTitle from '../../utils/urlTitle';
import decrypt from '../../utils/decrypt';

export default function Article(props) {
  const { article, recomendation, setForceFetch } = props;
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const [isPopperShow, setIsPopperShow] = useState(false);
  const popperRef = useRef(null);
  const articleUrl = window.location.href;
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

  function forceUpdate() {
    setForceFetch(true);
  }

  function deletePost() {
    axios({
      method: 'DELETE',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/api/article/${article._id}`,
    }).then((response) => {
      forceUpdate();
      setIsPopperShow(false);
    });
  }

  return (
    <div className="pb-52">
      <div className="container mx-auto px-4 md:px-24 lg:px-32 xl:px-52 flex flex-col pt-12 md:pt-16 lg:pt-20 pb-8 font-serif">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="text-4xl lg:text-5xl leading-tight">{article.articleTitle}</p>
            <div className="flex flex-row mt-4 items-center">
              <NavLink
                to={`/${article.authorData.userName}`}
              >
                <LazyLoadImage
                  src={`${article.authorData.imageProfile}`}
                  alt="Author"
                  effect="blur"
                  wrapperClassName="lazyload-author mr-3"
                />
              </NavLink>
              <NavLink
                to={`/${article.authorData.userName}`}
                className="hover:underline"
              >
                <p className="font-sans font-light text-lg">
                  {`${article.authorData.fullName}`}
                </p>
              </NavLink>
              <p className="px-1 font-sans font-light text-lg">·</p>
              <p className="font-sans font-light text-lg">{dateFormatter(article.publishDate)}</p>
            </div>
          </div>
          {
            article.authorId === userDataState.id ? (
              <div className="flex flex-col" ref={popperRef}>
                <button type="button" onClick={popperHandler} data-testid="option-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div className={`${isPopperShow ? 'flex flex-col' : 'hidden'} text-lg font-sans font-light absolute -ml-16 sm:-ml-9 mt-7 px-4 py-3 bg-white rounded ring-1 ring-gray-400`}>
                  <button type="button" className="font-sans font-light mb-1" onClick={deletePost}>Delete</button>
                  <NavLink to={`/edit/${urlTitle(article.articleTitle)}-${article._id}`}>
                    Edit
                  </NavLink>
                </div>
              </div>
            ) : null
          }
        </div>
        <LazyLoadImage
          src={`${article.imageCover}`}
          alt="Article Illustration"
          effect="blur"
          wrapperClassName="my-9 mx-auto"
        />
        <div className="font-serif font-light text-md lg:text-lg text-justify leading-relaxed text-black">
          {stringToHtml(article.articleBody)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-16">
          <div className="border border-gray-500 py-4 px-6 rounded-lg">
            <p className="font-sans font-light text-lg sm:text-xl text-black">About The Author</p>
            <div className="flex flex-row items-center mt-4">
              <NavLink
                to={`/${article.authorData.userName}`}
              >
                <LazyLoadImage
                  src={`${article.authorData.imageProfile}`}
                  alt="Author"
                  effect="blur"
                  wrapperClassName="lazyload-author-about mr-4"
                />
              </NavLink>
              <NavLink
                to={`/${article.authorData.userName}`}
              >
                <p className="font-sans font-light text-xl sm:text-2xl text-gray-900">
                  {`${article.authorData.fullName}`}
                </p>
              </NavLink>
            </div>
          </div>
          <div className="border border-gray-500 py-4 px-6 rounded-lg">
            <p className="font-sans font-light text-lg sm:text-xl text-black">Share This Article</p>
            <div className="flex flex-row items-center mt-4">
              <FacebookShareButton url={`${articleUrl}`} className="mr-2">
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <TwitterShareButton url={`${articleUrl}`} className="mr-2">
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <LinkedinShareButton url={`${articleUrl}`} className="mr-2">
                <LinkedinIcon size={48} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={`${articleUrl}`} className="mr-2">
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <p className="font-serif text-xl text-gray-900 mb-4">More On Wrytte</p>
        <ArticleMapping ArticleData={recomendation} Recomendation />
      </div>
    </div>
  );
}
