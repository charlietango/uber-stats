var OAuth = require('@zalando/oauth2-client-js');
import config from "./config";

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    requestToken((res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  setToken(token) {
    localStorage.token = token
  },

  onChange() {}
}

function requestToken(cb) {
  var uber = new OAuth.Provider({
      id: 'uber',
      authorization_url: 'https://login.uber.com/oauth/v2/authorize'
  });

  // Create a new request
  var request = new OAuth.Request({
      client_id: config.client_id,  // required
      redirect_uri: 'http://localhost:8080',
      scope: 'history profile'
  });

  // Give it to the provider
  var uri = uber.requestToken(request);

  // Later we need to check if the response was expected
  // so save the request
  uber.remember(request);
  console.log("uri", uri);
  // Do the redirect
  window.location.href = uri;
}

// TODO figure out how to get the access_token not via URL
// then set the redirect_uri to /auth-response, there save the token
// in the storage and redirect to dashboard when is done

// check PropTypes

// decide which type of data visualization to do, and do it

// take care of the visual aspect

// make sure it works for everybody, in production
