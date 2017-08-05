import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'austenwma.auth0.com',
      clientID: 'lczGQdQdeATDVsDoPJc7zoTGjHTFSl2X',
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
