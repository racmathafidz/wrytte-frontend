/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WritePostPage from './pages/WritePostPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signin" component={SignInPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/write" component={WritePostPage} />
      {/* Put the path with params on the bottom. */}
      <Route exact path="/:userName" component={ProfilePage} />
      <Route exact path="/article/:articleTitle" component={ArticlePage} />
      <Redirect from="/article" to="/" />
    </Switch>
  );
}

export default App;
