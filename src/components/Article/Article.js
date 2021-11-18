import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon,
} from 'react-share';

import dateFormatter from '../../utils/dateFormatter';
import stringToHtml from '../../utils/stringToHtml';
import ArticleMapping from '../ArticleMapping/ArticleMapping';

export default function Article(props) {
  const { article, recomendation } = props;
  const articleUrl = window.location.href;

  return (
    <div className="pb-52">
      <div className="container mx-auto px-4 md:px-24 lg:px-32 xl:px-52 flex flex-col pt-12 md:pt-16 lg:pt-20 pb-8 font-serif">
        <p className="text-4xl lg:text-5xl leading-tight">{article.articleTitle}</p>
        <div className="flex flex-row mt-4 items-center">
          <NavLink
            to={`/${article.authorData.userName}`}
          >
            <LazyLoadImage
              src={`${article.authorData.imageProfile}`}
              alt="Author"
              height="2rem"
              width="2rem"
              effect="blur"
              key={index}
              wrapperClassName="object-cover mr-2 rounded-full"
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
        <LazyLoadImage
          src={`${article.imageCover}`}
          alt="Article Illustration"
          height="auto"
          width="auto"
          effect="blur"
          key={index}
          wrapperClassName="my-9 mx-auto"
        />
        <div className="font-serif font-light text-md lg:text-lg text-justify leading-normal text-black">
          {stringToHtml(article.articleBody)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-16">
          <div className="border border-gray-500 py-4 px-6 rounded-lg">
            <p className="font-sans font-light text-xl text-black">About The Author</p>
            <div className="flex flex-row items-center mt-4">
              <NavLink
                to={`/${article.authorData.userName}`}
              >
                <LazyLoadImage
                  src={`${article.authorData.imageProfile}`}
                  alt="Author"
                  height="4rem"
                  width="4rem"
                  effect="blur"
                  key={index}
                  wrapperClassName="object-cover mr-4 rounded-full"
                />
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
          <div className="border border-gray-500 py-4 px-6 rounded-lg">
            <p className="font-sans font-light text-xl text-black">Share This Article</p>
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
