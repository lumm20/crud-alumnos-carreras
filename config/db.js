const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'moeLISa_22:03',
    database: 'db_escuela'
});

module.exports = connection;