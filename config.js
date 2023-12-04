const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbconfig = {
    host: 'localhost', // MySQL host (e.g., 'localhost')
    user: 'root', // MySQL username
    password: 'x2f9h3m6', // MySQL password
    database: 'bidnest' // MySQL database name
};
const connection = mysql.createConnection(dbconfig);
const pool = mysql.createPool(dbconfig);

module.exports = pool;
