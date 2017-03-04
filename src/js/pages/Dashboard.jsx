import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import UserDetails from '../components/UserDetails.jsx';
import HistoryFacts from '../components/HistoryFacts.jsx';

import auth from '../auth';

function fetchAllHistory(cb, data = [], offset = 0) {
  axios.get(`/v1.2/history?limit=50&offset=${offset}`).then((result) => {
    data = data.concat(result.data.history);
    if (result.data.history.length === 50) {
      fetchAllHistory(cb, data, offset + 50);
    } else {
      cb(data);
    }
  });
}

function fetchData(cbName, cbTrips) {
  axios.defaults.baseURL = 'https://sandbox-api.uber.com';
  axios.defaults.headers.common.Authorization = 'Bearer ' + auth.getToken();

  axios.get('/v1.2/me').then((result) => {
    cbName({
      name: result.data.first_name,
      profilePicture: result.data.picture,
    });
  });

  fetchAllHistory((data) => {
    const trips = [];
    data.forEach((item) => {
      const trip = {};
      trip.request_time = item.request_time;
      trip.city = item.start_city;
      trip.distance = item.distance;
      trip.wait_time = item.start_time - item.request_time;
      trip.duration = item.end_time - item.start_time;
      trip.start_time = item.start_time;
      trip.end_time = item.end_time;
      trips.push(trip);
    });
    cbTrips(trips);
  });
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', profilePicture: '', trips: [] };
  }

  componentWillMount() {
    if (auth.loggedIn()) {
      fetchData((user) => {
        this.setState({ name: user.name, profilePicture: user.profilePicture });
      }, (trips) => {
        this.setState({ trips });
      });
    }
  }

  render() {
    if (this.state.name === '' || this.state.trips.length === 0 || this.state.profilePicture === '') {
      return (
        <div>
          <h2>Dashboard</h2>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Dashboard</h2>
          <UserDetails name={this.state.name} profilePicture={this.state.profilePicture} />
          <HistoryFacts trips={this.state.trips} uniqueLocations={this.state.uniqueLocations} />
        </div>
      );
    }
  }
}
