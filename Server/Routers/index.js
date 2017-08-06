const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
})
router.get('/dashboard', (req, res) => {
  console.log('HOPEFULLY THIS WILL CHANGE SOMETHING IN THE REDUX STORE, AND FORCE THE UPDATE OF OUR PAGE (TO OMIT THE LOGOUT)', req);
})

module.exports = router;
