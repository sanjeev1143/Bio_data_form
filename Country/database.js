const mysql = require('mysql2')


module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sanjeev266',
    database: 'forms'
});