const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbconfig = {
    host: 'localhost', // MySQL host (e.g., 'localhost')
    user: 'user1', // MySQL username
    password: 'Beaconhouse45', // MySQL password
    database: 'bidnest' // MySQL database name
};
const connection = mysql.createConnection(dbconfig);
const pool = mysql.createPool(dbconfig);

module.exports = pool;
