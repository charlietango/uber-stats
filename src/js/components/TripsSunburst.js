import React from "react";
import moment from "moment";

import heatMap from "../heatMap";

export default class TripsSunburst extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props.trips);
    this.data = [];
    this.props.trips.forEach((item) => {
      var day = moment.unix(item.start_time).day() + 1;
      var hour = moment.unix(item.start_time).hour();
      var found = false;
      this.data.forEach((dataItem) => {
        if(dataItem.day === day && dataItem.hour === hour) {
          dataItem.value++;
          found = true;
        }
      });
      if(found == false) {
        this.data.push({day: day, hour: hour, value: 1});
      }
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
