const express= require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app=express();
app.use(express.json());
const db = require('./db');

//register user
app.post("/register", async (req, res) => {
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
});
//login
app.post("/login", async (req, res) => {
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
});


app.post('/create_listing', async (req, res) => {
    const data = req.body;
  
    // Check if all required fields are present in the request
    const requiredFields = ['name', 'description', 'bedrooms', 'bathrooms', 'location', 'starting_bid', 'end_time', 'user_username'];
    if (!requiredFields.every(field => data[field])) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Create a new property listing
    const newListing = await db.query(
        "Insert into properties" 
    );
  
    // Add the new listing to the in-memory storage
    propertyListings.push(newListing);
  
    return res.status(201).json({ message: 'Property listing created successfully' });
  });


app.listen(3000,()=>{
    console.log("server has started on port 3000");
})