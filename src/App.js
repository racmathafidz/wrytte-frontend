import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import LandingPage from './pages/LandingPage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WritePostPage from './pages/WritePostPage';
import EditPostPage from './pages/EditPostPage';
import LoadingPage from './pages/LoadingPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { ActionCreators } from './redux/actions';
import encrypt from './utils/encrypt';
import capitalizeFirstLetter from './utils/capitalizeFirstLetter';

export const AuthContext = React.createContext();

function App() {
  const dispatch = useDispatch();
  const { SignInAction, SignOutAction } = bindActionCreators(ActionCreators, dispatch);

  const [signUpResponse, setSignUpResponse] = useState();
  const [signInResponse, setSignInResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function AuthGoogle(googleData) {
    axios({
      method: 'POST',
      data: {
        token: googleData.tokenId,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/google`,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const payload = {
        id: response.data._id,
        email: response.data.email,
        fullName: response.data.fullName,
        userName: response.data.userName,
        imageProfile: response.data.imageProfile,
        google: response.data.google,
      };
      SignInAction({
        userData: encrypt(payload),
      });
    });
  }

  function getGoogleUser() {
    axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/google/user`,
    }).then((response) => {
      setUserData(response.data);
    });
  }

  function signUpLocal(email, password, firstName, lastName) {
    const fullName = capitalizeFirstLetter(`${firstName} ${lastName}`);
    setIsLoading(true);
    axios({
      method: 'POST',
      data: {
        email,
        password,
        fullName,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/local/signup`,
    }).then((response) => {
      setIsLoading(false);
      if (response.data.msg === 'User with That Email Already Exist.') {
        setSignUpResponse(response.data.msg);
        setIsLoading(false);
      }
      if (response.data.msg === 'User Created') signInLocal(email, password);
    });
  }

  function signInLocal(email, password) {
    setIsLoading(true);
    axios({
      method: 'POST',
      data: {
        email,
        password,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/local/signin`,
    }).then((response) => {
      setIsLoading(false);
      if (response.data.msg) {
        setSignInResponse(response.data.msg);
      }
      if (response.data.email) {
        const payload = {
          id: response.data._id,
          email: response.data.email,
          fullName: response.data.fullName,
          userName: response.data.userName,
          imageProfile: response.data.imageProfile,
          google: response.data.google,
        };
        SignInAction({
          userData: encrypt(payload),
        });
      }
    });
  }

  function signOut() {
    SignOutAction();
    // Local signout and delete cookie
    axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/local/signout`,
    }).then(() => {
      setUserData();
    });
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Google signout
    axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/google/signout`,
    }).then(() => {
      setUserData();
    });
  }

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <AuthContext.Provider value={{ signOut }}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" render={(props) => <SignInPage {...props} AuthGoogle={AuthGoogle} signInLocal={signInLocal} signInResponse={signInResponse} setSignInResponse={setSignInResponse} />} />
        <Route exact path="/signup" render={(props) => <SignUpPage {...props} AuthGoogle={AuthGoogle} signUpLocal={signUpLocal} signUpResponse={signUpResponse} setSignUpResponse={setSignUpResponse} />} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/write" component={WritePostPage} />
        {/* Put the path with params on the bottom. */}
        <Route exact path="/:userName" component={ProfilePage} />
        <Route exact path="/article/:articleTitle" component={ArticlePage} />
        <Route exact path="/edit/:articleTitle" component={EditPostPage} />
        <Route path="" component={NotFoundPage} />
        <Redirect from="/article" to="/" />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
