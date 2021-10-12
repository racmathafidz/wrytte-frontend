import React from 'react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import ArticlesList from '../components/ArticlesList';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <ArticlesList />
      <Footer />
    </>
  );
}
