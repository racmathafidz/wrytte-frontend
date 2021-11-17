import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header/Header';
import UserProfile from '../components/UserProfile/UserProfile';
import Footer from '../components/Footer/Footer';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';

export default function ProfilePage() {
  const { userName } = useParams();
  const [profileData, setProfileData] = useState();
  const [forceFetch, setForceFetch] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/account/${userName}`)
      .then((response) => {
        if (response.data.msg) {
          setProfileData(null);
        }
        if (response.data.profileData) {
          setProfileData(response.data);
          document.title = `${response.data.profileData.fullName} | Wrytte`;
          setForceFetch(false);
        }
      });
  }, [userName, forceFetch]);

  if (profileData) {
    return (
      <>
        <Header />
        <UserProfile profileData={profileData} setForceFetch={setForceFetch} />
        <Footer />
      </>
    );
  }

  if (profileData === null) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <LoadingPage />
  );
}
