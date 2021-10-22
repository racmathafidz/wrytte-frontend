/* eslint-disable react/prop-types */
import React from 'react';
import LazyLoad from 'react-lazyload';

import ArticleMapping from '../ArticleMapping/ArticleMapping';

export default function UserProfile(props) {
  const { profileData } = props;

  return (
    <div className="container mx-auto px-4 mt-12 mb-20">
      <div className="flex flex-row items-center">
        <LazyLoad>
          <img src={`${process.env.REACT_APP_BASE_URL}/${profileData.profileData.imageProfile}`} alt="Author" className="h-28 mr-6 rounded-full" />
        </LazyLoad>
        <p className="font-sans font-light text-5xl">{profileData.profileData.fullName}</p>
      </div>
      <ArticleMapping ArticleData={profileData.articleData} Profile />
    </div>
  );
}
