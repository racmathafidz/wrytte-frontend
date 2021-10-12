import React, { useEffect } from 'react';

import Header from '../components/Header';
import Article from '../components/Article';
import Footer from '../components/Footer';

export default function ArticlePage() {
  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <>
      <Header />
      <Article />
      <Footer />
    </>
  );
}
