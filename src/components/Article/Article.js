/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import {
  FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon,
} from 'react-share';

import dateFormatter from '../../utils/dateFormatter';
import ArticleMapping from '../ArticleMapping/ArticleMapping';

export default function Article(props) {
  const { article, recomendation } = props;
  const articleUrl = window.location.href;

  return (
    <div className="pb-8">
      <div className="container mx-auto px-52 flex flex-col pt-20 pb-8 font-serif">
        <p className="text-5xl">{article.articleTitle}</p>
        <div className="flex flex-row mt-4 items-center">
          <NavLink
            to={`/${article.authorData.userName}`}
          >
            <LazyLoad>
              <img
                src={`${article.authorData.imageProfile}`}
                alt="Author"
                className="h-8 w-8 object-cover mr-2 rounded-full"
              />
            </LazyLoad>
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
        <LazyLoad>
          <img src={`${article.imageCover}`} alt="Article Illustration" className="my-9 mx-auto" />
        </LazyLoad>
        <p className="font-serif font-light text-lg text-justify leading-normal text-gray-900">{article.articleBody}</p>
        <div className="grid grid-cols-2 gap-4 my-9">
          <div className="border border-gray-400 py-4 px-6 rounded-lg">
            <p className="text-lg text-gray-900">About The Author</p>
            <div className="flex flex-row items-center mt-4">
              <NavLink
                to={`/${article.authorData.userName}`}
              >
                <LazyLoad>
                  <img
                    src={`${article.authorData.imageProfile}`}
                    alt="Author"
                    className="h-16 w-16 object-cover mr-4 rounded-full"
                  />
                </LazyLoad>
              </NavLink>
              <NavLink
                to={`/${article.authorData.userName}`}
              >
                <p className="font-sans font-light text-2xl text-gray-900">
                  {`${article.authorData.fullName}`}
                </p>
              </NavLink>
            </div>
          </div>
          <div className="border border-gray-400 py-4 px-6 rounded-lg">
            <p className="text-lg text-gray-900">Share This Article</p>
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
        <p className="font-serif text-xl text-gray-900 mb-2">More On Wrytte</p>
        <ArticleMapping ArticleData={recomendation} Recomendation />
      </div>
    </div>
  );
}
