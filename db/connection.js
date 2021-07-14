const mysql = require("mysql");
require('dotenv').config();

// Connecting  with database
const connection = mysql.createConnection({
    // host: 'localhost',

    // port to use
    port: 3306,

    // username
    user: 'root',

    // password
    password: process.env.PASSWORD,
    database: 'employee_tracker',
});

module.exports = connection
