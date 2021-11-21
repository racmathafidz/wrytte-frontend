import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header/Header';
import Article from '../components/Article/Article';
import Footer from '../components/Footer/Footer';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import getArticleId from '../utils/getArticleId';

export default function ArticlePage() {
  const { articleTitle } = useParams();
  const [articleData, setArticleData] = useState();
  const [recomendation, setRecomendation] = useState();
  const [forceFetch, setForceFetch] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/article/${getArticleId(articleTitle)}`)
      .then((response) => {
        if (response.data.msg) {
          setArticleData(null);
        }
        if (response.data.articleTitle) {
          setArticleData(response.data);
          document.title = `${response.data.articleTitle} | Wrytte`;
          setForceFetch(false);
        }
      });
  }, [articleTitle, forceFetch]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/article/recomendation`)
      .then((response) => {
        setRecomendation(response.data);
      });
  }, [articleTitle, forceFetch]);

  useEffect(() => {
    window.scroll(0, 0);
  });

  if (articleData && recomendation) {
    return (
      <>
        <Header />
        <Article article={articleData} recomendation={recomendation} setForceFetch={setForceFetch} />
        <Footer />
      </>
    );
  }

  if (articleData === null) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <LoadingPage />
  );
}
