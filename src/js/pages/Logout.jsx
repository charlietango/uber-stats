import React from 'react';

import auth from '../auth';

export default class Logout extends React.Component {

  componentDidMount() {
    auth.logout();
  }

  render() {
    return (
      <p>Hope we helped you to discover useful insights! Thank you for using this website. </p>
    );
  }
}
