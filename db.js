const mysql = require('mysql2/promise');


const dbconfig = {
    host: 'localhost', // MySQL host (e.g., 'localhost')
    user: 'user1', // MySQL username
    password: 'Beaconhouse45', // MySQL password
    database: 'bidnest' // MySQL database name
};
const connection = mysql.createConnection(dbconfig);
const pool = mysql.createPool(dbconfig)

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database!');
// });

module.exports = pool;
