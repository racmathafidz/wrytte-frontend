/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header/Header';
import UserProfile from '../components/UserProfile/UserProfile';
import Footer from '../components/Footer/Footer';
import LoadingPage from './LoadingPage';

export default function ProfilePage() {
  const { userName } = useParams();
  const [profileData, setProfileData] = useState();
  const [forceFetch, setForceFetch] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/account/${userName}`)
      .then((response) => {
        setProfileData(response.data);
        setForceFetch(false);
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

  return (
    <LoadingPage />
  );
}
