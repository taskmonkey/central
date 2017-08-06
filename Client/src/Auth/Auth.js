// import fs from 'fs';
import auth0 from 'auth0-js';
import axios from 'axios';
import ClientID from '../../config.js'

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'austenwma.auth0.com',
      clientID: ClientID.CLIENT_ID,
      redirectUri: 'http://localhost:3000',
      audience: 'https://austenwma.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });

   this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }
}
