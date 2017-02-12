import React from "react";

export default class TripsSunburst extends React.Component {
  render() {
    return (
      <div>
        {this.props.trips.length}
      </div>
    );
  }
}
