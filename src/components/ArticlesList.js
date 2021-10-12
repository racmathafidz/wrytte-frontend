/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { article } from '../json/Articles.json';

export default function ArticlesList() {
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
    const slicedData = article.slice(firstArticleIndex, firstArticleIndex + articleEachPage);
    // Set article's data that will be rendered
    setArticleData(slicedData);
    // Set the amount of pages
    setPageAmount(Math.ceil(article.length / articleEachPage));
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
  }, [firstArticleIndex]);

  function capitalizeFirstLetter(string) {
    const arr = string.split(' ').map((items) => items.charAt(0).toUpperCase() + items.slice(1));
    return arr.join(' ');
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="font-serif text-xl mb-6">Recomended Articles</p>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {
          articleData.map((items, index) => (
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
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageAmount}
        onPageChange={handlePageChange}
        containerClassName="paginationContainer"
        activeClassName="paginationActive"
      />
    </div>
  );
}
