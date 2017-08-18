// import fs from 'fs';
import auth0 from 'auth0-js';
import ClientID from '../../config.js'
import history from '../history';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: ClientID.DOMAIN,
      clientID: ClientID.CLIENT_ID,
      redirectUri: 'http://localhost:3000',
      audience: ClientID.AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid profile',
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  // var options = {
  //   avatar: {
  //     url: function(email, cb) {
  //       var url = obtainAvatarUrl(email);
  //       cb(null, url);
  //     },
  //     displayName: function(email, cb) {
  //       var displayName = obtainDisplayName(email);
  //       cb(null, displayName);
  //     }
  //   }
  //   allowedConnections: ['twitter', 'facebook', 'linkedin']
  // };
  //
  // var lock = new Auth0Lock(ClientID.CLIENT_ID, 'austenwma.auth0.com', options);
  //
  // lock.show({
  //   icon: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
  //   callbackURL: 'http://localhost:3000/'
  // })

  login() {
    this.auth0.authorize();
  }

  userProfile;

  getProfile(cb) {
    let accessToken = localStorage.getItem('access_token');
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      cb(err, profile);
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/dashboard');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
