import React from "react";
import { Link } from "react-router";
import axios from "axios";

import auth from "../auth";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: auth.loggedIn() };
    this.updateAuth = this.updateAuth.bind(this);
  }

  updateAuth(loggedIn) {
    this.setState({ loggedIn });
  }

  componentWillMount() {
    auth.onChange = this.updateAuth
    var access_token = this.props.location.hash && this.props.location.hash.split("=")[1].split("&")[0];
    console.log(access_token);
    if(access_token) {
      this.updateAuth(true);
      auth.setToken(access_token);
    }
  }

  render() {
    return(
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
