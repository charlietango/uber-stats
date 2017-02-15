import React from 'react';
import moment from 'moment';

import TripsSunburst from './TripsSunburst.jsx';

export default class HistoryFacts extends React.Component {
  constructor(props) {
    super(props);
    this.trips = this.props.trips;
    this.totalDistance = 0;
    this.totalTime = 0;
    this.totalWaitTime = 0;
  }

  componentWillMount() {
    this.trips.forEach((item) => {
      this.totalDistance += item.distance;
      this.totalTime += item.duration;
      this.totalWaitTime += item.wait_time;
    });
    this.totalDistance = Math.round(this.totalDistance * 1.6);
    this.totalTimeAsHours = Math.round(moment.duration(this.totalTime * 1000).asHours());
    this.averageWaitingTime = Math.round(moment.duration(this.totalWaitTime * 1000).asMinutes()
                              / this.trips.length);
    this.averageRideTime = Math.round(moment.duration(this.totalTime * 1000).asMinutes()
                            / this.trips.length);
  }

  render() {
    return (
      <div>
        <p>{this.trips.length} trips!</p>
        <p>You&apos;ve traveled about {this.totalDistance} kilometers, so far,
          with Uber, in a total time of {this.totalTimeAsHours} hours.</p>
        <p>On average, you&apos;ve spent {this.averageWaitingTime} minutes for your ride to arrive
          and the average time you&apos;ve spent per each
          ride is {this.averageRideTime} minutes.</p>
        <TripsSunburst trips={this.trips} />
      </div>
    );
  }
}

HistoryFacts.propsType = {
  trips: React.PropTypes.array.isRequired,
};
