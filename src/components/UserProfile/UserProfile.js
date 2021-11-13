/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ReactPaginate from 'react-paginate';

import ArticleMapping from '../ArticleMapping/ArticleMapping';
import decrypt from '../../utils/decrypt';

export default function UserProfile(props) {
  const { profileData, setForceFetch } = props;
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  // Article data
  const [articleData, setArticleData] = useState([]);
  // First article's index each page
  const [firstArticleIndex, setFirstArticleIndex] = useState(0);
  // The amount of pagination page
  const [pageAmount, setPageAmount] = useState(0);
  // The amount of article in each page
  const articleEachPage = 9;

  function getArticleData() {
    // Dividing article's data for each page
    // Start from first article's index to the last index (on each page)
    const slicedData = profileData.articleData.slice(firstArticleIndex, firstArticleIndex + articleEachPage);
    // Set article's data that will be rendered
    setArticleData(slicedData);
    // Set the amount of pages
    setPageAmount(Math.ceil(profileData.articleData.length / articleEachPage));
  }

  function handlePageChange(event) {
    const currentPage = event.selected;
    // Set selected page article's data
    // Example: clicking page 5, then 5 * 9 (article each page), equals to 45, then first article on page 5 is an article with index 45
    setFirstArticleIndex(currentPage * articleEachPage);
  }

  useEffect(() => {
    getArticleData();
    // This useEffect will run every firstArticleIndex changes (which is every page changes)
  }, [firstArticleIndex, profileData]);

  return (
    <div className="container mx-auto px-4 mt-12 mb-20">
      <div className="flex flex-row items-center">
        <LazyLoad>
          <img
            src={`${profileData.profileData.imageProfile}`}
            alt="Author"
            className="h-28 w-28 object-cover mr-6 rounded-full"
          />
        </LazyLoad>
        <p className="font-sans font-light text-5xl">{profileData.profileData.fullName}</p>
      </div>
      <ArticleMapping
        ArticleData={articleData}
        Status={profileData.profileData._id === userDataState.id ? 'OwnProfile' : 'OthersProfile'}
        setForceFetch={setForceFetch}
      />
      {
        articleData.length !== 0 && (
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={pageAmount}
            onPageChange={handlePageChange}
            containerClassName="paginationContainer"
            activeClassName="paginationActive"
          />
        )
      }
    </div>
  );
}
