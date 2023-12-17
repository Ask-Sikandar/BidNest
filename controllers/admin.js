const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config;

exports.viewUsers = async (req, res) => {
    // Query to get all users from the database
    const query = 'SELECT * FROM users';

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send the user data in the response
            res.status(200).json(results);
        }
    });
};