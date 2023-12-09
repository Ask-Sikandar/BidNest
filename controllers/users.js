const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config;

const allowedImageTypes = ['image/jpeg', 'image/png'];

function validatePassword(password) {
  // Minimum length of 8 characters
  if (password.length < 8) {
      return false;
  }

  // Requires at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
      return false;
  }

  // Requires at least one lowercase letter
  if (!/[a-z]/.test(password)) {
      return false;
  }

  // Requires at least one digit
  if (!/\d/.test(password)) {
      return false;
  }

  // Requires at least one special character (you can customize this pattern)
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return false;
  }

  // If all conditions are met, the password is considered valid
  return true;
}

exports.register = async (req, res) => {
  try {
    const { username, email, password, name, contact } = req.body;
  // Hash the password before storing it in the database
    if(!validatePassword(password)) {
      return res.status(500).send("Password doesn't meet the requirements");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await db.query(
        "INSERT INTO users (username, email, password, name, contact) VALUES (?, ?, ?, ?, ?)",
        [username, email, hashedPassword, name, contact]
    );
    return res.status(200).send("User added successfully"); // Assuming the response structure here
  } catch (error) {
      console.error(error.message);
      return res.status(500).send("Error adding user");
  }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch the user from the database based on the username
        const [user] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (user.length === 0) {
            // User not found
            return res.status(401).send("Invalid email or password");
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).send("Invalid username or password");
        }

        // Generate a JWT token
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Authentication successful
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error during login");
    }
};
exports.viewProfile = async (req, res) => {
  const email = req.body.email;

  try {
    const [rows] = await db.query(
      `SELECT username, email, name, contact FROM users WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      // User found, return the first row
      res.json(rows[0]);
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.uploadPictures = async (req, res) => {
  const { propertyID } = req.body;
  const files = req.files;
  console.log(files);

  // Check if there are any files uploaded
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // Save the files in a directory
  // You can modify the path and filename as per your requirements
  const filePaths = files.map((file) => `uploads/${file.filename}`);

  // Create entries in the MySQL table
  const sql = 'INSERT INTO pictures (propertyID, file_path) VALUES ( ?)';
  // const values = filePaths.map((filePath) => [propertyID, filePath]);
  // console.log(values);
  console.log(filePaths.length);
  const values = [];
  for (let i = 0; i < filePaths.length; i++) {
    values.push([propertyID, filePaths[i]]);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into MySQL table:', err);
      res.status(500).json({ error: 'Failed to insert into MySQL table' });
    } else {
      console.log('Inserted into MySQL table:', result);
    }
  });
}
  res.json({ message: 'Files uploaded and entries created successfully' });
};

exports.createproperty = async (req, res) => {
  const property = {
    name: req.body.name,
    description: req.body.description,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    location: req.body.location,
    starting_bid: req.body.starting_bid,
    end_time: req.body.end_time,
    user_username: req.body.user_username,
  };
  const doublecheck = "Select * from properties where ?";
  console.log(property);
  try{
    const [results] = await db.query('INSERT INTO properties SET ?', property);
    return res.status(201).json({ message: 'Property created successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error creating property");
}
};
exports.viewProperty = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = req.headers.authorization;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });
  try{
    const sql = 'select * from properties where propertyID = ?';
    const [results] = await db.query(sql, req.body.propertyID, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving property' });
      }
      return res.status(200).json(result);
    });
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.searchProperty = async (req, res) => {
  try {
    const { location, starting_bid, bedrooms } = req.query;

    let sql = 'SELECT * FROM properties WHERE 1=1';

    if (location) {
      sql += ` AND location LIKE '%${location}%'`;
    }

    if (starting_bid) {
      sql += ` AND starting_bid >= ${starting_bid}`;
    }

    if (bedrooms) {
      sql += ` AND bedrooms = ${bedrooms}`;
    }

    const [results, fields] = await db.query(sql);

    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  