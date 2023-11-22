const express= require('express');
const bcrypt = require('bcrypt');

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

        // Authentication successful
        res.status(200).send("Login successful");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error during login");
    }
});


app.listen(3000,()=>{
    console.log("server has started on port 3000");
})