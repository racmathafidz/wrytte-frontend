import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ArticlesList from '../components/ArticlesList/ArticlesList';
import Footer from '../components/Footer/Footer';
import LoadingPage from './LoadingPage';

export default function LandingPage() {
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    document.title = 'Wrytte';
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/article`)
      .then((response) => {
        setArticleData(response.data);
      });
  }, []);

  if (articleData) {
    return (
      <>
        <Header />
        <Hero />
        <ArticlesList article={articleData} />
        <Footer />
      </>
    );
  }

  return (
    <LoadingPage />
  );
}
