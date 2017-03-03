import React from "react";

export default class UserDetails extends React.Component {
  render() {
    return (
      <div>
        <h3>Hey, {this.props.name}!</h3>
        <img id="profile-picture" src={this.props.profilePicture}></img>
      </div>
    );
  }
}

UserDetails.propTypes = {
  name: React.PropTypes.string,
  profilePicture: React.PropTypes.string
}
