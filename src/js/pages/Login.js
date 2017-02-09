import React from "react";
import { browserHistory, withRouter } from "react-router";

import auth from "../auth"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()

    auth.login((loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">login to uber</button>
        {this.state.error && (
          <p>snap, smth went wrong</p>
        )}
      </form>
    )
  }
}

export default withRouter(Login);
