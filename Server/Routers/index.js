const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
})

module.exports = router;
