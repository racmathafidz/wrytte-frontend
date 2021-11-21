import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwnProfileArticleMapping from '../OwnProfileArticleMapping/OwnProfileArticleMapping';
import dateFormatter from '../../utils/dateFormatter';
import urlTitle from '../../utils/urlTitle';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import placheHolderImage from '../../assets/images/placeholder-image.png';

export default function ArticleMapping(props) {
  const {
    ArticleData, Home, Recomendation, Status, setForceFetch,
  } = props;

  if (Home) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-7 mb-6">
        {
          ArticleData.map((items, index) => (
            <div className="mb-6" key={index}>
              <NavLink to={`/article/${urlTitle(items.articleTitle)}-${items._id}`}>
                <LazyLoadImage
                  effect="blur"
                  src={items.imageCover}
                  alt="Article"
                  key={index}
                  wrapperClassName="lazyload-article mb-2"
                  placeholderSrc={placheHolderImage}
                />
                <p className="text-xl font-sans">{items.articleTitle}</p>
              </NavLink>
              <div className="flex flex-row items-center mt-2">
                <NavLink
                  to={`/${items.authorData.userName}`}
                >
                  <LazyLoadImage
                    effect="blur"
                    src={items.authorData.imageProfile}
                    alt="Author"
                    key={index}
                    wrapperClassName="lazyload-author mr-3"
                    placeholderSrc={placheHolderImage}
                  />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-7">
        {
          ArticleData.map((items, index) => (
            <div className="mb-6" key={index}>
              <NavLink to={`/article/${urlTitle(items.articleTitle)}-${items._id}`}>
                <LazyLoadImage
                  effect="blur"
                  src={items.imageCover}
                  alt="Article"
                  key={index}
                  wrapperClassName="lazyload-article mb-2"
                  placeholderSrc={placheHolderImage}
                />
                <p className="text-xl font-sans">{items.articleTitle}</p>
              </NavLink>
              <div className="flex flex-row items-center mt-2">
                <NavLink
                  to={`/${items.authorData.userName}`}
                >
                  <LazyLoadImage
                    effect="blur"
                    src={items.authorData.imageProfile}
                    alt="Author"
                    key={index}
                    wrapperClassName="lazyload-author mr-3"
                    placeholderSrc={placheHolderImage}
                  />
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
    if (ArticleData.length === 0) {
      return (
        <div className="w-full py-28">
          <p className="text-center font-sans font-light text-lg">This user hasn't written any articles yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-7 mt-12 mb-6">
        {
            ArticleData.map((items, index) => (
              <div className="mb-6" key={index}>
                <NavLink to={`/article/${urlTitle(items.articleTitle)}-${items._id}`}>
                  <LazyLoadImage
                    effect="blur"
                    src={items.imageCover}
                    alt="Article"
                    key={index}
                    wrapperClassName="lazyload-article mb-2"
                    placeholderSrc={placheHolderImage}
                  />
                  <p className="text-xl font-sans">{items.articleTitle}</p>
                </NavLink>
                <div className="flex flex-row items-center mt-2">
                  <NavLink to={`/${items.authorData.userName}`}>
                    <LazyLoadImage
                      effect="blur"
                      src={items.authorData.imageProfile}
                      alt="Author"
                      key={index}
                      wrapperClassName="lazyload-author mr-3"
                      placeholderSrc={placheHolderImage}
                    />
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
    if (ArticleData.length === 0) {
      return (
        <div className="w-full py-24">
          <p className="text-center font-sans font-light text-lg">Wellcome, you haven't written any articles yet.</p>
          <NavLink to="/write" className="flex w-full">
            <p className="mx-auto font-sans font-light text-lg underline">Start Writing</p>
          </NavLink>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-7 mt-12 mb-6">
        {
            ArticleData.map((items, index) => (
              <OwnProfileArticleMapping items={items} index={index} setForceFetch={setForceFetch} />
            ))
          }
      </div>
    );
  }
}
