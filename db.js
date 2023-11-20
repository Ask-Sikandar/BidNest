const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // MySQL host (e.g., 'localhost')
    user: 'root', // MySQL username
    password: 'x2f9h3m6', // MySQL password
    database: 'bidnest' // MySQL database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

module.exports = connection;
