import React, { useEffect, useState } from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Switch } from 'react-router-dom';
import { compose } from 'recompose';

import LoadableComponent from './components/LoadableComponent/LoadableComponent';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthRedirectRoute from './components/AuthRedirectRoute/AuthRedirectRoute';
import Navbar from './components/Navbar/Navbar';
import './App.css';

import { useUser } from './context/auth';
import IslandView from './scenes/Island/IslandView';
import IslandExploreView from './scenes/IslandExplore/IslandExploreView';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: 'ac-frontend.appspot.com',
};

firebase.initializeApp(config);

const HomeView = LoadableComponent({
  loader: () => import('./scenes/Home/HomeView'),
});
const LoginView = LoadableComponent({
  loader: () => import('./scenes/Login/LoginView'),
});
const LandingView = LoadableComponent({
  loader: () => import('./scenes/Landing/LandingView'),
});

const App = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [setUser]);

  const isAuth = user !== null;

  return (
    <div className="App" id="app">
      <Navbar />
      <Switch>
        <PrivateRoute
          loading={loading}
          isAuth={user}
          path="/dashboard/:menu"
          component={HomeView}
        />
        <Redirect from="/dashboard" to="/dashboard/home" />
        <Route path="/islands" component={IslandExploreView} />
        <Route path="/island/:name" component={IslandView} />
        <AuthRedirectRoute
          isAuth={isAuth}
          path="/login"
          component={LoginView}
        />
        <Route path="/" exact component={LandingView} />
      </Switch>
    </div>
  );
};

export default compose(withRouter)(App);
