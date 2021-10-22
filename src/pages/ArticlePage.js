import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header/Header';
import Article from '../components/Article/Article';
import Footer from '../components/Footer/Footer';
import LoadingPage from './LoadingPage';

export default function ArticlePage() {
  const { articleTitle } = useParams();
  const [articleData, setArticleData] = useState();
  const [recomendation, setRecomendation] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/article/${articleTitle}`)
      .then((response) => {
        setArticleData(response.data);
      });
  }, [articleTitle]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/article/recomendation`)
      .then((response) => {
        setRecomendation(response.data);
      });
  }, [articleTitle]);

  useEffect(() => {
    window.scroll(0, 0);
  });

  if (articleData && recomendation) {
    return (
      <>
        <Header />
        <Article article={articleData} recomendation={recomendation} />
        <Footer />
      </>
    );
  }

  return (
    <LoadingPage />
  );
}
