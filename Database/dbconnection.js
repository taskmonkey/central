const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'taskmon'
});

db.connect();

module.exports = db;