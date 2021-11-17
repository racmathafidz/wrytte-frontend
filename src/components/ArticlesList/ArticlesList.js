import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import ArticleMapping from '../ArticleMapping/ArticleMapping';

export default function ArticlesList(props) {
  const { article } = props;
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

  return (
    <div className="container mx-auto px-4 pt-6 pb-52">
      <p className="font-serif text-xl mb-6">Recomended Articles</p>
      <ArticleMapping ArticleData={articleData} Home />
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
