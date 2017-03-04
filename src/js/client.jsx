import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, replace } from 'react-router';


import App from './pages/App.jsx';
import AuthResponse from './pages/AuthResponse.jsx';
import About from './pages/About.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import Privacy from './pages/Privacy.jsx';

import auth from './auth';

function requireAuth(nextState) {
  console.log('authenticated: ', auth.loggedIn());
  if (!auth.loggedIn()) {
    browserHistory.push('/login');
  }
}

function redirectIfAuthenticated() {
  // if(auth.loggedIn()) {
  //   browserHistory.push('/dashboard'); //NOT WORKING
  //   console.log("logged in");
  // }
}

const app = document.getElementById('app');

render(
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={redirectIfAuthenticated}>
      <Route path="about" component={About} />
      <Route path="auth-answer" component={AuthResponse} />
      <Route path="dashboard" name="stats" component={Dashboard} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="privacy" component={Privacy} />
    </Route>
  </Router>, app);
