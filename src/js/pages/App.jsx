import React from 'react';
import { Link } from 'react-router';

import auth from '../auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: auth.loggedIn() };
    this.updateAuth = this.updateAuth.bind(this);
  }

  componentWillMount() {
    auth.onChange = this.updateAuth;
    const accessToken = this.props.location.hash && this.props.location.hash.split('=')[1].split('&')[0];
    console.log(accessToken);
    if (accessToken) {
      this.updateAuth(true);
      auth.setToken(accessToken);
    }
  }

  updateAuth(loggedIn) {
    this.setState({ loggedIn });
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Log in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    );
  }
}
