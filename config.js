require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbconfig = {
    host: process.env.DB_HOST, // MySQL host (e.g., 'localhost')
    user: process.env.DB_USERNAME, // MySQL username
    password: process.env.DB_PASSWORD, // MySQL password
    database: process.env.DB_DATABASE // MySQL database name
};
const pool = mysql.createPool(dbconfig);

module.exports = pool;
