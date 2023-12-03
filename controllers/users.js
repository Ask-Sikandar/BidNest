const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, name, contact } = req.body;
    // Hash the password before storing it in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await db.query(
            "INSERT INTO users (username, email, password, name, contact) VALUES (?, ?, ?, ?, ?)",
            [username, email, hashedPassword, name, contact]
        );
        res.status(200).send("User added successfully"); // Assuming the response structure here
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error adding user");
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Fetch the user from the database based on the username
        const [user] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (user.length === 0) {
            // User not found
            return res.status(401).send("Invalid username or password");
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).send("Invalid username or password");
        }

        // Generate a JWT token
        const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });

        // Authentication successful
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error during login");
    }
};

exports.createproperty = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
      }
    const token = req.headers.authorization;
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
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
      console.log(property);
      db.query('INSERT INTO properties SET ?', property, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving property' });
        }
        return res.status(201).json({ message: 'Property created successfully' });
      });
    });
  };
  