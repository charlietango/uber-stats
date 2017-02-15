import React from "react";

export default class UserDetails extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <img id="profile-picture" src={this.props.profilePicture}></img>
      </div>
    );
  }
}

UserDetails.propTypes = {
  name: React.PropTypes.string,
  profilePicture: React.PropTypes.string
}
