import React, { useEffect } from 'react';

import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import Footer from '../components/Footer';

export default function ProfilePage() {
  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <>
      <Header />
      <UserProfile />
      <Footer />
    </>
  );
}
