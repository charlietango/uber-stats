import React from "react";

import auth from "../auth";

export default class App extends React.Component {
  render() {
    const token = auth.getToken();

    return (
      <div>
        <h1>Dashboard</h1>
        <p>Here is your token: {token}</p>
      </div>
    )
  }
}
