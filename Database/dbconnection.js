const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
=======
    //password: '1234',
>>>>>>> 256bf72d855b621b953930544a832a3baac5f427
    database: 'taskmon'
});

db.connect((err, res) => {
    if(err) {
        console.log('cant connect');
    } else {
        console.log('connected to db');
    }
});

module.exports = db;