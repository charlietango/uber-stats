import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Footer from '../components/Footer.jsx';

import auth from '../auth';

import style from '../../styles/main.scss';


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
    const button = <Link class="main-button" to="/dashboard">See your stats</Link>;
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Uber Stats</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem><Link to="/dashboard">Dashboard</Link></NavItem>
              <NavItem><Link to="/about">About</Link></NavItem>
              <NavItem>{ this.state.loggedIn ? <Link to="/logout">Log out</Link> : <Link to="/login">Log in</Link> }</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div class="row">
          <div class="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10">
            <div class="text-center">
              { this.props.children ? this.props.children :
                <div id="welcome-content" >
                  <h1 class="intro-text">Welcome!</h1>
                  <h4 class="intro-text">Ever wondered if you can see how many Uber trips you've done? Now you can find out!</h4>
                  <h4 class="intro-text">Find out this magic number and many other awesome facts about your Uber trips.</h4>
                  {button}
                </div> }
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
