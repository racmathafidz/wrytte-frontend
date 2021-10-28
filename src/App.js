/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import axios from 'axios';

import LandingPage from './pages/LandingPage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WritePostPage from './pages/WritePostPage';
import LoadingPage from './pages/LoadingPage';

export const AuthContext = React.createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [signUpResponse, setSignUpResponse] = useState();
  const [signInResponse, setSignInResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function capitalize(string) {
    const lower = string.toLowerCase();
    return string.charAt(0).toUpperCase() + lower.slice(1);
  }

  function signUpLocal(email, password, firstName, lastName) {
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`;
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
      console.log('Sign Up');
      console.log(response);
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
      console.log('Sign In');
      console.log(response);
      if (response.data.msg) {
        setSignInResponse(response.data.msg);
        setIsLoading(false);
      }
      if (response.data.email) {
        setUserData(response.data);
        setIsAuth(true);
        setIsLoading(false);
      }
    });
  }

  function signOut() {
    axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/auth/signout`,
    }).then(() => {
      setIsAuth(false);
      setUserData(null);
    });
  }

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <AuthContext.Provider value={{ isAuth, userData, signOut }}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" render={(props) => <SignInPage {...props} signInLocal={signInLocal} userData={userData} signInResponse={signInResponse} setSignInResponse={setSignInResponse} />} />
        <Route exact path="/signup" render={(props) => <SignUpPage {...props} signUpLocal={signUpLocal} userData={userData} signUpResponse={signUpResponse} setSignUpResponse={setSignUpResponse} />} />
        <Route exact path="/write" render={(props) => <WritePostPage {...props} userData={userData} />} />
        {/* Put the path with params on the bottom. */}
        <Route exact path="/:userName" component={ProfilePage} />
        <Route exact path="/article/:articleTitle" component={ArticlePage} />
        <Redirect from="/article" to="/" />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
