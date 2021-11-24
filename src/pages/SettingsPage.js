import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header/Header';
import Settings from '../components/Settings/Settings';
import Footer from '../components/Footer/Footer';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import { ActionCreators } from '../redux/actions';
import decrypt from '../utils/decrypt';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { SignOutAction } = bindActionCreators(ActionCreators, dispatch);
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const history = useHistory();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/account/${userDataState.userName}`)
      .then((response) => {
        if (response.data.msg) {
          SignOutAction();
          history.push('/signup');
        }
        if (response.data.profileData) {
          setProfileData(response.data);
        }
      });
  }, []);

  useEffect(() => {
    document.title = 'Settings | Wrytte';
    if (!encryptedState.UserData.userData) {
      history.push('/signup');
    }
  }, [encryptedState]);

  if (profileData) {
    return (
      <>
        <Header />
        <Settings profileData={profileData.profileData} />
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
    <>
      <LoadingPage />
    </>
  );
}
