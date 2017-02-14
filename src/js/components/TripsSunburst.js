import React from "react";
import moment from "moment";

import heatMap from "../heatMap";

export default class TripsSunburst extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.data = [];

    var days = [1, 2, 3, 4, 5, 6, 7];
    var hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    days.forEach((day) => {
      hours.forEach((hour) => {
        this.data.push({day: day, hour: hour, value: 0});
      });
    });

    this.props.trips.forEach((item) => {
      var day = moment.unix(item.start_time).day() + 1;
      var hour = moment.unix(item.start_time).hour();
      this.data.forEach((dataItem) => {
        if(dataItem.day === day && dataItem.hour === hour) {
          dataItem.value++;
        }
      });
    });
    heatMap(this.data);
  }

  render() {
    return (
      <div id="chart">
      </div>
    );
  }
}

//TODO
// 1. make sure the displayed data is right
// 2. Make the legend show up
