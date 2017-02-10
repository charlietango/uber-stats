import React from "react";
import axios from "axios";

import auth from "../auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", trips: [], fetched: false};
  }

  componentWillMount() {
    if(auth.loggedIn()) {
      fetchData((name) => {
        this.setState({name: name});
      }, (trips) => {
        this.setState({trips: trips});
      });
    }
  }

  render() {
    const token = auth.getToken();
    var trips = this.state.trips.map((item) => {return <li key={item.start_time}>{item.city}</li>});
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Hi {this.state.name}</p>
        <p>You had {this.state.trips.length} trips with Uber.</p>
        <ul>{trips}</ul>
      </div>
    )
  }
}

function fetchAllHistory(cb, data=[], offset=0) {
  axios.get(`/v1.2/history?limit=50&offset=${offset}`).then((result) => {
    data = data.concat(result.data.history);
    if(result.data.history.length == 50){
      fetchAllHistory(cb, data, offset + 50);
    } else {
      cb(data);
    }
  });
}

function fetchData(cbName, cbTrips) {
  axios.defaults.baseURL = 'https://sandbox-api.uber.com';
  axios.defaults.headers.common['Authorization'] = "Bearer " + auth.getToken();

  axios.get("/v1.2/me").then((result) => {
    cbName(result.data.first_name);
  });

  fetchAllHistory((data) => {
    var trips = [];
    data.forEach((item) => {
      var trip = {};
      trip.status = item.status;
      trip.request_time = item.request_time;
      trip.city = item.start_city.display_name;
      trip.wait_time = item.start_time - item.request_time;
      trip.duration = item.end_time - item.start_time;
      trip.start_time = item.start_time;
      trip.end_time = item.end_time;
      trips.push(trip);
    });
    cbTrips(trips);
  });

}
